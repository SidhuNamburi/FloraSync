import React from 'react';
import './Loginnav.css';
import {Link} from 'react-router-dom';
const Loginnav = () => {
  return (
    <header>
      <div className="navbar-container">
        {/* Logo on far left */}
        <div className="logo">
          <span className="logo-text">Flora Sync</span>
        </div>

        {/* Main navigation links */}
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/plant-library">Plant Library</Link></li>
          </ul>
        </nav>

        {/* Right section with auth and search */}
        <div className="right-section">
          <div className="auth-links">
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/signup" className="auth-link">Sign Up</Link>
          </div>
          
          <div className="search-container">
            <input type="text" placeholder="Search plants..." />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Loginnav;