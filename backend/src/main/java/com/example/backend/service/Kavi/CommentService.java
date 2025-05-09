package com.example.backend.service.Kavi;

import com.example.backend.model.Kavi.Comment;
import com.example.backend.repository.Kavi.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByPostId(String postId) {
        return commentRepository.findByPostId(postId);
    }

    public Optional<Comment> getCommentById(String id) {
        return commentRepository.findById(id);
    }

    public Comment updateComment(String id, String content) {
        Optional<Comment> existing = commentRepository.findById(id);
        if (existing.isPresent()) {
            Comment comment = existing.get();
            comment.setContent(content);
            return commentRepository.save(comment);
        } else {
            throw new RuntimeException("Comment not found with id: " + id);
        }
    }

    public void deleteComment(String id) {
        commentRepository.deleteById(id);
    }
}
