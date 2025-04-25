package com.example.backend.controller.Kavi;

import com.example.backend.model.Kavi.Post;
import com.example.backend.service.Kavi.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
@CrossOrigin
public class LikeController {

    @Autowired
    private PostService postService;

    @PostMapping("/{postId}")
    public Post likePost(@PathVariable String postId, @RequestParam String userId) {
        return postService.likePost(postId, userId);
    }
}
