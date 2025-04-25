import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/api';
import './ConnectionList.css';

function ConnectionsList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="connections-list">
      <h3 className="section-title">Connections</h3>
      {users.length === 0 ? (
        <p className="no-users">No connections found.</p>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                alt={user.name}
                className="avatar"
              />
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ConnectionsList;
