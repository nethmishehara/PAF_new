package com.example.backend.controller.dasu;

import com.example.backend.model.dasu.Post;
import com.example.backend.service.dasu.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<?> createPost(
        @RequestParam("username") String username,
        @RequestParam("profilePic") String profilePic,
        @RequestParam("description") String description,
        @RequestParam("images") List<MultipartFile> imageFiles
    ) {
        return postService.createPost(username, profilePic, description, imageFiles);
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updatePost(
        @PathVariable("id") String id,
        @RequestParam("username") String username,
        @RequestParam(value = "profilePic", required = false) String profilePic,
        @RequestParam("description") String description,
        @RequestParam(value = "images", required = false) List<MultipartFile> imageFiles
    ) {
        return postService.updatePost(id, username, profilePic, description, imageFiles);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") String id) {
        return postService.deletePost(id);
    }
}
