import React, { useState } from "react";
import "../styles/styles.css";

const LeftSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showChallenge, setShowChallenge] = useState(false);
  const [showLanguageHub, setShowLanguageHub] = useState(false);

  const trendingSkills = [
    {
      name: "Machine Learning",
      description: "Master supervised & unsupervised learning, Python, scikit-learn, and TensorFlow."
    },
    {
      name: "Cloud Computing",
      description: "Learn AWS, Azure, and Google Cloud for scalable backend services and DevOps."
    },
    {
      name: "UI/UX Design",
      description: "Explore Figma, wireframing, design thinking, and usability testing techniques."
    },
    {
      name: "Data Science",
      description: "Hands-on with Python, Pandas, Data Visualization, SQL, and predictive modeling."
    },
    {
      name: "Cybersecurity",
      description: "Understand ethical hacking, network security, encryption, and threat analysis."
    }
  ];

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

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
            <li><a href="https://datacamp.com/blog/how-to-become-a-data-analyst" target="_blank" rel="noopener noreferrer">How to become a Data Analyst in 6 months</a></li>
            <li><a href="https://www.freecodecamp.org/news/learn-web-development-in-2024/" target="_blank" rel="noopener noreferrer">Step-by-Step Guide to Learn Web Development</a></li>
            <li><a href="https://bootcamp.uxdesign.cc/a-complete-beginner-to-expert-ui-ux-design-roadmap-in-2024-3b56c4c361e" target="_blank" rel="noopener noreferrer">From Beginner to Expert in UI/UX Design</a></li>
          </ul>
        </section>

        {/* Recommended Resources */}
        <section>
          <h3>📚 Recommended Learning Resources</h3>
          <ul>
            <li><a href="https://www.coursera.org" target="_blank" rel="noopener noreferrer">Coursera - Data Science Courses</a></li>
            <li><a href="https://www.udemy.com" target="_blank" rel="noopener noreferrer">Udemy - Full Stack Web Development</a></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub - Open Source Projects</a></li>
            <li><a href="https://www.medium.com" target="_blank" rel="noopener noreferrer">Medium - Blog Articles</a></li>
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
        {/* Trending Skills */}
<section>
  <h3>🔥 Trending Skills</h3>
  <ul className="DASL-skill-list">
    {trendingSkills.map((skill, index) => (
      <li key={index}>
        <button 
          onClick={() => handleSkillClick(skill)} 
          className="DASL-skill-button"
        >
          {skill.name}
        </button>
      </li>
    ))}
  </ul>
  {selectedSkill && (
    <div className="DASL-skill-details">
      <h4>{selectedSkill.name}</h4>
      <p>{selectedSkill.description}</p>
      <ul className="DASL-related-links">
        <li><a href={selectedSkill.url} target="_blank" rel="noopener noreferrer">Learn More on {selectedSkill.name}</a></li>
        <li><a href="https://www.udemy.com/courses/search/?q=related" target="_blank" rel="noopener noreferrer">Explore on Udemy</a></li>
        <li><a href="https://www.linkedin.com/learning/" target="_blank" rel="noopener noreferrer">LinkedIn Learning</a></li>
      </ul>
    </div>
  )}
</section>


        {/* Language Learning Hub */}
        <section>
          <h3 onClick={() => setShowLanguageHub(!showLanguageHub)} style={{ cursor: "pointer" }}>🌎 Language Learning Hub</h3>
          {showLanguageHub && (
            <div>
              <p>Practice and improve your language skills:</p>
              <ul>
                <li><a href="https://www.duolingo.com" target="_blank" rel="noopener noreferrer">Duolingo</a></li>
                <li><a href="https://www.tandem.net" target="_blank" rel="noopener noreferrer">Tandem - Language Exchange</a></li>
                <li><a href="https://www.memrise.com" target="_blank" rel="noopener noreferrer">Memrise</a></li>
              </ul>
            </div>
          )}
        </section>

        {/* Challenge of the Week */}
        <section>
          <h3>🚀 Challenge of the Week</h3>
          <button className="DASL-challenge-button" onClick={() => setShowChallenge(!showChallenge)}>
            {showChallenge ? "Hide Challenge" : "Start Challenge"}
          </button>
          {showChallenge && (
            <div className="DASL-challenge-card">
              <h4>🧠 Quiz: JavaScript Basics</h4>
              <p>What will the following code return?</p>
              <code>console.log(typeof null);</code>
              <ul>
                <li>A. "object"</li>
                <li>B. "null"</li>
                <li>C. "undefined"</li>
                <li>D. "error"</li>
              </ul>
              <p style={{ color: "#4caf50" }}>Correct Answer: A. "object"</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default LeftSection;
