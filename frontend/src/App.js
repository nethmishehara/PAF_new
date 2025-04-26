import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./SkillPostSharing/pages/Home.js";
import LearningPlansDashboard from "./learningplan/learningplan.js";

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/plans" element ={<LearningPlansDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
