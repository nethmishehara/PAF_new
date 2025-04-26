package com.example.demo.repository;
import com.example.demo.entity.LearningProgressUpdate;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LearningProgressUpdateRepo extends MongoRepository<LearningProgressUpdate, String> {
    @org.springframework.data.mongodb.repository.Query("SELECT l FROM LearningProgressUpdate l WHERE l.user.id = :userId ORDER BY l.createdAt DESC")
    List<LearningProgressUpdate> findByUserIdOrderByCreatedAtDesc(@Param("userId") String userId);

    List<LearningProgressUpdate> findAll();
}
