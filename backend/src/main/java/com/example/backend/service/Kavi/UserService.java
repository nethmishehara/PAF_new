package com.example.backend.service.Kavi;

import com.example.backend.model.Kavi.User;
import com.example.backend.repository.Kavi.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository repo) {
        this.userRepo = repo;
    }

    // ✅ Create a new user
    public User createUser(User user) {
        return userRepo.save(user);
    }

    // ✅ Get user by ID
    public User getUserById(String id) {
        return userRepo.findById(id).orElse(null);
    }

    // ✅ Get following list
   /*  public List<String> getFollowing(String userId) {
        User user = getUserById(userId);
        return user != null && user.getFollowing() != null ? user.getFollowing() : Collections.emptyList();
    }*/

    // ✅ Follow another user
    public boolean followUser(String currentUserId, String targetUserId) {
        if (currentUserId.equals(targetUserId)) return false;

        User current = getUserById(currentUserId);
        User target = getUserById(targetUserId);

        if (current != null && target != null) {
            if (!current.getFollowing().contains(targetUserId)) {
                current.getFollowing().add(targetUserId);
                target.getFollowers().add(currentUserId);
                userRepo.save(current);
                userRepo.save(target);
                return true;
            }
        }
        return false;
    }

    // ✅ Unfollow a user
    public boolean unfollowUser(String currentUserId, String targetUserId) {
        User current = getUserById(currentUserId);
        User target = getUserById(targetUserId);

        if (current != null && target != null) {
            current.getFollowing().remove(targetUserId);
            target.getFollowers().remove(currentUserId);
            userRepo.save(current);
            userRepo.save(target);
            return true;
        }
        return false;
    }

    // ✅ Update user profile
    public User updateUserProfile(String id, User updatedUser) {
        Optional<User> existingUserOptional = userRepo.findById(id);
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            existingUser.setName(updatedUser.getName());
            existingUser.setBio(updatedUser.getBio());
            existingUser.setProfilePicture(updatedUser.getProfilePicture());
            existingUser.setSkills(updatedUser.getSkills());
            existingUser.setSkillsToImprove(updatedUser.getSkillsToImprove());
            return userRepo.save(existingUser);
        }
        return null;
    }

    // ✅ Get all users
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
}
