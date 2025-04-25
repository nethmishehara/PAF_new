package com.example.backend.service.Kavi;

import com.example.backend.model.Kavi.Comment;
import com.example.backend.model.Kavi.Notification;
import com.example.backend.model.Kavi.Post;
import com.example.backend.repsitory.Kavi.CommentRepository;
import com.example.backend.repsitory.Kavi.NotificationRepository;
import com.example.backend.repsitory.Kavi.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getCommentById(String id) {
        return commentRepository.findById(id);
    }

    public List<Comment> getCommentsByPostId(String postId) {
        return commentRepository.findByPostId(postId);
    }

    public Comment addComment(Comment comment) {
        comment.setTimestamp(new Date());
        Comment savedComment = commentRepository.save(comment);

        // Send notification to post owner if commenter is not the post owner
        postRepository.findById(comment.getPostId()).ifPresent(post -> {
            if (!post.getUserId().equals(comment.getUserId())) {
                Notification notification = new Notification();
                notification.setUserId(post.getUserId());
                notification.setMessage("New comment on your post");
                notification.setTimestamp(new Date());
                notificationRepository.save(notification);
            }
        });

        return savedComment;
    }

    public Comment updateComment(Comment comment) {
        comment.setTimestamp(new Date());
        return commentRepository.save(comment);
    }

    public void deleteComment(String id) {
        commentRepository.deleteById(id);
    }
}
