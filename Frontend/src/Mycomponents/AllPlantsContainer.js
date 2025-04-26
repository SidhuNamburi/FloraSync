// frontend/AllPlantsContainer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllPlantsContainer.css';

const AllPlantsContainer = () => {
  const [allPlants, setAllPlants] = useState([]);
  const [addedPlants, setAddedPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const [allRes, userRes] = await Promise.all([
          axios.get('http://localhost:5000/api/plants', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/user/plants', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        console.log("All Plants Response:", allRes.data); // Check structure of all plants
        console.log("User Plants Response:", userRes.data); // Check structure of user plants

        const all = Array.isArray(allRes.data) ? allRes.data : [];
        const added = userRes.data.plants ? userRes.data.plants.map((plant) => plant._id.toString()) : [];

        setAllPlants(all);
        setAddedPlants(added);
      } catch (err) {
        console.error("Error details:", err);
        setError(err.response?.data?.message || 'Failed to load plants');
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, [token]);

  // Ensure the plants that have not been added yet are correctly filtered
  const notAddedPlants = allPlants.filter((plant) => {
    return plant && plant.id && !addedPlants.includes(plant.id.toString());
  });

  if (loading) return <div className="loading">Loading available plants...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="all-plants-container">
      <h2>Plants You Haven’t Added Yet</h2>
      {message && <div className="message">{message}</div>}

      <div className="plants-grid">
        {notAddedPlants.length === 0 ? (
          <div className="message">🎉 You have added all available plants!</div>
        ) : (
          notAddedPlants.map((plant) => (
            <div className="plant-card" key={plant.id}>
              <div
                className="plant-image"
                style={{ backgroundImage: `url(${plant.imageUrl})` }}
              ></div>
              <div className="info">
                <h3>{plant.name}</h3>
                <p className="species"><i>{plant.species}</i></p>
                <p>{plant.description}</p>
                <button
                  onClick={() => handleAddPlant(plant.id)}
                >
                  Add Plant
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  async function handleAddPlant(plantId) {
    try {
      await axios.post(
        'http://localhost:5000/api/user/add-plant',
        { plantId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('✅ Plant added successfully!');
      setAddedPlants((prev) => [...prev, plantId.toString()]); // Ensure plantId is a string
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add plant');
      setTimeout(() => setError(''), 4000);
    }
  }
};

export default AllPlantsContainer;
