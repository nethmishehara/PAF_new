import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../../services/api';

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications(userId).then((res) => setNotifications(res.data));
  }, [userId]);

  return (
    <div className="notification-list">
      <h3>Notifications</h3>
      <ul>
        {notifications.map((n) => (
          <li key={n.id}>
            {n.type === 'LIKE' ? 'Someone liked your post' : 'Someone commented on your post'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
