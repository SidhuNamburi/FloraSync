import React from 'react';
import './ContainerPlants.css';

const ContainerPlants = () => {
  return (
    <section className="plant-info">
      <div className="plant-image-placeholder" aria-label="Monstera image"></div>
      <div className="info-container">
        <h3>Monstera Deliciosa</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Monstera adds vibrant greenery and makes a bold statement in any indoor setting.
        </p>
        <div className="care-details">
          <div className="care-item">
            <i className="fas fa-sun"></i>
            <div>
              <strong>Light:</strong> Bright, indirect sunlight
            </div>
          </div>
          <div className="care-item">
            <i className="fas fa-tint"></i>
            <div>
              <strong>Water:</strong> Water when top inch of soil is dry
            </div>
          </div>
          <div className="care-item">
            <i className="fas fa-thermometer-half"></i>
            <div>
              <strong>Temperature:</strong> 18–27°C (65–80°F)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContainerPlants;