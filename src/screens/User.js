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
    { to: '/', label: 'Projects' }
  ];

  return (
    <>
      <Navbar customLinks={customLinks} showSearch={false} />
      <ScrollPlants/>
      < Infobox/>
      <Footer />
    </>
  );
};

export default User;
