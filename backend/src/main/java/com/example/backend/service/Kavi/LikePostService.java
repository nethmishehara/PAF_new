package com.example.backend.service.Kavi;

import com.example.backend.model.Kavi.LikePost;
import com.example.backend.model.dasu.Post; // ✅ Corrected import
import com.example.backend.repository.Kavi.LikePostRepository;
import com.example.backend.service.dasu.PostService; // ✅ Corrected import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikePostService {

    @Autowired
    private LikePostRepository likePostRepository;

    @Autowired
    private PostService postService;

    @Autowired
    private NotificationService notificationService;

    // Check if a user has already liked a post
    public boolean isLikedByUser(String postId, String userId) {
        return likePostRepository.findByPostIdAndUserId(postId, userId).isPresent();
    }

    // Like a post and send notification
    public void likePost(String postId, String userId) {
        if (!isLikedByUser(postId, userId)) {
            likePostRepository.save(new LikePost(postId, userId));

            Optional<Post> optionalPost = postService.getPostById(postId);
            if (optionalPost.isPresent()) {
                Post post = optionalPost.get();
                String postOwnerId = post.getUsername();

                if (!postOwnerId.equals(userId)) {
                    notificationService.createNotification(
                        postOwnerId,
                        userId,
                        postId,
                        "LIKE",
                        "Someone liked your post"
                    );
                }
            }
        }
    }

    // Unlike a post
    public void unlikePost(String postId, String userId) {
        likePostRepository.deleteByPostIdAndUserId(postId, userId);
    }

    // Get all likes for a post
    public List<LikePost> getLikesForPost(String postId) {
        return likePostRepository.findAllByPostId(postId);
    }

    // Get the number of likes for a post
    public int getLikeCount(String postId) {
        return likePostRepository.findAllByPostId(postId).size();
    }
}
