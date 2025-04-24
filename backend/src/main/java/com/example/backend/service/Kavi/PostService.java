package com.example.backend.service.Kavi;

import com.example.backend.model.Kavi.*;
import com.example.backend.repsitory.Kavi.PostRepository;
import com.example.backend.repsitory.Kavi.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID; // ✅ Fix for UUID error



@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post createPost(Post post) {
        post.setLikes(new ArrayList<>());
        post.setComments(new ArrayList<>());
        return postRepository.save(post);
    }

    public Optional<Post> getPostById(String postId) {
        return postRepository.findById(postId);
    }

    public Post likePost(String postId, String userId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) return null;

        post.getLikes().add(new Like(userId));
        postRepository.save(post);

        // Create notification
        if (!post.getUserId().equals(userId)) {
            Notification notif = new Notification();
            notif.setUserId(post.getUserId());
            notif.setMessage("Your post was liked by " + userId);
            notif.setRead(false);
            notificationRepository.save(notif);
        }

        return post;
    }

    public Post commentOnPost(String postId, String userId, String content) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) return null;

        Comment comment = new Comment();
        comment.setId(UUID.randomUUID().toString());
        comment.setUserId(userId);
        comment.setContent(content);

        post.getComments().add(comment);
        postRepository.save(post);

        // Create notification
        if (!post.getUserId().equals(userId)) {
            Notification notif = new Notification();
            notif.setUserId(post.getUserId());
            notif.setMessage("Your post was commented on by " + userId);
            notif.setRead(false);
            notificationRepository.save(notif);
        }

        return post;
    }

    public Post updateComment(String postId, String commentId, String userId, String newContent) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) return null;

        for (Comment comment : post.getComments()) {
            if (comment.getId().equals(commentId) && comment.getUserId().equals(userId)) {
                comment.setContent(newContent);
                break;
            }
        }

        return postRepository.save(post);
    }

    public Post deleteComment(String postId, String commentId, String userId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) return null;

        post.getComments().removeIf(comment ->
                comment.getId().equals(commentId) &&
                (comment.getUserId().equals(userId) || post.getUserId().equals(userId)));

        return postRepository.save(post);
    }
}
