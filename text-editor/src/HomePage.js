import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Optional: Add your homepage styles here

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Choose a Design</h1>
      <div className="design-options">
        <Link to="/basic">
          <button className="btn">React + CSS</button>
        </Link>
        <Link to="/better">
          <button className="btn">Chakra UI</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;