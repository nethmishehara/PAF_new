import React, { useState } from "react";
import "./profile.css";
import Editprofile from "./Editprofile";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    bio: "Full Stack Developer at TechCorp",
    role: "Student",
    company: "",
    university: "SLIIT",
    skills: ["React", "JavaScript"],
    followers: 0,
    connections: [],
    profilePicture: "https://via.placeholder.com/150", // Placeholder image
  });

  const [suggestedUsers, setSuggestedUsers] = useState([
    { id: 1, name: "Alice", profilePic: "https://via.placeholder.com/150" },
    { id: 2, name: "Bob", profilePic: "https://via.placeholder.com/150" },
    { id: 3, name: "Charlie", profilePic: "https://via.placeholder.com/150" },
  ]);

  const [activity, setActivity] = useState([
    { id: 1, type: "post", content: "🚀 Excited to start a new project on React!" },
    { id: 2, type: "post", content: "Shared a new blog on JavaScript ES6 features!" },
  ]);

  const [progress, setProgress] = useState([
    { id: 1, type: "progress", content: "📈 Completed 70% of Advanced Java Course!" },
    { id: 2, type: "progress", content: "🎯 Earned React Certification from Coursera!" },
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleEditProfile = () => {
    setShowModal(true);
  };

  const handleSaveProfile = (updatedUser) => {
    setUser(updatedUser);
    setShowModal(false);
  };

  const handleConnect = (id, name) => {
    setUser((prev) => ({
      ...prev,
      followers: prev.followers + 1, // Increase followers
      connections: [...prev.connections, { id, name }],
    }));
    setSuggestedUsers(suggestedUsers.filter((user) => user.id !== id));
  };

  return (
    <div className="profile-container">
      {/* Left Sidebar - Profile Section */}
      <div className="left-section">
        <div className="profile-card">
          <img className="profile-picture" src={user.profilePicture} alt="Profile" />
          <h2>{user.name}</h2>
          <p className="bio">{user.bio}</p>
          <p>🎭 {user.role}</p>
          {user.company && <p>🏢 {user.company}</p>}
          {user.university && <p>🎓 {user.university}</p>}
          <p>🛠️ Skills: {user.skills.join(", ")}</p>
          <p>🤝 Followers: {user.followers}</p> {/* Display followers count */}
          <button className="edit-btn" onClick={handleEditProfile}>✏️ Edit Profile</button>
        </div>
      </div>

      {/* Middle Section - Activity & Progress */}
      <div className="middle-section">
        {/* Activity Feed */}
        <div className="activity-feed">
          <h3>📊 Activity Feed</h3>
          {activity.map((item) => (
            <div key={item.id} className="activity-post">
              <p>{item.content}</p>
            </div>
          ))}
        </div>

        {/* Progress Feed */}
        <div className="progress-feed">
          <h3>📈 Progress Feed</h3>
          {progress.map((item) => (
            <div key={item.id} className="progress-post">
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - My Network */}
      <div className="right-section">
        <div className="network-sidebar">
          <h3>🔗 My Network</h3>
          {suggestedUsers.length === 0 ? (
            <p>No new connections available</p>
          ) : (
            <ul>
              {suggestedUsers.map((user) => (
                <li key={user.id} className="network-user">
                  <img className="network-profile-pic" src={user.profilePic} alt="Profile" />
                  <span>{user.name}</span>
                  <button className="connect-btn" onClick={() => handleConnect(user.id, user.name)}>
                    Connect
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* My Connections */}
        <div className="connections-section">
          <h3>👥 My Connections</h3>
          <ul>
            {user.connections.length === 0 ? (
              <p>No connections yet.</p>
            ) : (
              user.connections.map((conn) => (
                <li key={conn.id}>
                  <span>{conn.name}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showModal && <Editprofile user={user} onClose={() => setShowModal(false)} onSave={handleSaveProfile} />}
    </div>
  );
};

export default Profile;
