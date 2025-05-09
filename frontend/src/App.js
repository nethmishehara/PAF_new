import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./SkillPostSharing/pages/Home.js";
import LearningPlansDashboard from "./learningplan/learningplan.js";
import CommentSection from "./Comment/CommentSection.js";
import NotificationPage from "./Notifications/NotificationPage.js";
import Navbar from "./SkillPostSharing/components/Navbar";
import Profile from "./ProfileManage/Profile.js";

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Render Navbar at the top */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<LearningPlansDashboard />} />
        <Route path="/comments" element={<CommentSection />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/profile" element={<Profile />} /> {/* Static route for profile */}
        {/* Dynamic profile route */}
        <Route path="/profile/:userId" element={<Profile />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
