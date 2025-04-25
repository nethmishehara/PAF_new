package com.example.backend.model.Kavi;

import java.util.Date;

public class Comment {
    private String id;
    private String userId;
    private String postId;
    private String content;
    private Date timestamp;

    // Constructors
    public Comment() {}

    public Comment(String id, String userId, String postId, String content, Date timestamp) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getPostId() { return postId; }
    public void setPostId(String postId) { this.postId = postId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Date getTimestamp() { return timestamp; }
    public void setTimestamp(Date timestamp) { this.timestamp = timestamp; }
}
