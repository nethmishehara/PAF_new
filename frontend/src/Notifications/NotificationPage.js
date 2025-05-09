import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NotificationPage.css";

const NotificationPage = () => {
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = "user123"; // Replace with actual logged-in user ID

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);

        const sentRes = await axios.get(`http://localhost:8080/api/notifications/sent/${userId}`);
        const receivedRes = await axios.get(`http://localhost:8080/api/notifications/received/${userId}`);

        setSent(Array.isArray(sentRes.data) ? sentRes.data : []);
        setReceived(Array.isArray(receivedRes.data) ? receivedRes.data : []);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to fetch notifications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  if (loading) return <div className="loading">Loading notifications...</div>;
  if (error) return <div className="error">{error}</div>;

  const buildNotificationMessage = (notif) => {
    const actor = notif.actorUserId || "Someone";
    switch (notif.type) {
      case "COMMENT":
        return `${actor} commented on your post.`;
      case "LIKE_POST":
        return `${actor} liked your post.`;
      case "LIKE_COMMENT":
        return `${actor} liked your comment.`;
      default:
        return notif.message || "You have a new notification.";
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  const NotificationSection = ({ title, data }) => (
    <div className="notification-section">
      <h3>{title}</h3>
      {data.length === 0 ? (
        <p className="empty">No notifications</p>
      ) : (
        <ul className="notification-list">
          {data.map((notif) => (
            <li key={notif.id || `${notif.actorUserId}-${notif.timestamp}`} className="notification-item">
              <div className="notification-message">🔔 {buildNotificationMessage(notif)}</div>
              <div className="notification-time">
                {notif.timestamp ? formatDate(notif.timestamp) : "Time not available"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="notification-container">
      <h2 className="page-title">🔔 Notifications</h2>
      <div className="notification-grid">
        <NotificationSection title="📤 Sent Notifications" data={sent} />
        <NotificationSection title="📥 Received Notifications" data={received} />
      </div>
    </div>
  );
};

export default NotificationPage;
