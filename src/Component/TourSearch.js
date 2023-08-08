import React, { useState } from "react";
import "./Style.css";
import PopularDestination from "./PopularDestination";

const TourSearch = () => {
  const [tourData, setTourData] = useState(null);
  const token = localStorage.getItem('Token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const destination = event.target.destination.value;
    const price = event.target.price.value;
    const speciality = event.target.speciality.value;
    const nearbySpots = event.target.nearbySpots.value;

    const apiUrl = `https://localhost:7234/api/TourPackages/GetTourPackagesByFilters?destination=${destination}&price=${price}&speciality=${speciality}&nearbySpots=${nearbySpots}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setTourData(data); // Save the fetched data in the component's state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(JSON.stringify(tourData, null, 2)); // This will display the content of tourData in a readable format

  const convertToImageURL = (byteData) => {
    const binaryData = atob(byteData);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < binaryData.length; i++) {
      uintArray[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
    return URL.createObjectURL(blob);
  };

  return (
    <div>
      <section className="tour-search">
        <div className="container">
          <form onSubmit={handleSubmit} className="tour-search-form">
            <div className="input-wrapper">
              <label htmlFor="destination" className="input-label">
                Search Destination*
              </label>
              <input
                type="text"
                name="destination"
                id="destination"
                required
                placeholder="Enter Destination"
                className="input-field"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="people" className="input-label">
                Price per day
              </label>
              <input
                type="number"
                name="price"
                id="price"
                required
                placeholder="price-per-day"
                className="input-field"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="checkin" className="input-label">
                speciality
              </label>
              <input
                type="text"
                name="speciality"
                id="speciality"
                required
                placeholder="speciality"
                className="input-field"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="checkout" className="input-label">
                nearbySpots
              </label>
              <input
                type="text"
                name="nearbySpots"
                id="nearbySpots"
                required
                placeholder="nearbySpots"
                className="input-field"
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              Search now
            </button>
          </form>
        </div>

        {tourData && (
          <div style={{display:'inline-list-item',marginTop:'5%',marginLeft:'5%'}}>
          <ul className="popular-list" >
            {tourData.map((dataItem) => (
              <li key={dataItem.tourPackage_Id}>
                <div className="popular-card">
                  <figure className="card-img">
                    <img src={convertToImageURL(dataItem.location_Image)} alt={dataItem.title} />
                  </figure>
                  <div className="card-content">
                    <p className="card-subtitle">
                      <a href="#">{dataItem.tourPackage_Name}</a>
                    </p>
                    <h3 className="h3 card-title">
                      <a href="#">{dataItem.tourPackage_Location}</a>
                    </h3>
                    <p className="card-text">{dataItem.location_Speciality}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          </div>
        )}
      </section>
      <PopularDestination />
    </div>
  );
};

export default TourSearch;
