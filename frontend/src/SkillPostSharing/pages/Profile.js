import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigationbar from "../../SharedComponents/Navigationbar";
import Post from "../components/Post";

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [posts, setPosts] = useState([]);
  const username = "Dasuni"; // Replace with real user session if needed

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/posts");
        const userPosts = res.data.filter(post => post.username === username);
        setPosts(userPosts.reverse());
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = (deletedId) => {
    setPosts((prev) => prev.filter((post) => post._id !== deletedId));
  };

  const handleEdit = (post) => {
    // Not implemented in UI but passed for future modal
    console.log("Edit post:", post);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f5f5f5' }}>
      <Navigationbar />

      {/* Profile Info Section */}
      <div className="profile-info-container" style={{
        textAlign: 'center',
        padding: '60px 20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        marginBottom: '40px',
        borderBottom: '2px solid #eee',
        position: 'relative'
      }}>
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="profile-pic"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: '3px solid #ccc',
            objectFit: 'cover',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
          }}
        />
        <h2 className="username" style={{
          marginTop: '20px', 
          fontSize: '28px', 
          color: '#333', 
          fontWeight: '600'
        }}>
          {username}
        </h2>
        <button
          onClick={handleFollowToggle}
          className="follow-button"
          style={{
            padding: '10px 30px',
            marginTop: '15px',
            backgroundColor: isFollowing ? '#e74c3c' : '#3498db',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>

      {/* Posts Section */}
      <div className="posts-container" style={{
        padding: '20px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#fff',
      }}>
        {posts.map((post) => (
          <div
            key={post._id}
            className="post-item"
            style={{
              width: '100%',
              maxWidth: '800px',
              margin: '20px 0',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              padding: '20px',
            }}
          >
            <Post post={post} onDelete={handleDelete} onUpdate={handleEdit} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
