import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../services/api';
import ProfileEditModal from './ProfileEditModal';
import RecommendedCourses from './RecommendedCourses';
import ConnectionsList from './ConnectionsList';
import UserPosts from './UserPosts';
import './Profile.css';

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then((res) => setUser(res.data))
        .catch((err) => console.error('Error fetching user:', err));
    }
  }, [userId]);

  if (!user) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="User Avatar" />
        <div>
          <h1>{user.name}</h1>
          <p className="bio">{user.bio || 'No bio provided.'}</p>
          <button className="edit-button" onClick={() => setShowModal(true)}>Edit Profile</button>
        </div>
      </div>

      <div className="profile-section">
        <h3>Skills</h3>
        <div className="tag-group">
          {user.skills.map((s, i) => <span key={i} className="tag">{s}</span>)}
        </div>
      </div>

      <div className="profile-section">
       
        <div className="tag-group">
          {user.skillsToImprove?.map((s, i) => <span key={i} className="tag tag-secondary">{s}</span>)}
        </div>
      </div>

      <RecommendedCourses skills={user.skillsToImprove || []} />
      <UserPosts userId={user.id} />
      <ConnectionsList userId={user.id} />

      {showModal && (
        <ProfileEditModal
          user={user}
          onClose={() => setShowModal(false)}
          setUser={setUser}
        />
      )}
    </div>
  );
}

export default Profile;
