import React from "react";
import Footer from "../Mycomponents/Footer";
import Navbar from "../Mycomponents/Navbar";
import ScrollPlants from "../Mycomponents/ScrollPlants";
import ContainerPlants from "../Mycomponents/ContainerPlants";
import "./User.css";

const User = () => {
    return (
      <>
        <Navbar />
        <ScrollPlants />
        <ContainerPlants />
        <Footer />
      </>
    );
  };
  
export default User;