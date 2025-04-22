import React from "react";
import Footer from "../Mycomponents/Footer";
import Navbar from "../Mycomponents/Navbar";
import AllPlantsContainer from "../Mycomponents/AllPlantsContainer";

const AllPlants = () => {
  return (
    <>
      <Navbar showSearch={true} />
      <AllPlantsContainer />
      <Footer />
    </>
  );
};

export default AllPlants;
