package com.example.backend.repsitory.Kavi;

import com.example.backend.model.Kavi.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByTagsIn(List<String> tags);
}
