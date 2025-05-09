import React, { useEffect, useState } from 'react';
import './Profile.css';
import CourseRecommendation from './CourseRecommendation';
import PostList from './PostList';
import FollowButton from './FollowButton';
import EditProfileModal from './EditProfileModal';

const Profile = ({ userId: propUserId }) => {
  const fallbackUserId = 'user123'; // fallback if userId is undefined
  const userId = propUserId || fallbackUserId;

  const [user, setUser] = useState({
    name: '',
    bio: '',
    profilePicture: '',
    skills: [],
    skillsToImprove: [],
    followers: [],
    following: [],
  });
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [error, setError] = useState(null); // To store error messages

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null); // Reset error state on new fetch

      try {
        const res = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (!res.ok) throw new Error('User not found');
        const data = await res.json();
        setUser({
          name: data.name || '',
          bio: data.bio || '',
          profilePicture: data.profilePicture || '',
          skills: Array.isArray(data.skills) ? data.skills : [],
          skillsToImprove: Array.isArray(data.skillsToImprove) ? data.skillsToImprove : [],
          followers: Array.isArray(data.followers) ? data.followers : [],
          following: Array.isArray(data.following) ? data.following : [],
        });
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditSave = async (updatedUser) => {
    try {
      const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (res.ok) {
        setShowEdit(false);
        // Update the local user state with the updated data if needed
        setUser(updatedUser);
      } else {
        console.error('Failed to update user');
        setError('Failed to save changes. Please try again.');
      }
    } catch (err) {
      console.error('Failed to update user:', err);
      setError('Failed to save changes. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar-container">
          <img
            src={user.profilePicture || 'https://www.w3schools.com/howto/img_avatar.png'}
            alt="Avatar"
            className="profile-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://www.w3schools.com/howto/img_avatar.png';
            }}
          />
        </div>

        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <div className="skills-info">
            <p><strong>Skills:</strong> {user.skills.join(', ')}</p>
            <p><strong>Skills to Improve:</strong> {user.skillsToImprove.join(', ')}</p>
          </div>
          <div className="profile-actions">
            <FollowButton profileUserId={userId} />
            <button className="edit-btn" onClick={() => setShowEdit(true)}>Edit Profile</button>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>} {/* Display error if any */}

      <h3>Skill Sharing Posts</h3>
      <PostList userId={userId} />

      <h3> Learning Recommendations</h3>
      <CourseRecommendation skillsToImprove={user.skillsToImprove} />

      {showEdit && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEdit(false)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default Profile;
