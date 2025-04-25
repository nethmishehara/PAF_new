package com.example.backend.service.sheha;


import com.example.backend.model.sheha.LearningPlan;
import java.util.List;
import java.util.Optional;
public interface LearningPlanService {

    LearningPlan createLearningPlan(LearningPlan plan);

    List<LearningPlan> getAllLearningPlans();

    Optional<LearningPlan> getLearningPlanById(String id);

    LearningPlan updateLearningPlan(String id, LearningPlan updatedPlan);

    void deleteLearningPlan(String id);
}

