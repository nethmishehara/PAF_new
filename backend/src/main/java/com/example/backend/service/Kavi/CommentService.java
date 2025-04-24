package com.example.backend.service.Kavi;

import com.example.backend.model.Kavi.Comment;
import com.example.backend.model.Kavi.Notification;
import com.example.backend.model.Kavi.Post;
import com.example.backend.repsitory.Kavi.CommentRepository;
import com.example.backend.repsitory.Kavi.NotificationRepository;
import com.example.backend.repsitory.Kavi.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.ArrayList;

import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Comment> getCommentsByPostId(String postId) {
        return commentRepository.findByPostId(postId);
    }

    public Comment addComment(Comment comment) {
        comment.setTimestamp(new Date());
        Comment savedComment = commentRepository.save(comment);

        Optional<Post> optionalPost = postRepository.findById(comment.getPostId());
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            if (!post.getUserId().equals(comment.getUserId())) {
                Notification notification = new Notification();
                notification.setUserId(post.getUserId());
                notification.setMessage("New comment on your post");
                notification.setTimestamp(new Date());
                notificationRepository.save(notification);
            }
        }

        return savedComment;
    }

    public Comment editComment(String commentId, String newText) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            comment.setContent(newText);

            return commentRepository.save(comment);
        }
        return null;
    }

    public boolean deleteComment(String commentId, String userId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            if (comment.getUserId().equals(userId)) {
                commentRepository.deleteById(commentId);
                return true;
            }
        }
        return false;
    }

    public boolean deleteCommentAsPostOwner(String commentId, String postOwnerId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            Optional<Post> optionalPost = postRepository.findById(comment.getPostId());
            if (optionalPost.isPresent() && optionalPost.get().getUserId().equals(postOwnerId)) {
                commentRepository.deleteById(commentId);
                return true;
            }
        }
        return false;
    }
}