import React from 'react';
import './about.css';
import {Link} from 'react-router-dom';
const About = () => {
  const features = [
    {
      icon: 'fas fa-leaf',
      title: "Plant Health Monitoring",
      description: "Real-time tracking of your plant's vital signs"
    },
    {
      icon: 'fas fa-tint',
      title: "Smart Watering",
      description: "AI-powered watering recommendations"
    },
    {
      icon: 'fas fa-sun',
      title: "Light Management",
      description: "Personalized light exposure guidance"
    },
    {
      icon: 'fas fa-chart-line',
      title: "Data Analytics",
      description: "Comprehensive health trend insights"
    },
    {
      icon: 'fas fa-mobile-alt',
      title: "Multi-Device Sync",
      description: "Access your plant data anywhere"
    },
    {
      icon: 'fas fa-recycle',
      title: "Eco-Friendly",
      description: "Reduce resource waste"
    }
  ];

  const teamMembers = [
    {
      name: "Veeraneni Rithik rao",
      role: "",
      bio: "",
      avatar: "fas fa-laptop-code"
    },
    {
      name: "Sidhu Namburi",
      role: "",
      bio: "",
      avatar: "fas fa-laptop-code"
    },
    {
      name: "Akshath",
      role: "",
      bio: "",
      avatar: "fas fa-laptop-code"
    },
    {
      name: "Adhi",
      role: "",
      bio: "",
      avatar: "fas fa-laptop-code"
    }
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Flora Sync</h1>
        <p className="hero-subtitle">Revolutionizing plant care through AI-powered monitoring</p>
      </section>

      <div className="divider-line"></div>

      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>At Flora Sync, we believe every plant deserves optimal care, whether you're a seasoned botanist or a first-time plant owner.</p>
          <p>Our mission is to bridge the gap between technology and nature, creating a harmonious environment where plants thrive with minimal effort and maximum efficiency.</p>
        </div>
        <div className="mission-visual">
          <i className="fas fa-leaf mission-icon"></i>
        </div>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <p className="features-subtitle">Everything you need for thriving plants</p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon-wrapper">
                <i className={`${feature.icon} feature-icon`}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-line"></div>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <p className="team-subtitle">The passionate people behind Flora Sync</p>
        
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="team-avatar">
                <i className={`${member.avatar} team-icon`}></i>
              </div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-bio">{member.bio}</p>
              <div className="team-social">
                <Link to="/"><i className="fab fa-linkedin"></i></Link>
                <Link to="/"><i className="fab fa-twitter"></i></Link>
                <Link to="/"><i className="fas fa-envelope"></i></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-line"></div>

      <section className="cta-section">
        <h2>Join the Green Revolution</h2>
        <p>Flora Sync is more than just an app - it's a movement towards smarter, more sustainable plant care.</p>
      </section>
    </div>
  );
};

export default About;