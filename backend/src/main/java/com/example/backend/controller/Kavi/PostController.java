package com.example.backend.controller.Kavi;

import com.example.backend.model.Kavi.Post;
import com.example.backend.service.Kavi.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @PostMapping("/{postId}/like")
    public Post likePost(@PathVariable String postId, @RequestParam String userId) {
        return postService.likePost(postId, userId);
    }

    @PostMapping("/{postId}/comment")
    public Post commentOnPost(@PathVariable String postId, @RequestParam String userId, @RequestParam String content) {
        return postService.commentOnPost(postId, userId, content);
    }

    @PutMapping("/{postId}/comment/{commentId}")
    public Post updateComment(@PathVariable String postId, @PathVariable String commentId,
                              @RequestParam String userId, @RequestParam String content) {
        return postService.updateComment(postId, commentId, userId, content);
    }

    @DeleteMapping("/{postId}/comment/{commentId}")
    public Post deleteComment(@PathVariable String postId, @PathVariable String commentId,
                              @RequestParam String userId) {
        return postService.deleteComment(postId, commentId, userId);
    }
}
