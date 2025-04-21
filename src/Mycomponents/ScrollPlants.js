import React, { useRef } from 'react';
import './ScrollPlants.css';

const plantImages = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Plant ${i + 1}`,
}));

const ScrollPlants = () => {
  const galleryRef = useRef();

  const scroll = (direction) => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const itemWidth = gallery.children[0].offsetWidth + 16; // width + gap
    gallery.scrollBy({
      left: direction === 'left' ? -itemWidth : itemWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section className="plant-gallery">
      <div className="section-title">
        <h2>Popular Houseplants</h2>
      </div>
      <div className="gallery-container">
        <div className="gallery-nav">
          <button onClick={() => scroll('left')}>&#8592;</button>
          <button onClick={() => scroll('right')}>&#8594;</button>
        </div>
        <div className="gallery" ref={galleryRef}>
          {plantImages.map((plant) => (
            <div key={plant.id} className="gallery-item">
              <div className="image-placeholder" aria-label={plant.name}></div>
              <div className="overlay">{plant.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollPlants;