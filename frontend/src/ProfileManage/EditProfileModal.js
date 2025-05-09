import React, { useState } from 'react';
import './EditProfileModal.css';

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...user });
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const listFields = ['skills', 'skillsToImprove'];
    setFormData((prev) => ({
      ...prev,
      [name]: listFields.includes(name) ? value.split(',').map((s) => s.trim()) : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedData = { ...formData, profilePicture: profileImage };
    onSave(updatedData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} />

        <label>Bio</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange} />

        <label>Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {profileImage && <img src={profileImage} alt="Profile preview" className="profile-preview" />}

        <label>Skills</label>
        <input name="skills" value={formData.skills.join(', ')} onChange={handleChange} />

        <label>Skills to Improve</label>
        <input name="skillsToImprove" value={formData.skillsToImprove.join(', ')} onChange={handleChange} />

        <div className="modal-buttons">
          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
