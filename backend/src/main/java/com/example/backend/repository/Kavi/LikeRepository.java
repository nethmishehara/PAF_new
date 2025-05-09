package com.example.backend.repository.Kavi;

import com.example.backend.model.Kavi.Like;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface LikeRepository extends MongoRepository<Like, String> {
    // For Comment Likes
    boolean existsByCommentIdAndUserId(String commentId, String userId);
    Optional<Like> findByCommentIdAndUserId(String commentId, String userId);

    // For Post Likes
    boolean existsByPostIdAndUserId(String postId, String userId);
    Optional<Like> findByPostIdAndUserId(String postId, String userId);
}
