// src/screens/PlantLibrary.js
import React, { useEffect, useState } from 'react';
import ContainerPlants from '../Mycomponents/ContainerPlants';
import './PlantLibrary.css';
import Loginnav from '../Mycomponents/Loginnav';
import Footer from '../Mycomponents/Footer';

const PlantLibrary = () => {
  const [allPlants, setAllPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPlants = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/plants');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        console.log('Fetched plants:', data); // Log the response to debug
        setAllPlants(data);
      } catch (error) {
        console.error('Failed to fetch plants:', error);
        setError('Failed to load plants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlants();
  }, []);

  return (
    <div>
      <Loginnav />
      <div className="plant-library-container">
        <h2 className="library-heading" align="center">🌿 All Plants Library</h2>
        {loading ? (
          <p className="loading-message">🌱 Loading plants...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="plants-grid">
            {allPlants.length === 0 ? (
              <p>No plants available</p>
            ) : (
              allPlants.map((plant, index) => (
                <ContainerPlants
                  key={plant.id || index} // Fallback to index if id is missing
                  name={plant.name}
                  species={plant.species}
                  description={plant.description}
                  light={plant.light}
                  water={plant.water}
                  temperature={plant.temp}
                  humidity={plant.humidity}
                  image={plant.imageUrl}
                />
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PlantLibrary;
