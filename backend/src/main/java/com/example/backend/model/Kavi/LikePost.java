package com.example.backend.model.Kavi;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "post_likes")
public class LikePost {
    @Id
    private String id;
    private String postId;
    private String userId;

    public LikePost() {}

    public LikePost(String postId, String userId) {
        this.postId = postId;
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
