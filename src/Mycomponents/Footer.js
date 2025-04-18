import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-column">
          <h3>Flora Sync</h3>
          <p>
            Your digital companion for plant care and management. Helping plant
            lovers since 2025.
          </p>
          <div className="social-icons">
            <a href="/" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="/" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="/" aria-label="Pinterest"><i className="fab fa-pinterest"></i></a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Plant Library</a></li>
            <li><a href="/">Care Guides</a></li>
            <li><a href="/">My Plants</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            <li><a href="/">FAQ</a></li>
            <li><a href="/">Contact Us</a></li>
            <li><a href="/">Privacy Policy</a></li>
            <li><a href="/">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2025 Flora Sync. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;