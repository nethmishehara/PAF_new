package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "learning_progress_updates")
public class LearningProgressUpdate {
    @Id
    private String progressId;  // MongoDB uses String IDs, not Long
    
    // @DBRef
    // private User user;  // Use DBRef for references to other documents
    
    private String courseName;
    // private String generatedText;
    // private Map<String, String> placeholders;
    // private List<String> mediaUrls;
    // private List<String> tags;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;

}