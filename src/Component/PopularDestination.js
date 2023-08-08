import React, { useEffect, useState } from 'react';

import popular from './images/popular-1.jpg';
import Package from './Package';
import './Style.css';

const PopularDestination = () => {
  const [tourPackages, setTourPackages] = useState([]);

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
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7234/api/TourPackages/GetTop3TourPackagesWithMostBookings');
        const data = await response.json();
        setTourPackages(data); // Set the fetched data in the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts

  }, []);

  return (
    <div>
      <section className="popular" id="destination">
        <div className="container">
          <p className="section-subtitle">Uncover place</p>
          <h2 className="h2 section-title">Popular destination</h2>
          <p className="section-text">
          Traveling can be a fantastic way to explore new places, experience different cultures, and create lasting memories. Whether you enjoy discovering historical sites, trying new cuisines, immersing yourself in nature, or simply relaxing on the beach, there's a world full of opportunities to satisfy your wanderlust.
          </p>
          <ul className="popular-list">
            {tourPackages.map((tourPackage, index) => (
              <li key={index}>
                <div className="popular-card">
                  <figure className="card-img">
                  <img src={convertToImageURL(tourPackage.location_Image)}/>
                  </figure>
                  <div className="card-content">
                    <p className="card-subtitle">
                      <a href="#">{tourPackage.tourPackage_Location}</a>
                    </p>
                    <h3 className="h3 card-title">
                      <a href="#">{tourPackage.spots_Nearby}</a>
                    </h3>
                    <p className="card-text">{tourPackage.location_Speciality}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
        </div>
      </section>
      <Package />
    </div>
  );
};

export default PopularDestination;
