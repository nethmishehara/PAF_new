package com.example.backend.service.Kavi;

import com.example.backend.model.Kavi.Course;
import com.example.backend.model.User;
import com.example.backend.repsitory.Kavi.CourseRepository;
import com.example.backend.repsitory.Kavi.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RecommendationService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Course> recommendCourses(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getSkills() == null) {
            return List.of();
        }
        return courseRepository.findByTagsIn(user.getSkills());
    }
}
