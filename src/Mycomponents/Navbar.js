import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <header>
      <div className="logo">Flora Sync</div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Plants</Link></li>
          <li><Link to="/">Weather</Link></li>
          <li><Link to="/">Projects</Link></li>
          <li><Link to="/">Help</Link></li>
        </ul>
      </nav>
      <div className="search-container">
        <input type="text" placeholder="Search plants..." />
        <i className="fas fa-search"></i>
      </div>
    </header>
  );
};

export default Navbar;