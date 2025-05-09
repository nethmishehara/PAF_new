package com.example.backend.service.Kavi;

import com.example.backend.model.Kavi.Comment;
import com.example.backend.model.Kavi.Like;
import com.example.backend.model.Kavi.Notification;
import com.example.backend.repository.Kavi.CommentRepository;
import com.example.backend.repository.Kavi.LikeRepository;
import com.example.backend.repository.Kavi.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    // ✅ Toggle comment like (add/remove)
    public boolean toggleCommentLike(String commentId, String userId) {
        if (likeRepository.existsByCommentIdAndUserId(commentId, userId)) {
            // If already liked, remove like
            Like like = likeRepository.findByCommentIdAndUserId(commentId, userId)
                    .orElseThrow(() -> new RuntimeException("Like not found"));
            likeRepository.delete(like);
            return false; // Now unliked
        } else {
            // Add like
            Comment comment = commentRepository.findById(commentId)
                    .orElseThrow(() -> new RuntimeException("Comment not found"));

            Like like = new Like();
            like.setCommentId(commentId);
            like.setUserId(userId);
            likeRepository.save(like);

            String commentOwnerId = comment.getUserId();
            if (!commentOwnerId.equals(userId)) {
                Notification notification = new Notification();
                notification.setRecipientUserId(commentOwnerId);
                notification.setActorUserId(userId);
                notification.setPostId(comment.getPostId());
                notification.setMessage("Your comment was liked by " + userId);
                notification.setType("like");
                notification.setUserId(commentOwnerId);
                notification.setRead(false);
                notificationRepository.save(notification);
            }

            return true; // Now liked
        }
    }

    // ✅ Check if user liked a comment
    public boolean hasUserLikedComment(String commentId, String userId) {
        return likeRepository.existsByCommentIdAndUserId(commentId, userId);
    }

    // ✅ Like a post
    public void likePost(String postId, String userId) {
        if (likeRepository.existsByPostIdAndUserId(postId, userId)) {
            throw new RuntimeException("User already liked this post");
        }

        Like like = new Like();
        like.setPostId(postId);
        like.setUserId(userId);
        likeRepository.save(like);
    }

    // ✅ Unlike a post
    public void unlikePost(String postId, String userId) {
        Like like = likeRepository.findByPostIdAndUserId(postId, userId)
                .orElseThrow(() -> new RuntimeException("Like not found"));
        likeRepository.delete(like);
    }

    // ✅ Check if user liked a post
    public boolean hasUserLikedPost(String postId, String userId) {
        return likeRepository.existsByPostIdAndUserId(postId, userId);
    }
}
