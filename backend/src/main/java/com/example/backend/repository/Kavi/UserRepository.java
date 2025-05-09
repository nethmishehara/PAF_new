package com.example.backend.repository.Kavi;

import com.example.backend.model.Kavi.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
