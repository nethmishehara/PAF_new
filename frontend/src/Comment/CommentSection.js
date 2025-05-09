import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CommentSection.css";

const CommentSection = ({ postId, currentUserId, postOwnerId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [likedComments, setLikedComments] = useState({});

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comments/post/${postId}`);
      setComments(res.data);

      const likedMap = {};
      for (const comment of res.data) {
        const likeRes = await axios.get(`/api/likes/comment/${comment.id}/user/${currentUserId}`);
        likedMap[comment.id] = likeRes.data;
      }
      setLikedComments(likedMap);
    } catch (err) {
      console.error("Error fetching comments", err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post("/api/comments", {
        postId,
        userId: currentUserId,
        content: newComment,
      });

      if (currentUserId !== postOwnerId) {
        await axios.post("/api/notifications/create", {
          recipientUserId: postOwnerId,
          actorUserId: currentUserId,
          postId,
          type: "COMMENT",
        });
      }
      fetchComments();
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleDeleteComment = async (comment) => {
    if (comment.userId !== currentUserId && postOwnerId !== currentUserId) {
      alert("You do not have permission to delete this comment.");
      return;
    }
    try {
      await axios.delete(`/api/comments/${comment.id}`);
      fetchComments();
    } catch (err) {
      console.error("Error deleting comment", err);
    }
  };

  const handleEditClick = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleUpdateComment = async () => {
    try {
      await axios.put(`/api/comments/${editingCommentId}`, {
        content: editingContent,
      });
      setEditingCommentId(null);
      setEditingContent("");
      fetchComments();
    } catch (err) {
      console.error("Error updating comment", err);
    }
  };

  const handleToggleLike = async (commentId) => {
    try {
      const isLiked = likedComments[commentId];
      if (isLiked) {
        await axios.delete(`/api/likes/comment/${commentId}/user/${currentUserId}`);
      } else {
        await axios.post(`/api/likes/comment/${commentId}/user/${currentUserId}`);

        // Send notification to comment owner (if not the one liking)
        const comment = comments.find(c => c.id === commentId);
        if (comment && comment.userId !== currentUserId) {
          await axios.post("/api/notifications/create", {
            recipientUserId: comment.userId,
            actorUserId: currentUserId,
            postId,
            type: "LIKE_COMMENT",
          });
        }
      }
      fetchComments();
    } catch (err) {
      console.error("Error toggling like", err);
    }
  };

  return (
    <div className="comment-section">
      <h4 className="comment-title">💬 Comments</h4>

      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          {editingCommentId === comment.id ? (
            <div className="edit-area">
              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
              <div className="edit-buttons">
                <button onClick={handleUpdateComment} className="btn update">💾 Update</button>
                <button onClick={() => setEditingCommentId(null)} className="btn cancel">✖ Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className="comment-header">
                <strong className="comment-user">{comment.userId}</strong>
                <span className="comment-time">
                  {new Date(comment.timestamp || Date.now()).toLocaleString()}
                </span>
              </div>
              <p className="comment-content">{comment.content}</p>
              <div className="comment-actions">
                <button onClick={() => handleToggleLike(comment.id)} className="btn like">
                  {likedComments[comment.id] ? "💙" : "🤍"} Like
                </button>
                {comment.userId === currentUserId && (
                  <button onClick={() => handleEditClick(comment.id, comment.content)} className="btn edit">
                    ✏️ Edit
                  </button>
                )}
                {(comment.userId === currentUserId || postOwnerId === currentUserId) && (
                  <button onClick={() => handleDeleteComment(comment)} className="btn delete">
                    🗑️ Delete
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      ))}

      <div className="comment-input">
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment} className="btn post">➤ Post</button>
      </div>
    </div>
  );
};

export default CommentSection;
