import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/keyboard";
import CommentSection from "../../Comment/CommentSection";
import axios from "axios";

const Post = ({ post, onDelete, onUpdate }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(post.username);
  const [newDescription, setNewDescription] = useState(post.description);
  const [newProfilePic, setNewProfilePic] = useState(post.profilePic);
  const [newImages, setNewImages] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const currentUserId = "user123"; // Replace with actual user ID from auth

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/post-likes/post/${post.id}/user/${currentUserId}`
        );
        setLiked(res.data);
      } catch (err) {
        console.error("Error checking like status", err);
      }
    };

    const fetchLikeCount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/post-likes/post/${post.id}/count`
        );
        setLikeCount(res.data);
      } catch (err) {
        console.error("Error fetching like count", err);
      }
    };

    fetchLikeStatus();
    fetchLikeCount();
  }, [post.id, currentUserId]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/posts/${post.id}`);
      if (res.status === 200) {
        onDelete(post.id);
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", newUsername);
    formData.append("profilePic", newProfilePic);
    formData.append("description", newDescription);
    newImages.forEach((image) => formData.append("images", image));

    try {
      const res = await fetch(`http://localhost:8080/api/posts/${post.id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        const updatedPost = await res.json();
        onUpdate(updatedPost);
        setEditMode(false);
      }
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
        await axios.delete(
          `http://localhost:8080/api/post-likes/post/${post.id}/user/${currentUserId}`
        );
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await axios.post(
          `http://localhost:8080/api/post-likes/post/${post.id}/user/${currentUserId}`
        );
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error liking/unliking post", err);
    }
  };

  return (
    <div className="DASM-post">
      <div className="DASM-post-header">
        <img src={post.profilePic} alt="Profile" className="DASM-profile-pic" />
        <div>
          <h4>{post.username}</h4>
        </div>
        <div className="DASM-post-menu">
          <button onClick={() => setShowOptions(!showOptions)} className="DASM-dots-btn">
            ⋮
          </button>
          {showOptions && (
            <div className="DASM-options-dropdown">
              <button onClick={() => setEditMode(!editMode)}>✏️ Edit</button>
              <button onClick={handleDelete}>🗑️ Delete</button>
            </div>
          )}
        </div>
      </div>

      {!editMode ? (
        <p className="DASM-post-content">{post.description}</p>
      ) : (
        <form onSubmit={handleUpdate}>
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Update description"
          />
          <button type="submit">Update Post</button>
        </form>
      )}

      {post.imageUrls && post.imageUrls.length > 0 && (
        <Swiper
          navigation
          keyboard={{ enabled: true }}
          modules={[Navigation, Keyboard]}
          className="DASM-post-carousel"
        >
          {post.imageUrls.map((url, index) => {
            const fullUrl = url.startsWith("http") ? url : `http://localhost:8080${url}`;
            const isVideo = /\.(mp4|webm|ogg)$/.test(url);
            return (
              <SwiperSlide key={index}>
                {isVideo ? (
                  <video controls className="DASM-post-image">
                    <source src={fullUrl} type="video/mp4" />
                  </video>
                ) : (
                  <img src={fullUrl} alt={`Slide ${index}`} className="DASM-post-image" />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <div className="DASM-post-actions">
        <button
          onClick={handleLike}
          className={`DASM-like-button ${liked ? "liked" : ""}`}
        >
          {liked ? "💙 Liked" : "👍 Like"} {likeCount > 0 && `(${likeCount})`}
        </button>
        <button onClick={() => setShowComments(!showComments)}>💬 Comment</button>
        <button>🔄 Share</button>
      </div>

      {showComments && (
        <div className="DASM-comments-section">
          <CommentSection
            postId={post.id}
            currentUserId={currentUserId}
            postOwnerId={post.userId}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
