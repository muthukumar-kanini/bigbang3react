import React, { useEffect, useState } from 'react';
import './Style.css';

import CTA from './CTA';

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7120/api/AdminGallery')
      .then(response => response.json())
      .then(data => setGalleryImages(data))
      .catch(error => console.error('Error fetching gallery images:', error));
  }, []);

  return (
    <div>
      <section className="gallery" id="gallery">
        <div className="container">
          <p className="section-subtitle">Photo Gallery</p>
          <h2 className="h2 section-title">Photos From Travellers</h2>
          <p className="section-text">
          Explore the winding streets of beautifuk cities, where ancient architecture meets modern charm. Immerse yourself in the bustling markets, savoring the flavors of local cuisine and discovering unique handicrafts that reflect the region's artistic heritage.
          </p>
          <ul className="gallery-list">
            {galleryImages.map((image, index) => (
              <li className="gallery-item" key={index}>
                <figure className="gallery-image">
                  <img src={image.gallery_Image} alt={`Gallery image ${index + 1}`} />
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTA />
    </div>
  );
};

export default Gallery;
