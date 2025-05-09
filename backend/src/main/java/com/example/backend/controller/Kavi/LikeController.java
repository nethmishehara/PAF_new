package com.example.backend.controller.Kavi;

import com.example.backend.service.Kavi.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    // ✅ Toggle like on a comment (add or remove)
    @PutMapping("/comment/{commentId}/user/{userId}")
    public ResponseEntity<?> toggleCommentLike(@PathVariable String commentId, @PathVariable String userId) {
        boolean liked = likeService.toggleCommentLike(commentId, userId);
        return ResponseEntity.ok(liked);
    }

    // ✅ Check if user liked a comment
    @GetMapping("/comment/{commentId}/user/{userId}")
    public ResponseEntity<Boolean> hasUserLikedComment(@PathVariable String commentId, @PathVariable String userId) {
        boolean liked = likeService.hasUserLikedComment(commentId, userId);
        return ResponseEntity.ok(liked);
    }

    // ✅ Like a post
    @PostMapping("/post/{postId}/user/{userId}")
    public void likePost(@PathVariable String postId, @PathVariable String userId) {
        likeService.likePost(postId, userId);
    }

    // ✅ Unlike a post
    @DeleteMapping("/post/{postId}/user/{userId}")
    public void unlikePost(@PathVariable String postId, @PathVariable String userId) {
        likeService.unlikePost(postId, userId);
    }

    // ✅ Check if user liked a post
    @GetMapping("/post/{postId}/user/{userId}")
    public ResponseEntity<Boolean> hasUserLikedPost(@PathVariable String postId, @PathVariable String userId) {
        boolean liked = likeService.hasUserLikedPost(postId, userId);
        return ResponseEntity.ok(liked);
    }
}
