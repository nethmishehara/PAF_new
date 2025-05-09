package com.example.backend.controller.Kavi;

import com.example.backend.service.Kavi.LikePostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/post-likes")
@CrossOrigin
public class LikePostController {

    @Autowired
    private LikePostService likePostService;

    // ✅ Check if user has liked a post
    @GetMapping("/post/{postId}/user/{userId}")
    public ResponseEntity<Boolean> isLiked(@PathVariable String postId, @PathVariable String userId) {
        return ResponseEntity.ok(likePostService.isLikedByUser(postId, userId));
    }

    // ✅ Like a post (with notification)
    @PostMapping("/post/{postId}/user/{userId}")
    public ResponseEntity<String> like(@PathVariable String postId, @PathVariable String userId) {
        likePostService.likePost(postId, userId);
        return ResponseEntity.ok("Post liked successfully.");
    }

    // ✅ Unlike a post
    @DeleteMapping("/post/{postId}/user/{userId}")
    public ResponseEntity<String> unlike(@PathVariable String postId, @PathVariable String userId) {
        likePostService.unlikePost(postId, userId);
        return ResponseEntity.ok("Post unliked successfully.");
    }

    // ✅ Get like count
    @GetMapping("/post/{postId}/count")
    public ResponseEntity<Integer> getLikeCount(@PathVariable String postId) {
        return ResponseEntity.ok(likePostService.getLikeCount(postId));
    }
}
