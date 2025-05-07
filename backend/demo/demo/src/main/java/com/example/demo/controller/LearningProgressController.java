// filepath: e:\Y3S1 SPRINGBOOT PROJECT\demo\demo\src\main\java\com\example\demo\controller\LearningProgressController.java
package com.example.demo.controller;

import com.example.demo.dto.LearningProgressUpdateRequest;
import com.example.demo.entity.LearningProgressUpdate;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.LearningProgressUpdateRepo;
import com.example.demo.service.LearningProgressUpdateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class LearningProgressController {

    @Autowired
    private LearningProgressUpdateService progressService;

    @Autowired
    private LearningProgressUpdateRepo progressUpdateRepo;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<LearningProgressUpdate>> getAllProgressUpdates() {
        try {
            List<LearningProgressUpdate> progress = progressService.getAlLearningProgressUpdates();
            return ResponseEntity.ok(progress);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Handle error case
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<LearningProgressUpdate>> getProgressUpdatesByUserId(@PathVariable String userId) {
        try {
            List<LearningProgressUpdate> progress = progressService.getLearningProgressUpdatesByUserId(userId);
            return ResponseEntity.ok(progress);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Handle error case
        }
    }

    @PostMapping
    public ResponseEntity<LearningProgressUpdate> createProgressUpdate(
            @RequestBody LearningProgressUpdateRequest request) {
        try {
            LearningProgressUpdate progressUpdate = new LearningProgressUpdate();
            progressUpdate.setProgressId(request.getProgressId());
            progressUpdate.setCourseName(request.getCourseName());
            progressUpdate.setUserName(request.getUserName());
            progressUpdate.setUserId(request.getUserId());
            progressUpdate.setCourseDesc(request.getCourseDesc());
            progressUpdate.setDifficultyLevel(request.getDifficultyLevel());
            progressUpdate.setSkillCat(request.getSkillCat());
            progressUpdate.setCourseRate(request.getCourseRate());
            progressUpdate.setMediaUrl(request.getMediaUrl());

            List<String> skillsList = request.getSkillsLearned();
            if(skillsList == null){
                skillsList = new ArrayList<>();
            }

            List<String> achivList = request.getSkillsLearned();
            if(achivList == null){
                achivList = new ArrayList<>();
            }

            progressUpdate.setSkillsLearned(skillsList);
            progressUpdate.setAchMilestone(achivList);
            
            progressUpdateRepo.save(progressUpdate);
            return ResponseEntity.ok(progressUpdate);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Handle error case
        }
    }

    @PutMapping("/{progressId}")
    public ResponseEntity<LearningProgressUpdate> updateResponse(@PathVariable String progressId,
            @RequestBody LearningProgressUpdateRequest request) {
        try {
            LearningProgressUpdate exisprogressUpdate = progressService.getLearningProgressUpdateById(progressId);
            if (exisprogressUpdate == null) {
                return ResponseEntity.notFound().build(); // Handle not found case
            }
            exisprogressUpdate.setProgressId(request.getProgressId());
            exisprogressUpdate.setCourseName(request.getCourseName());
            exisprogressUpdate.setUserName(request.getUserName());
            exisprogressUpdate.setUserId(request.getUserId());
            exisprogressUpdate.setCourseDesc(request.getCourseDesc());
            exisprogressUpdate.setDifficultyLevel(request.getDifficultyLevel());
            exisprogressUpdate.setSkillCat(request.getSkillCat());
            exisprogressUpdate.setCourseRate(request.getCourseRate());
            exisprogressUpdate.setMediaUrl(request.getMediaUrl());

            List<String> skillsList = request.getSkillsLearned();
            if(skillsList == null){
                skillsList = new ArrayList<>();
            }

            List<String> achivList = request.getSkillsLearned();
            if(achivList == null){
                achivList = new ArrayList<>();
            }
            exisprogressUpdate.setSkillsLearned(skillsList);
            exisprogressUpdate.setAchMilestone(achivList);

            progressUpdateRepo.save(exisprogressUpdate);
            return ResponseEntity.ok(exisprogressUpdate);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Handle error case
        }
    }

    @DeleteMapping("/{progressId}")
    public ResponseEntity<String> deleteProgressUpdate(@PathVariable String progressId) {
        progressService.deleteLearningProgressUpdate(progressId);
        return ResponseEntity.ok("Progress update deleted successfully");
    }
}