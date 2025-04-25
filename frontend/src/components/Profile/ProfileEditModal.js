import React, { useState } from 'react';
import { updateUser } from '../../services/api';
import './ProfileEditModal.css';

function ProfileEditModal({ user, onClose, setUser }) {
  const [bio, setBio] = useState(user.bio);
  const [skills, setSkills] = useState(user.skills.join(', '));
  const [skillsToImprove, setSkillsToImprove] = useState(user.skillsToImprove?.join(', ') || '');

  const handleSave = () => {
    const updated = {
      ...user,
      bio,
      skills: skills.split(',').map(s => s.trim()),
      skillsToImprove: skillsToImprove.split(',').map(s => s.trim())
    };

    updateUser(user.id, updated).then((res) => {
      setUser(res.data);
      onClose();
    });
  };

  return (
    <div className="modal">
      <div className="modal-container">
        <h2>Edit Profile</h2>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
        <textarea value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills (comma separated)" />
        <textarea value={skillsToImprove} onChange={(e) => setSkillsToImprove(e.target.value)} placeholder="Skills to Improve (comma separated)" />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default ProfileEditModal;
