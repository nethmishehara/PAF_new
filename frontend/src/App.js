// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';

// Pages
import PostList from './components/Posts/PostList';
import NotificationList from './components/Posts/NotificationList';
import Profile from './components/Profile/Profile';

function App() {
  const userId = 'user123'; // You can replace this with dynamic auth later

  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav className="navbar">
          <Link to="/">Social Feed</Link>
          <Link to="/notifications">Notifications</Link>
          <Link to={`/profile/${userId}`}>Profile</Link> {/* ✅ Update profile link */}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<PostList userId={userId} />} />
          <Route path="/notifications" element={<NotificationList userId={userId} />} />
          <Route path="/profile/:userId" element={<Profile />} /> {/* ✅ Add :userId param */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
