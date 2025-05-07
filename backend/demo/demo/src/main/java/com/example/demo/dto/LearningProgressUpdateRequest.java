package com.example.demo.dto;
import java.util.List;

import lombok.Data;


@Data
public class LearningProgressUpdateRequest {
    private String progressId;  // MongoDB uses String IDs, not Long
   // private String userId;
    private String courseName;
    private String userId;
    private String userName;
    private String courseDesc;
    private String difficultyLevel;
    private List<String> achMilestone;
    private String skillCat;
    private List<String> skillsLearned;
    private String courseRate;
    private String mediaUrl;
}