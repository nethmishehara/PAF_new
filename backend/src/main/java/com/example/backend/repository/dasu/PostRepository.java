package com.example.backend.repository.dasu;



import com.example.backend.model.dasu.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
}