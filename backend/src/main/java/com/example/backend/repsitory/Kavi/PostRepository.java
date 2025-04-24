package com.example.backend.repsitory.Kavi;

import com.example.backend.model.Kavi.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
}
