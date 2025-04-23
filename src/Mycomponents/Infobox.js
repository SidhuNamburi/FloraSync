import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Infobox.css';

const Infobox = () => {
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
    <div className="state-container">
      <div className="loading-state">
        <div className="spinner">🌿</div>
        <h2>Loading Your Plant Collection</h2>
      </div>
    </div>
  );

  if (error) return (
    <div className="state-container">
      <div className="error-state">
        <div className="error-icon">⚠️</div>
        <h2>Something Went Wrong</h2>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="plants-container">
      {plants.length > 0 ? (
        <div className="plants-grid">
          {plants.map((plant) => (
            <div className="plant-card" key={plant._id}>
              <div className="card-header">
                <h3 className="plant-name">{plant.name}</h3>
                <p className="plant-species">{plant.species}</p>
              </div>
              
              <div className="image-container">
                <img 
                  src={plant.imageUrl || '/default-plant.jpg'} 
                  alt={plant.name} 
                  className="plant-image"
                />
              </div>
              
              <div className="plant-description">
                <p>{plant.description || "No description available"}</p>
              </div>
              
              <div className="care-details">
                <div className="care-row">
                  <div className="care-item light">
                    <span className="care-icon">☀️</span>
                    <div>
                      <h4>Light</h4>
                      <p>{plant.light || "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="care-item water">
                    <span className="care-icon">💧</span>
                    <div>
                      <h4>Water</h4>
                      <p>{plant.water || "Not specified"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="care-row">
                  <div className="care-item temp">
                    <span className="care-icon">🌡️</span>
                    <div>
                      <h4>Temp</h4>
                      <p>{plant.temp || "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="care-item humidity">
                    <span className="care-icon">💦</span>
                    <div>
                      <h4>Humidity</h4>
                      <p>{plant.humidity || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="state-container">
          <div className="empty-state">
            <div className="empty-icon">🌱</div>
            <h2>Your Garden Awaits</h2>
            <p>No plants found. Add your first plant to begin!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Infobox;