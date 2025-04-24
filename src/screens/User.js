import React from "react";
import Footer from "../Mycomponents/Footer";
import Navbar from "../Mycomponents/Navbar";
import "./User.css";
import ScrollPlants from "../Mycomponents/ScrollPlants";
import Infobox from "../Mycomponents/Infobox";

const User = () => {
  const customLinks = [
    { to: '/', label: 'Home' },
    { to: '/allplants', label: 'Plants' },
    { to: '/', label: 'Weather' }
  ];

  return (
    <>
      <Navbar customLinks={customLinks} showSearch={false} />
      
      {/* Quote Heading Section */}
      <div className="quote-heading">
        <h1>"Grow through what you go through 🪴"</h1>
        <p>Let nature inspire your journey of growth.</p>
      </div>

      <ScrollPlants />
      <Infobox />
      <Footer />
    </>
  );
};

export default User;
