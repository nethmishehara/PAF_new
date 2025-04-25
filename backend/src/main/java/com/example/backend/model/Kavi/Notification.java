package com.example.backend.model.Kavi;

import java.util.Date;

public class Notification {
    private String id;
    private String userId;       // The recipient of the notification
    private String message;
    private Date timestamp;
    private boolean read;

    public Notification() {}

    public Notification(String userId, String message, Date timestamp) {
        this.userId = userId;
        this.message = message;
        this.timestamp = timestamp;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

      // Add the setter for read
      public void setRead(boolean read) {
        this.read = read;
    }
}
