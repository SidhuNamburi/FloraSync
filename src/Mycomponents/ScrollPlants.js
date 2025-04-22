import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './ScrollPlants.css';

const ScrollPlants = () => {
  const galleryRef = useRef();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication required');
        }
        const res = await axios.get('http://localhost:5000/api/user/plants', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setPlants(res.data.plants || []);
      } catch (error) {
        console.error('Error fetching plants:', error);
        setError(error.response?.data?.message || error.message || 'Failed to fetch plants');
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const scroll = (direction) => {
    const gallery = galleryRef.current;
    if (!gallery || !gallery.children[0]) return;

    const itemWidth = gallery.children[0].getBoundingClientRect().width + 16; // including gap
    gallery.scrollBy({
      left: direction === 'left' ? -itemWidth : itemWidth,
      behavior: 'smooth',
    });
  };

  if (loading) return <div className="loading">Loading popular plants...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <section className="plant-gallery">
      <div className="section-title">
        <h2>Popular Houseplants</h2>
      </div>
      <div className="gallery-container">
        <div className="gallery-nav">
          <button onClick={() => scroll('left')} aria-label="Scroll left">&#8592;</button>
          <button onClick={() => scroll('right')} aria-label="Scroll right">&#8594;</button>
        </div>
        <div className="gallery" ref={galleryRef}>
          {plants.length > 0 ? (
            plants.map((plant) => (
              <div key={plant._id} className="gallery-item">
                <div
                  className="image-placeholder"
                  style={{ backgroundImage: `url(${plant.imageUrl || '/default-plant.jpg'})` }}
                  aria-label={plant.name}
                ></div>
                <div className="overlay">{plant.name}</div>
              </div>
            ))
          ) : (
            <p className="no-plants">No plants to display</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScrollPlants;
