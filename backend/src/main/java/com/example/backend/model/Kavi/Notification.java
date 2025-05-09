package com.example.backend.model.Kavi;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notifications")
public class Notification {

    private String userId; // User who will receive the notification
    private String message; // The message for the notification
    private String type; // The type of notification (e.g., "like", "comment")
    private String recipientUserId; // The user who will receive the notification
    private String actorUserId; // The user who triggered the action (like, comment, etc.)
    private String postId; // The post ID related to the notification
    private boolean read; // Indicates whether the notification is read or not
    private Long timestamp; // Store timestamp (milliseconds)

    // Getters and Setters

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRecipientUserId() {
        return recipientUserId;
    }

    public void setRecipientUserId(String recipientUserId) {
        this.recipientUserId = recipientUserId;
    }

    public String getActorUserId() {
        return actorUserId;
    }

    public void setActorUserId(String actorUserId) {
        this.actorUserId = actorUserId;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    // Getter and Setter for the timestamp field
    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    // You can also include a method to initialize the timestamp when a notification is created
    public void setCurrentTimestamp() {
        this.timestamp = System.currentTimeMillis(); // Sets the timestamp to the current system time
    }
}
