package com.example.backend.controller.Kavi;

import com.example.backend.model.Kavi.Comment;
import com.example.backend.service.Kavi.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
public class CommentController { // ✅ Removed @CrossOrigin

    @Autowired
    private CommentService commentService;

    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.createComment(comment);
    }

    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPostId(@PathVariable String postId) {
        return commentService.getCommentsByPostId(postId);
    }

    @GetMapping("/{id}")
    public Comment getCommentById(@PathVariable String id) {
        return commentService.getCommentById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
    }

    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable String id, @RequestBody Map<String, String> payload) {
        String content = payload.get("content");
        return commentService.updateComment(id, content);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable String id) {
        commentService.deleteComment(id);
    }
}
