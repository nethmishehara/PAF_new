import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const Navigationbar = () => {
  // Inline CSS styles
  const navbarStyle = {
    background: "linear-gradient(45deg, #006D77, #83C5BE)", // Peacock color
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "white",
  };

  const navRightStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px", // Adds spacing between the menu and profile icon
  };

  const navMenuStyle = {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    marginRight: "10px", // Moves the menu slightly left for balance
  };

  const navLinkStyle = {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    fontWeight: "500",
    transition: "color 0.3s ease-in-out",
  };

  const navLinkHoverStyle = {
    color: "#FFDD40", // Gold hover effect
  };

  const profileIconStyle = {
    color: "white",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  };

  const profileIconSvgStyle = {
    transition: "transform 0.3s ease-in-out",
  };

  const profileIconHoverSvgStyle = {
    transform: "scale(1.1)",
  };

  return (
    <nav style={navbarStyle}>
      <div className="nav-left">
        <Link to="/" style={logoStyle}>LearnSphere</Link>
      </div>
      <div style={navRightStyle}>
        <ul style={navMenuStyle}>
          <li><Link to="/" style={navLinkStyle} onMouseEnter={(e) => e.target.style.color = navLinkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = ""}>Home</Link></li>
          <li><Link to="/learning" style={navLinkStyle} onMouseEnter={(e) => e.target.style.color = navLinkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = ""}>Learning</Link></li>
          <li><Link to="/plans" style={navLinkStyle} onMouseEnter={(e) => e.target.style.color = navLinkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = ""}>Plans</Link></li>
        </ul>
        <Link to="/profile" style={profileIconStyle}>
          <User size={24} style={profileIconSvgStyle} onMouseEnter={(e) => e.target.style.transform = profileIconHoverSvgStyle.transform} onMouseLeave={(e) => e.target.style.transform = ""}/>
        </Link>
      </div>
    </nav>
  );
};

export default Navigationbar;
