import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditDialog from './EditDialog';
import Agent from './Agent';
import './styles.css';
import Agentpost from './Agentpost';

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedPackageData, setSelectedPackageData] = useState(null);
  const token = localStorage.getItem('Token');
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
    fetchPackages();
  }, []);

  const fetchPackages = () => {
    fetch('https://localhost:7234/api/TourPackages',{headers:  {
      Authorization: `Bearer ${token}`
  }})
      .then((response) => response.json())
      .then((data) => setPackages(data))
     
      .catch((error) => console.error('Error fetching data:', error));
      
  };

  const handleEditClick = (packageData) => {
    setSelectedPackageData(packageData);
    setShowEditDialog(true);
  };

  const handleEditSave = (editedPackageData) => {
    console.log('Edited Package:', editedPackageData);
    fetchPackages();
    setShowEditDialog(false);
  };

  const handleEditCancel = () => {
    setShowEditDialog(false);
  };

  const handleDeleteClick = (packageId) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      deletePackage(packageId);
    }
  };

  const deletePackage = (packageId) => {
    axios.delete(`https://localhost:7234/api/TourPackages/${packageId}`)
      .then((response) => {
        fetchPackages();
      })
      .catch((error) => console.error('Error deleting package:', error));
  };
  

  return (
    <div>
    <div>
      <section className="package" id="package">
        <div className="container">
          <p className="section-subtitle">All Packages</p>
         
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
                    <p className="Location"> {packageData.tourPackage_Location}<span></span></p>
                    <ul className="card-meta-list">
                   
                    `</ul>
                  </div>
                  <div className="card-price">
                    <div className="wrapper">
                  
                    </div>
                    <p className="price">₹ {packageData.tourPackage_PricePerDay}<span>/Per Day</span></p>
                    <button className="btn btn-secondary" onClick={() => handleEditClick(packageData)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeleteClick(packageData.tourPackage_Id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
         
        </div>
      </section>
      <Agent />

      {showEditDialog && selectedPackageData && (
        <EditDialog packageData={selectedPackageData} onSave={handleEditSave} onCancel={handleEditCancel} />
      )}
    </div>
    
    <Agentpost/>
    </div>
  );
};

export default Package;
