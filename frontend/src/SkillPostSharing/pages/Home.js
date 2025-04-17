import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigationbar from "../../SharedComponents/Navigationbar"; // Corrected import


import "../styles/styles.css";
import Post from "../components/Post";
import LeftSection from "../components/LeftSection";
import RightSection from "../components/RightSection";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [files, setFiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null); // Track which post is being edited

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/posts");
        setPosts(res.data.reverse()); // Show latest posts first
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = (deletedId) => {
    setPosts((prev) => prev.filter((post) => post._id !== deletedId));
  };

  const handleUpdatePost = async (updatedPost) => {
    try {
      const formData = new FormData();
      formData.append("username", updatedPost.username);
      formData.append("profilePic", updatedPost.profilePic);
      formData.append("description", updatedPost.description);

      updatedPost.imageUrls.forEach((image) => {
        formData.append("images", image); // Assuming image URLs are updated
      });

      const response = await axios.put(
        `http://localhost:8080/api/posts/${updatedPost._id}`,
        formData
      );

      setPosts((prev) =>
        prev.map((p) => (p._id === updatedPost._id ? response.data : p))
      );
      alert("Post updated successfully!");
      setIsModalOpen(false);
      setEditingPost(null);
    } catch (err) {
      alert("Error updating post. See console.");
      console.error("Error updating post:", err);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setPostText(post.description);
    setFiles(post.imageUrls); // Assuming images are handled
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }
    setFiles(selectedFiles);
  };

  const handlePostSubmit = async () => {
    const formData = new FormData();
    formData.append("username", "Dasuni");
    formData.append("profilePic", "/images/profilepic1.jpeg");
    formData.append("description", postText);

    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post("http://localhost:8080/api/posts", formData);
      alert("Post uploaded successfully!");
      setPosts((prev) => [response.data, ...prev]); // Add new post to top

      // Reset modal
      setIsModalOpen(false);
      setPostText("");
      setFiles([]);
    } catch (err) {
      alert("Error posting. See console.");
      console.error("Error posting:", err);
    }
  };

  return (
    <div>
      <Navigationbar />
      <div className="DASM-home-container">
        <div className="DASM-left-section">
          <LeftSection />
        </div>

        <div className="DASM-middle-section">
          <div className="DASM-create-post" onClick={() => setIsModalOpen(true)}>
            <img src="images/profilepic1.jpeg" alt="Profile" className="DASM-profile-pic" />
            <input type="text" placeholder="Start a post" className="DASM-post-input" readOnly />
            <div className="DASM-post-buttons">
              <button className="DASM-media-button">📷 Media</button>
              <button className="DASM-event-button">📅 Event</button>
              <button className="DASM-article-button">✍ Write Article</button>
            </div>
          </div>

          <div className="DASM-posts-container">
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onDelete={handleDelete}
                onUpdate={handleEdit} // Pass handleEdit for update functionality
              />
            ))}
          </div>
        </div>

        <RightSection />
      </div>

      {isModalOpen && (
        <div className="DASM-modal-overlay">
          <div className="DASM-modal-content">
            <h3>{editingPost ? "Edit Post" : "Create Post"}</h3>
            <textarea
              placeholder="Write something..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <input type="file" multiple onChange={handleFileChange} />
            <div className="DASM-modalM-buttons">
              <button onClick={editingPost ? () => handleUpdatePost(editingPost) : handlePostSubmit}>
                {editingPost ? "Update" : "Post"}
              </button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
