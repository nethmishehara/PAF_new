package com.example.backend.controller.dasu;



import com.example.backend.model.dasu.Post;
import com.example.backend.repository.dasu.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.util.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    private final String uploadDir = "uploads/";

    // ✨ UPDATED: Create a post with MULTIPLE image upload
    @PostMapping
    public ResponseEntity<?> createPost(
        @RequestParam("username") String username,
        @RequestParam("profilePic") String profilePic,
        @RequestParam("description") String description,
        @RequestParam("images") List<MultipartFile> imageFiles
    ) {
        try {
            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists()) {
                uploadPath.mkdirs();
            }

            List<String> imagePaths = new ArrayList<>();
            for (MultipartFile imageFile : imageFiles) {
                String fileName = System.currentTimeMillis() + "-" + imageFile.getOriginalFilename();
                Path destinationPath = Paths.get(uploadDir, fileName);
                Files.write(destinationPath, imageFile.getBytes());
                imagePaths.add("/uploads/" + fileName);
            }

            Post post = new Post(username, profilePic, description, imagePaths); // ➕ make sure your model is updated
            postRepository.save(post);

            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error saving post: " + e.getMessage());
        }
    }

    // ✅ Get all posts
    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // 🛠️ Update 
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updatePost(
        @PathVariable("id") String id,
        @RequestParam("username") String username,
        @RequestParam(value = "profilePic", required = false) String profilePic, // Optional profilePic
        @RequestParam("description") String description,
        @RequestParam(value = "images", required = false) List<MultipartFile> imageFiles) {
    
        try {
            Optional<Post> optionalPost = postRepository.findById(id);
            if (optionalPost.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
            }
    
            Post post = optionalPost.get();
    
            post.setUsername(username);
            if (profilePic != null && !profilePic.isEmpty()) {
                post.setProfilePic(profilePic); // Update profile pic if provided
            }
            post.setDescription(description);
    
            if (imageFiles != null && !imageFiles.isEmpty()) {
                List<String> imagePaths = new ArrayList<>();
                File uploadPath = new File(uploadDir);
                if (!uploadPath.exists()) {
                    uploadPath.mkdirs();
                }
    
                for (MultipartFile imageFile : imageFiles) {
                    String fileName = System.currentTimeMillis() + "-" + imageFile.getOriginalFilename();
                    Path destinationPath = Paths.get(uploadDir, fileName);
                    Files.write(destinationPath, imageFile.getBytes());
                    imagePaths.add("/uploads/" + fileName);
                }
    
                post.setImageUrls(imagePaths); // Replace old images with new ones
            }
    
            postRepository.save(post);
            return ResponseEntity.ok(post);
    
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating post: " + e.getMessage());
        }
    }
    
    

    // 🗑️ Delete a post
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") String id) {
        try {
            Optional<Post> optionalPost = postRepository.findById(id);
            if (optionalPost.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
            }
    
            Post post = optionalPost.get();
    
            if (post.getImageUrls() != null) {
                for (String url : post.getImageUrls()) {
                    String imagePath = url.replace("/uploads/", "uploads/");
                    File imageFile = new File(imagePath);
                    if (imageFile.exists()) {
                        imageFile.delete();
                    }
                }
            }
    
            postRepository.delete(post);
            return ResponseEntity.ok("Post deleted successfully");
    
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting post: " + e.getMessage());
        }
    }
    
}
