package com.example.demo.service;

import com.example.demo.entity.LearningProgressUpdate;
import com.example.demo.entity.User;
import com.example.demo.repository.LearningProgressUpdateRepo;
import com.example.demo.repository.UserRepository;
import com.example.demo.dto.LearningProgressUpdateRequest;
//import com.example.demo.dto.LearningProgressUpdateResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;



@Service
public class LearningProgressUpdateServiceImpl implements LearningProgressUpdateService {

    @Autowired
    private LearningProgressUpdateRepo progUpdateRepo;


    @Autowired
    private UserRepository userRepository;

    @Override
    public List<LearningProgressUpdate> getAlLearningProgressUpdates() {
       return progUpdateRepo.findAll();
        
    }

    @Override
    public LearningProgressUpdate getLearningProgressUpdateById(String id) {
        return progUpdateRepo.findById(id).orElse(null);
    }

    @Override
    public LearningProgressUpdate createLearningProgressUpdate(LearningProgressUpdate request) {
        // Check if user exists
       
        // Save and return the saved entity
        return progUpdateRepo.save(request);
    }
    
@Override
    public LearningProgressUpdate updateLearningProgressUpdate(String progressId, LearningProgressUpdate request) {    
        LearningProgressUpdate existingProgress = progUpdateRepo.findById(progressId).orElse(null);
        if (existingProgress == null) {
            return null; // Handle not found case
        }
        return progUpdateRepo.save(existingProgress); // Return the updated request
    }

    @Override
    public void  deleteLearningProgressUpdate(String progressId) {
        LearningProgressUpdate update = progUpdateRepo.findById(progressId).orElse(null);
    
        progUpdateRepo.delete(update);// Return the deleted update as a response

    }
}
