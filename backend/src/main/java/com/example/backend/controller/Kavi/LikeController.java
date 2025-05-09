package com.example.backend.controller.Kavi;

import com.example.backend.service.Kavi.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    // ✅ Toggle like on a comment (add or remove)
    @PutMapping("/comment/{commentId}/user/{userId}")
    public ResponseEntity<Boolean> toggleCommentLike(@PathVariable String commentId, @PathVariable String userId) {
        try {
            boolean liked = likeService.toggleCommentLike(commentId, userId);
            return ResponseEntity.ok(liked);
        } catch (RuntimeException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    // ✅ Check if user liked a comment
    @GetMapping("/comment/{commentId}/user/{userId}")
    public ResponseEntity<Boolean> hasUserLikedComment(@PathVariable String commentId, @PathVariable String userId) {
        try {
            boolean liked = likeService.hasUserLikedComment(commentId, userId);
            return ResponseEntity.ok(liked);
        } catch (RuntimeException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    // ✅ Like a post
    @PostMapping("/post/{postId}/user/{userId}")
    public ResponseEntity<String> likePost(@PathVariable String postId, @PathVariable String userId) {
        try {
            likeService.likePost(postId, userId);
            return ResponseEntity.ok("Post liked successfully");
        } catch (RuntimeException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, ex.getMessage());
        }
    }

    // ✅ Unlike a post
    @DeleteMapping("/post/{postId}/user/{userId}")
    public ResponseEntity<String> unlikePost(@PathVariable String postId, @PathVariable String userId) {
        try {
            likeService.unlikePost(postId, userId);
            return ResponseEntity.ok("Post unliked successfully");
        } catch (RuntimeException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    // ✅ Check if user liked a post
    @GetMapping("/post/{postId}/user/{userId}")
    public ResponseEntity<Boolean> hasUserLikedPost(@PathVariable String postId, @PathVariable String userId) {
        try {
            boolean liked = likeService.hasUserLikedPost(postId, userId);
            return ResponseEntity.ok(liked);
        } catch (RuntimeException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }
}
