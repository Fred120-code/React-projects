import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="nav-logo">Kyler</h2>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link">
              Testimonials
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link">
              Sign-up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
