package com.example.backend.model.dasu;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "posts")
public class Post {
    @Id
    private String id;

    private String username;
    private String profilePic;
    private String description;
    private List<String> imageUrls; // ✨ updated from imageUrl to imageUrls
    private Date createdAt;

    public Post() {}

    public Post(String username, String profilePic, String description, List<String> imageUrls) {
        this.username = username;
        this.profilePic = profilePic;
        this.description = description;
        this.imageUrls = imageUrls;
        this.createdAt = new Date();
    }

    // 💫 Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
