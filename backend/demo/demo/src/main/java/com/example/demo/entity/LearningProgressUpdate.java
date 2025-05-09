package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.bson.types.Binary;

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
    private String progressId; // MongoDB uses String IDs, not Long
    private String userId;
    private String userName;
    private String courseName;
    private String courseDesc;
    private String difficultyLevel;
    private List<String> achMilestone;
    private String skillCat;
    private List<String> skillsLearned;
    private String courseRate;
    private String mediaUrl;
    private Binary attachment;
    private String attachmentName; // Optional: original file name
    private String attachmentType; // Optional: MIME type

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

}