package com.example.backend.controller.Kavi;

import com.example.backend.model.Kavi.Comment;
import com.example.backend.service.Kavi.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin
public class CommentController {

    @Autowired
    private CommentService commentService;

    // Get comments by post ID
    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPostId(@PathVariable String postId) {
        return commentService.getCommentsByPostId(postId);
    }

    // Add a new comment
    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }

    // Edit a comment by the user
    @PutMapping("/{commentId}")
    public Comment editComment(@PathVariable String commentId, @RequestParam String newText) {
        
        return commentService.editComment(commentId, newText);
    }

    // Delete a comment by the commenter
    @DeleteMapping("/{commentId}")
    public boolean deleteComment(@PathVariable String commentId, @RequestParam String userId) {
        return commentService.deleteComment(commentId, userId);
    }

    // Delete a comment by the post owner
    @DeleteMapping("/post-owner/{commentId}")
    public boolean deleteCommentAsPostOwner(@PathVariable String commentId, @RequestParam String postOwnerId) {
        return commentService.deleteCommentAsPostOwner(commentId, postOwnerId);
    }
}
