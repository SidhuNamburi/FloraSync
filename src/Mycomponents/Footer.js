import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';
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
            <Link to="/" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></Link>
            <Link to="/" aria-label="Twitter"><i className="fab fa-twitter"></i></Link>
            <Link to="/" aria-label="Instagram"><i className="fab fa-instagram"></i></Link>
            <Link to="/" aria-label="Pinterest"><i className="fab fa-pinterest"></i></Link>
          </div>
        </div>
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Plant Library</Link></li>
            <li><Link to="/">Care Guides</Link></li>
            <li><Link to="/">My Plants</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            <li><Link to="/">FAQ</Link></li>
            <li><Link to="/">Contact Us</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms of Service</Link></li>
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