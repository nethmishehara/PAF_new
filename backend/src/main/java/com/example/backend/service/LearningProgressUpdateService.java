package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.LearningProgressUpdate;

@Service
public interface LearningProgressUpdateService {
    List<LearningProgressUpdate> getAlLearningProgressUpdates();

    LearningProgressUpdate getLearningProgressUpdateById(String id);

    LearningProgressUpdate createLearningProgressUpdate(LearningProgressUpdate learningProgressUpdate);

    LearningProgressUpdate updateLearningProgressUpdate(String id, LearningProgressUpdate learningProgressUpdate);

    void deleteLearningProgressUpdate(String id);
}
