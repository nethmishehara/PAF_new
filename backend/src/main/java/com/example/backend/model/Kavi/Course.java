package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "courses")
public class Course {
    @Id
    private String id;
    private String title;
    private String description;
    private List<String> tags; // Skill tags the course is related to
    private String instructor;
    private String url;

    // Constructors
    public Course() {}

    public Course(String title, String description, List<String> tags, String instructor, String url) {
        this.title = title;
        this.description = description;
        this.tags = tags;
        this.instructor = instructor;
        this.url = url;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public String getInstructor() { return instructor; }
    public void setInstructor(String instructor) { this.instructor = instructor; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}
