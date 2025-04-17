import React, { useState } from "react";
import "../styles/styles.css"; // Make sure class names are updated in CSS too

const LeftSection = () => {
  const [trendingSkills, setTrendingSkills] = useState([
    "Machine Learning",
    "Cloud Computing",
    "UI/UX Design",
    "Data Science",
    "Cybersecurity"
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  // Dynamic Trending Skills
  const handleTrendingClick = (skill) => {
    alert(`You clicked on ${skill}. Explore more about it!`);
  };

  // Function to handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="DASL-learning-exploration">
      <div className="DASL-left-section">
        <h2>Learning & Exploration</h2>

        {/* Learning Roadmaps */}
        <section>
          <h3>📝 Learning Roadmaps</h3>
          <ul>
            <li>How to become a Data Analyst in 6 months</li>
            <li>Step-by-Step Guide to Learn Web Development</li>
            <li>From Beginner to Expert in UI/UX Design</li>
          </ul>
        </section>

        {/* Recommended Learning Resources */}
        <section>
          <h3>📚 Recommended Learning Resources</h3>
          <ul>
            <li><a href="https://www.coursera.org">Coursera - Data Science Courses</a></li>
            <li><a href="https://www.udemy.com">Udemy - Full Stack Web Development</a></li>
            <li><a href="https://github.com">GitHub - Open Source Projects</a></li>
            <li><a href="https://www.medium.com">Medium - Blog Articles</a></li>
          </ul>
        </section>

        {/* Skill Categories */}
        <section>
          <h3>💡 Skill Categories</h3>
          <div className="DASL-skill-categories">
            <button onClick={() => handleCategoryClick("UI/UX Design")}>🎨 UI/UX Design</button>
            <button onClick={() => handleCategoryClick("Software Development")}>🖥️ Software Development</button>
            <button onClick={() => handleCategoryClick("Data Science")}>📊 Data Science</button>
            <button onClick={() => handleCategoryClick("Digital Marketing")}>📢 Digital Marketing</button>
            <button onClick={() => handleCategoryClick("Music & Art")}>🎶 Music & Art</button>
          </div>
          {selectedCategory && <p>Exploring: {selectedCategory}</p>}
        </section>

        {/* Trending Skills */}
        <section>
          <h3>🔥 Trending Skills</h3>
          <ul>
            {trendingSkills.map((skill, index) => (
              <li key={index} onClick={() => handleTrendingClick(skill)}>
                {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Language Learning Hub */}
        <section>
          <h3>🌎 Language Learning Hub</h3>
          <p>Explore languages, find partners to practice with, and improve your skills!</p>
        </section>

        {/* Challenge of the Week */}
        <section>
          <h3>🚀 Challenge of the Week</h3>
          <button className="DASL-challenge-button" onClick={() => alert("Get ready for this week's coding challenge!")}>Start Challenge</button>
        </section>
      </div>
    </div>
  );
};

export default LeftSection;
