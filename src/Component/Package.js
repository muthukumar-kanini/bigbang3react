import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import './Style.css';
import package1 from './images/packege-1.jpg';
import Gallery from './Gallery';

const Package = () => {
  const [packages, setPackages] = useState([]);

  const convertToImageURL = (byteData) => {
    const binaryData = atob(byteData);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < binaryData.length; i++) {
      uintArray[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  };

  useEffect(() => {
    fetch('https://localhost:7234/api/TourPackages')
      .then(response => response.json())
      .then(data => setPackages(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleBookNowClick = (packageData) => {

    localStorage.setItem('location_image', packageData.location_Image)
    localStorage.setItem('package_name', packageData.tourPackage_Name)
    localStorage.setItem('package_speciality', packageData.location_Speciality)
    localStorage.setItem('package_price', packageData.tourPackage_PricePerDay)
    localStorage.setItem('package_id', packageData.tourPackage_Id)
    console.log('Selected Package Data:');
    console.log('Image:', packageData.location_Image);
    console.log('Name:', packageData.tourPackage_Name);
    console.log('Speciality:', packageData.location_Speciality);
    console.log('Price Per Day:', packageData.tourPackage_PricePerDay);
  };

  return (
    <div>
      <section className="package" id="package">
        <div className="container">
          <p className="section-subtitle">Popular Packages</p>
          <h2 className="h2 section-title">Checkout Our Packages</h2>
          <p className="section-text">
            Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum. Vestibulum cumque laudantium.
            Sit ornare mollitia tenetur, aptent.
          </p>
          <ul className="package-list">
            {packages.map((packageData, index) => (
              <li key={index}>
                <div className="package-card">
                  <figure className="card-banner">
                    <img src={convertToImageURL(packageData.location_Image)} alt="" />
                  </figure>
                  <div className="card-content">
                    <h3 className="h3 card-title">{packageData.tourPackage_Name}</h3>
                    <p className="card-text">{packageData.location_Speciality}</p>
                    <ul className="card-meta-list">
                      <li className="card-meta-item">
                       
                      </li>
                      <li className="card-meta-item">
                      
                      </li>
                      <li className="card-meta-item">
                       
                      </li>
                    </ul>
                  </div>
                  <div className="card-price">
                    <div className="wrapper">
                      <p className="reviews">(25 reviews)</p>
                     
                    </div>
                    <p className="price">₹ {packageData.tourPackage_PricePerDay}<span>/Per Day</span></p>
                    <Link to="/bookings"> {/* Use Link component to navigate to Bookings page */}
                      <button className="btn btn-secondary" onClick={() => handleBookNowClick(packageData)}>
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button className="btn btn-primary">View All Packages</button>
        </div>
      </section>
      <Gallery />
    </div>
  );
};

export default Package;
