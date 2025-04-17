import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import "../styles/Navbar.css"; // Import CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">LearnSphere</Link>
      </div>
      <div className="nav-right">
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/learning">Learning</Link></li>
          <li><Link to="/plans">Plans</Link></li>
        </ul>
        <Link to="/profile" className="profile-icon">
          <User size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
