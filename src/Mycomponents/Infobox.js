import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContainerPlants.css';

const ContainerPlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication required');

        const response = await axios.get('http://localhost:5000/api/user/plants', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPlants(response.data.plants || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch plants');
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  if (loading) return (
    <div className="state-container loading">
      <div className="state-content">
        <div className="spinner">🌿</div>
        <h2>Loading Your Green Collection</h2>
        <p>Gathering plant data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="state-container error">
      <div className="state-content">
        <div className="error-icon">⚠️</div>
        <h2>We Hit a Snag</h2>
        <p>{error}</p>
        <button className="retry-button">Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="plants-container">
      <div className="plants-gallery">
        {plants.length > 0 ? (
          plants.map((plant) => (
            <div className="plant-card rectangular" key={plant._id}>
              <div className="plant-header">
                <h1 className="plant-name">{plant.name}</h1>
                <p className="plant-subtitle">{plant.species}</p>
              </div>
              
              {plant.imageUrl && (
                <div className="plant-image-container">
                  <img 
                    src={plant.imageUrl} 
                    alt={plant.name} 
                    className="plant-image"
                  />
                </div>
              )}
              
              <div className="plant-description">
                <p>{plant.description}</p>
              </div>
              
              <div className="care-guide">
                <div className="care-item sunlight">
                  <div className="care-icon">☀️</div>
                  <div className="care-details">
                    <h3 className="care-title">Light</h3>
                    <p className="care-detail">{plant.light}</p>
                  </div>
                </div>
                
                <div className="care-item water">
                  <div className="care-icon">💧</div>
                  <div className="care-details">
                    <h3 className="care-title">Water</h3>
                    <p className="care-detail">{plant.water}</p>
                  </div>
                </div>
                
                <div className="care-item temperature">
                  <div className="care-icon">🌡️</div>
                  <div className="care-details">
                    <h3 className="care-title">Temperature</h3>
                    <p className="care-detail">{plant.temp}</p>
                  </div>
                </div>
                
                <div className="care-item humidity">
                  <div className="care-icon">🌿</div>
                  <div className="care-details">
                    <h3 className="care-title">Humidity</h3>
                    <p className="care-detail">{plant.humidity}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="state-container empty">
            <div className="state-content rectangular">
              <div className="empty-icon">🌱</div>
              <h2>Your Garden Awaits</h2>
              <p>No plants found. Start by adding your first green companion!</p>
              <button className="action-button">Add First Plant</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContainerPlants;