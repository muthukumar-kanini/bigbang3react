import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

const AGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7120/api/AdminGallery')
      .then(response => response.json())
      .then(data => setGalleryImages(data))
      .catch(error => console.error('Error fetching gallery images:', error));
  }, []);

  const handleRemoveImage = (imageId) => {
  axios
    .delete(`https://localhost:7120/api/AdminGallery/${imageId}`)
    .then(response => {
      // If the request is successful, update the state to remove the image from the galleryImages array
      const updatedGalleryImages = galleryImages.filter(image => image.id !== imageId);
      setGalleryImages(updatedGalleryImages);
      console.log('Image deleted successfully!');
    })
    .catch(error => {
      if (error.response) {
        console.error('Error deleting image:', error.response.data);
      } else if (error.message) {
        console.error('Error deleting image:', error.message);
      } else {
        console.error('Error deleting image:', error);
      }
    });
};


  const handleMouseEnter = (index) => {
    setDeleteIndex(index);
  };

  const handleMouseLeave = () => {
    setDeleteIndex(null);
  };

  return (
    <div>
      <section className="gallery" id="gallery">
        <div className="container">
          <p className="section-subtitle">Photo Gallery</p>
          <h2 className="h2 section-title">Post your Photos</h2>
          <p className="section-text">
           
          </p>
          <ul className="gallery-list">
            {galleryImages.map((image, index) => (
              <li
                className="gallery-item"
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}
              >
                <figure className="gallery-image">
                  <img
                    src={image.gallery_Image}
                    alt={`Gallery image ${index + 1}`}
                    style={{  objectFit: 'cover', borderRadius: '8px' }}
                  />
                  {deleteIndex === index && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.6)',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        className="remove-button"
                        onClick={() => handleRemoveImage(image.image_Id)}
                        style={{
                          color: 'white',
                          padding: '10px 20px',
                          background: 'red',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Remove
                      </div>
                    </div>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div></div>
    </div>
  );
};

export default AGallery;
