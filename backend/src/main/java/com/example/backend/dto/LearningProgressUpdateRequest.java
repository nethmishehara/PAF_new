package com.example.demo.dto;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class LearningProgressUpdateRequest {
    private String progressId;  // MongoDB uses String IDs, not Long
   // private String userId;
    private String courseName;
    // private Map<String, String> placeholders;
    // private List<String> mediaUrls;
    // private List<String> tags;
}