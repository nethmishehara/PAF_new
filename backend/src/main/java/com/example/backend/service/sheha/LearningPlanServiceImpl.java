package com.example.backend.service.sheha;
import com.example.backend.model.sheha.LearningPlan;
import com.example.backend.repository.sheha.LearningPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LearningPlanServiceImpl implements LearningPlanService {
    @Autowired
    private LearningPlanRepository learningPlanRepository;

    @Override
    public LearningPlan createLearningPlan(LearningPlan plan) {
        return learningPlanRepository.save(plan);
    }

    @Override
    public List<LearningPlan> getAllLearningPlans() {
        return learningPlanRepository.findAll();
    }

    @Override
    public Optional<LearningPlan> getLearningPlanById(String id) {
        return learningPlanRepository.findById(id);
    }

    @Override
    public LearningPlan updateLearningPlan(String id, LearningPlan updatedPlan) {
        if (learningPlanRepository.existsById(id)) {
            updatedPlan.setId(id);  // Ensures the ID remains the same for updating
            return learningPlanRepository.save(updatedPlan);
        }
        return null;  // Return null if the learning plan doesn't exist
    }

    @Override
    public void deleteLearningPlan(String id) {
        learningPlanRepository.deleteById(id);
    }
}
