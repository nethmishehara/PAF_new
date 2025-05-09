package com.example.demo.repository;

//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    // Custom query methods can be defined here if needed
    // For example, to find a user by username:
    // User findByUsername(String username);
    
}
