package com.example.backend.repository.sheha;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.backend.model.sheha.LearningPlan;

public interface LearningPlanRepository extends MongoRepository<LearningPlan, String> {

}
