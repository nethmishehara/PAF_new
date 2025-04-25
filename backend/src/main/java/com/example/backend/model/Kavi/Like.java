package com.example.backend.model.Kavi;

public class Like {
    private String userId;

    public Like() {}

    public Like(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
