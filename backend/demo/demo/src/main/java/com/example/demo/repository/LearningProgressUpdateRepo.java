package com.example.demo.repository;
import com.example.demo.entity.LearningProgressUpdate;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LearningProgressUpdateRepo extends MongoRepository<LearningProgressUpdate, String> {
    List<LearningProgressUpdate> findByUserId(String userId);


    List<LearningProgressUpdate> findAll();
}
