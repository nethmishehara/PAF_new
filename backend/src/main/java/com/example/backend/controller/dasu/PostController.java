package com.example.backend.controller.dasu;

import com.example.backend.model.dasu.Post;
import com.example.backend.service.dasu.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createPost(
        @RequestParam("userId") String userId,
        @RequestParam("username") String username,
        @RequestParam("profilePic") String profilePic,
        @RequestParam("description") String description,
        @RequestParam(value = "images", required = false) List<MultipartFile> imageFiles
    ) {
        return postService.createPost(userId, username, profilePic, description, imageFiles);
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
public ResponseEntity<?> getPostById(@PathVariable("id") String id) {
    Optional<Post> post = postService.getPostById(id);
    if (post.isPresent()) {
        return ResponseEntity.ok(post.get());
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
    }
}


    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updatePost(
        @PathVariable("id") String id,
        @RequestParam("userId") String userId,
        @RequestParam("username") String username,
        @RequestParam(value = "profilePic", required = false) String profilePic,
        @RequestParam("description") String description,
        @RequestParam(value = "images", required = false) List<MultipartFile> imageFiles
    ) {
        return postService.updatePost(id, userId, username, profilePic, description, imageFiles);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") String id) {
        return postService.deletePost(id);
    }
}
