package com.example.backend.model.Kavi;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "likes")
public class Like {

    @Id
    private String id;

    private String userId;
    private String postId;      // Used if it's a post like
    private String commentId;   // Used if it's a comment like
    private LocalDateTime timestamp;

    // ✅ Default constructor
    public Like() {
        this.timestamp = LocalDateTime.now();
    }

    // ✅ Constructor for comment like
    public Like(String commentId, String userId) {
        this.commentId = commentId;
        this.userId = userId;
        this.timestamp = LocalDateTime.now();
    }

    // ✅ Constructor for post like
    public Like(String postId, String userId, boolean isPost) {
        if (isPost) {
            this.postId = postId;
        }
        this.userId = userId;
        this.timestamp = LocalDateTime.now();
    }

    // ✅ Getters and setters
    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
