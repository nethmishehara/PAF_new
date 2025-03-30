import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SkillCategories from "../components/SkillCategories";
import "../styles/styles.css";
import { posts } from "../assets/posts";
import Post from "../components/Post";
import LearningSection from "../components/LearningSection";
import RightSection from "../components/RightSection"; // Import RightSection

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to handle post submission
  const handlePostSubmit = () => {
    console.log("Post Text:", postText);
    console.log("Uploaded File:", file);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        {/* Left Sidebar - Skill Categories */}
        <div className="left-section">
          <LearningSection />
        </div>

        {/* Middle Section - Posts */}
        <div className="middle-section">
          <div className="create-post" onClick={() => setIsModalOpen(true)}>
            <img src="images/profilepic1.jpeg" alt="Profile" className="profile-pic" />
            <input type="text" placeholder="Start a post" className="post-input" readOnly />
            <div className="post-buttons">
              <button className="media-button">📷 Media</button>
              <button className="event-button">📅 Event</button>
              <button className="article-button">✍ Write Article</button>
            </div>
          </div>

          <div className="posts-container">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Right Section - Imported as a Component */}
        <RightSection />
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create Post</h3>
            <textarea
              placeholder="Write something..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <input type="file" onChange={handleFileChange} />
            <div className="modal-buttons">
              <button onClick={handlePostSubmit}>Post</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
