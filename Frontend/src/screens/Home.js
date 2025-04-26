import React from "react";
import Footer from "../Mycomponents/Footer";
import Loginnav from "../Mycomponents/Loginnav";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  // Plant connection quotes
  const plantQuotes = [
    {
      text: "Plants are the earth's endless effort to speak to the listening heavens.",
      author: "Rabindranath Tagore",
      bgColor: "#e8f5e9",
    },
    {
      text: "When you grow plants, you grow with them. Their roots become your roots, their leaves your shelter.",
      author: "Anonymous",
      bgColor: "#f1f8e9",
    },
    {
      text: "A garden is a friend you can visit anytime. It listens without judgment and heals without words.",
      author: "Lao Tzu",
      bgColor: "#e8f5e9",
    },
  ];

  // Plant benefits
  const plantBenefits = [
    {
      icon: "🌿",
      title: "Natural Stress Relievers",
      description:
        "Studies show that just being around plants can lower blood pressure and reduce stress hormones",
    },
    {
      icon: "💨",
      title: "Air Purifiers",
      description:
        "Plants naturally filter toxins from the air, creating a healthier living environment",
    },
    {
      icon: "🧠",
      title: "Mental Health Boosters",
      description:
        "Caring for plants provides purpose and satisfaction, combating anxiety and depression",
    },
  ];

  return (
    <>
      <Loginnav />
      <main className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Reconnect With Nature's Rhythm</h1>
            <p>
              Discover the profound bond between humans and plants through
              mindful cultivation
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="primary-button">
                Begin Your Journey
              </Link>
              <Link to="/about" className="secondary-button">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image"></div>
        </section>

        {/* Plant Benefits */}
        <section className="benefits-section">
          <h2>The Silent Wisdom of Plants</h2>
          <p className="section-subtitle">
            How our green companions enrich our lives beyond beauty
          </p>

          <div className="benefits-grid">
            {plantBenefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quotes Section */}
        <section className="quotes-section">
          <h2>Whispers from the Leaves</h2>
          <p className="section-subtitle">
            Words that capture our eternal bond with plants
          </p>

          <div className="quotes-grid">
            {plantQuotes.map((quote, index) => (
              <div
                key={index}
                className="quote-card"
                style={{ backgroundColor: quote.bgColor }}
              >
                <div className="quote-icon">❝</div>
                <p className="quote-text">{quote.text}</p>
                <p className="quote-author">— {quote.author}</p>
                <div className="leaf-decoration">🌱</div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to deepen your connection with nature?</h2>
            <p>
              Begin your plant journey today and discover the silent wisdom they
              offer
            </p>
            <div className="cta-buttons">
              <Link to="/signup" className="primary-button">
                Start Growing
              </Link>
              <Link to="/login" className="secondary-button">
                Continue Your Journey
              </Link>
            </div>
          </div>
          <div className="cta-decoration">
            <div className="plant-silhouette">🌿</div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
