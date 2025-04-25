package com.example.backend.service.dasu;

import com.example.backend.model.dasu.Post;
import com.example.backend.repository.dasu.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.*;
import java.util.*;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    private final String uploadDir = "uploads/";

    public ResponseEntity<?> createPost(String username, String profilePic, String description, List<MultipartFile> imageFiles) {
        try {
            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists()) uploadPath.mkdirs();

            List<String> imagePaths = new ArrayList<>();
            for (MultipartFile file : imageFiles) {
                String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
                Path destination = Paths.get(uploadDir, fileName);
                Files.write(destination, file.getBytes());
                imagePaths.add("/uploads/" + fileName);
            }

            Post post = new Post(username, profilePic, description, imagePaths);
            postRepository.save(post);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error saving post: " + e.getMessage());
        }
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public ResponseEntity<?> updatePost(String id, String username, String profilePic, String description, List<MultipartFile> imageFiles) {
        try {
            Optional<Post> optionalPost = postRepository.findById(id);
            if (optionalPost.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
            }

            Post post = optionalPost.get();
            post.setUsername(username);
            if (profilePic != null && !profilePic.isEmpty()) {
                post.setProfilePic(profilePic);
            }
            post.setDescription(description);

            if (imageFiles != null && !imageFiles.isEmpty()) {
                File uploadPath = new File(uploadDir);
                if (!uploadPath.exists()) uploadPath.mkdirs();

                List<String> imagePaths = new ArrayList<>();
                for (MultipartFile file : imageFiles) {
                    String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
                    Path destination = Paths.get(uploadDir, fileName);
                    Files.write(destination, file.getBytes());
                    imagePaths.add("/uploads/" + fileName);
                }

                post.setImageUrls(imagePaths);
            }

            postRepository.save(post);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error updating post: " + e.getMessage());
        }
    }

    public ResponseEntity<?> deletePost(String id) {
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
                    if (imageFile.exists()) imageFile.delete();
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
