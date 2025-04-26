import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ customLinks, showSearch = true }) => {
  const defaultLinks = [
    { to: '/User', label: 'Home' },
    { to: '/allplants', label: 'Plants' },
    { to: '/location', label: 'Weather' },
    { to: '/', label: 'Help' }
  ];

  const linksToRender = customLinks || defaultLinks;

  return (
    <header>
      <div className="logo">Flora Sync</div>
      <nav>
        <ul>
          {linksToRender.map((link, index) => (
            <li key={index}><Link to={link.to}>{link.label}</Link></li>
          ))}
        </ul>
      </nav>
      {showSearch && (
        <div className="search-container">
          <input type="text" placeholder="Search plants..." />
          <i className="fas fa-search"></i>
        </div>
      )}
    </header>
  );
};

export default Navbar;
