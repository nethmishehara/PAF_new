import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../styles/styles.css"; // Ensure updated class names are reflected in your CSS

const RightSection = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState({
    "Data Science": 5,
    "Web Development": 3,
    "UI/UX Design": 2,
  });

  const handleVote = () => {
    if (selectedOption) {
      setVotes({ ...votes, [selectedOption]: votes[selectedOption] + 1 });
      setVoted(true);
    }
  };

  const data = Object.keys(votes).map((key) => ({ name: key, votes: votes[key] }));

  return (
    <div className="DASR-right-section">
      {/* Quick Tips Section */}
      <div className="DASR-quick-tips">
        <h3>Quick Tips</h3>
        <ul>
          <li>💡 "Stay consistent with learning. A little every day helps!"</li>
          <li>💡 "Join communities for motivation and networking."</li>
          <li>💡 "Work on real projects to apply your knowledge."</li>
        </ul>
      </div>

      {/* Poll & Feedback Section */}
      <div className="DASR-poll-section">
        <h3>📊 Poll of the Week</h3>
        <p>What skill are you most interested in learning?</p>
        <div className="DASR-poll-options">
          {Object.keys(votes).map((option) => (
            <label key={option} className="DASR-poll-label">
              <input
                type="radio"
                name="poll"
                value={option}
                onChange={() => setSelectedOption(option)}
                disabled={voted}
              />
              {option}
            </label>
          ))}
        </div>
        <button className="DASR-vote-button" onClick={handleVote} disabled={voted}>
          {voted ? "Thank You for Voting!" : "Vote"}
        </button>

        {/* Display Bar Chart after voting */}
        {voted && (
          <div className="DASR-poll-results">
            <h4>📈 Poll Results</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip />
                <Bar dataKey="votes" fill="#4CAF50" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSection;
