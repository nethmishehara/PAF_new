import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./SkillPostSharing/pages/Home.js";
import LearningPlansDashboard from "./learningplan/learningplan.js";
import Profile  from "./SkillPostSharing/pages/Profile.js";
import LoginButton from "./LoginButton.js";
function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/plans" element ={<LearningPlansDashboard/>} />
        <Route path="/profile" element ={<Profile/>} />
        <Route path="/Login" element ={<LoginButton/>} />
      </Routes>
    </Router>
  );
}

export default App;
