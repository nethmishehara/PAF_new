package com.example.backend.repository.Kavi;

import com.example.backend.model.Kavi.LikePost;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.List;

public interface LikePostRepository extends MongoRepository<LikePost, String> {
    Optional<LikePost> findByPostIdAndUserId(String postId, String userId);
    void deleteByPostIdAndUserId(String postId, String userId);
    List<LikePost> findAllByPostId(String postId);
}
