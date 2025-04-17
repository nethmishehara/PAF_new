import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/keyboard";

const Post = ({ post, onDelete, onUpdate }) => {
  console.log(post); // Check if post has the 'id'
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(post.username);
  const [newDescription, setNewDescription] = useState(post.description);
  const [newProfilePic, setNewProfilePic] = useState(post.profilePic);
  const [newImages, setNewImages] = useState([]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/posts/${post.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete(post.id); // Tell parent to remove from state
      } else {
        console.error("Failed to delete post");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleUpdate = async (e) => {
   
    const postId = post.id;
  
    console.log("Updating post with ID:", postId); // Log postId to check
  
    if (!postId) {
      console.error("Post ID is missing");
      return;
    }
  
    const formData = new FormData();
    formData.append("username", newUsername);
    formData.append("profilePic", newProfilePic);
    formData.append("description", newDescription);
    newImages.forEach((image) => {
      formData.append("images", image);
    });
  
    try {
      const res = await fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: "PUT",
        body: formData,
      });
  
      if (res.ok) {
        const updatedPost = await res.json();
        onUpdate(updatedPost); // Update the post in parent state
        setEditMode(false); // Exit edit mode
      } else {
        console.error("Failed to update post");
      }
    } catch (err) {
      console.error("Error updating post:", err);
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
          <button onClick={() => setShowOptions(!showOptions)} className="DASM-dots-btn">⋮</button>
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
          
          <div>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Update description"
            />
          </div>
          
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
            const fullUrl = `http://localhost:8080${url}`;
            const isVideo = url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg");

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
        <button>👍 Like</button>
        <button>💬 Comment</button>
        <button>🔄 Share</button>
      </div>
    </div>
  );
};

export default Post;
