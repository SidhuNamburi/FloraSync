import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <header>
      <div className="logo">Flora Sync</div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">Plants</a></li>
          <li><a href="/">Weather</a></li>
          <li><a href="/">Projects</a></li>
          <li><a href="/">Help</a></li>
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