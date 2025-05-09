package com.example.backend.controller.Kavi;

import com.example.backend.model.Kavi.User;
import com.example.backend.service.Kavi.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ Create a new user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    // ✅ Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        User user = userService.getUserById(id);
        return user != null
                ? ResponseEntity.ok(user)
                : ResponseEntity.status(404).body("User not found with ID: " + id);
    }

    // ✅ Get the list of users the user is following
   /*  @GetMapping("/{id}/following")
    public ResponseEntity<?> getFollowing(@PathVariable String id) {
        List<String> following = userService.getFollowing(id);
        return following != null
                ? ResponseEntity.ok(following)
                : ResponseEntity.status(404).body("User not found or no followings");
    }*/

    // ✅ Follow another user
    // @PostMapping("/{currentUserId}/follow/{targetUserId}")
    // public ResponseEntity<String> followUser(
    //         @PathVariable String currentUserId,
    //         @PathVariable String targetUserId) {

    //     boolean success = userService.followUser(currentUserId, targetUserId);
    //     return success
    //             ? ResponseEntity.ok("Followed successfully")
    //             : ResponseEntity.status(400).body("Failed to follow");
    // }

    // // ✅ Unfollow a user
    // @DeleteMapping("/{currentUserId}/follow/{targetUserId}")
    // public ResponseEntity<String> unfollowUser(
    //         @PathVariable String currentUserId,
    //         @PathVariable String targetUserId) {

    //     boolean success = userService.unfollowUser(currentUserId, targetUserId);
    //     return success
    //             ? ResponseEntity.ok("Unfollowed successfully")
    //             : ResponseEntity.status(400).body("Failed to unfollow");
   // }

    // ✅ Update user profile
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserProfile(
            @PathVariable String id,
            @RequestBody User updatedUser) {

        User updated = userService.updateUserProfile(id, updatedUser);
        return updated != null
                ? ResponseEntity.ok(updated)
                : ResponseEntity.status(404).body("User not found to update");
    }

    // ✅ Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
