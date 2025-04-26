// src/Mycomponents/ContainerPlants.js

import React from 'react';
import './ContainerPlants.css';

const ContainerPlants = ({
  name,
  species,
  description,
  light,
  water,
  temperature,
  humidity,
  image,
}) => {
  return (
    <div className="plant-card">
      <div className="image-container">
        <img src={image} alt={name} className="plant-img" />
        <div className="species-badge">{species}</div>
      </div>

      <div className="plant-content">
        <h3 className="plant-name">{name}</h3>
        <p className="plant-desc">{description}</p>

        <div className="care-details">
          <div className="detail-item">
            <span className="detail-icon">☀️</span>
            <div>
              <p className="detail-label">Light</p>
              <p className="detail-value">{light}</p>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-icon">💧</span>
            <div>
              <p className="detail-label">Water</p>
              <p className="detail-value">{water}</p>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-icon">🌡️</span>
            <div>
              <p className="detail-label">Temperature</p>
              <p className="detail-value">{temperature}</p>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-icon">💦</span>
            <div>
              <p className="detail-label">Humidity</p>
              <p className="detail-value">{humidity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerPlants;
