package com.example.backend.controller.sheha;
import com.example.backend.model.sheha.LearningPlan;
import com.example.backend.service.sheha.LearningPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/learningplans")

public class LearningPlanController {
    
    @Autowired
    private LearningPlanService learningPlanService;

    // Create a new learning plan
    @PostMapping
    public ResponseEntity<LearningPlan> createLearningPlan(@RequestBody LearningPlan plan) {
        LearningPlan savedPlan = learningPlanService.createLearningPlan(plan);
        return new ResponseEntity<>(savedPlan, HttpStatus.CREATED);
    }

    // Get all learning plans
    @GetMapping
    public ResponseEntity<List<LearningPlan>> getAllLearningPlans() {
        List<LearningPlan> plans = learningPlanService.getAllLearningPlans();
        return new ResponseEntity<>(plans, HttpStatus.OK);
    }

    // Get a learning plan by ID
    @GetMapping("/{id}")
    public ResponseEntity<LearningPlan> getLearningPlanById(@PathVariable String id) {
        Optional<LearningPlan> plan = learningPlanService.getLearningPlanById(id);
        if (plan.isPresent()) {
            return new ResponseEntity<>(plan.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update an existing learning plan
    @PutMapping("/{id}")
    public ResponseEntity<LearningPlan> updateLearningPlan(@PathVariable String id, @RequestBody LearningPlan updatedPlan) {
        LearningPlan updated = learningPlanService.updateLearningPlan(id, updatedPlan);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a learning plan by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLearningPlan(@PathVariable String id) {
        learningPlanService.deleteLearningPlan(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
