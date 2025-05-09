import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Bell, User } from "lucide-react";
import "../styles/Navbar.css"; // Your existing CSS file

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const currentUserId = "user123"; // 🔁 Replace with actual logged-in user ID

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/notifications/user/${currentUserId}`
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [currentUserId]);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">LearnSphere</Link>
      </div>
      <div className="nav-right">
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/learning">Learning</Link></li>
          <li><Link to="/plans">Plans</Link></li>
        </ul>

        {/* ✅ Notification Bell with Badge */}
        <div className="notification-icon">
          <Link to="/notifications">
            <Bell size={24} />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </Link>
        </div>

        {/* Profile Icon */}
        <Link to="/profile" className="profile-icon">
          <User size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
