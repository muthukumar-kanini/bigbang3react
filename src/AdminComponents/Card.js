import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminn from "./Adminn";

export default function CardNew() {
  const [tourPackages, setTourPackages] = useState([]);
  const [tourPackages1, setTourPackages1] = useState([]);
  const [tourPackages2, setTourPackages2] = useState([]);

  const cardStyles = {
    width: "100%",
    maxWidth: "325px",
    margin: "10px",
    padding: "10px",
    borderRadius: "8px",
  };

  const imgStyles = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px 8px 0 0",
  };

  const dataStyles = {
    color: "black",
    fontSize: "2.1rem",
    textAlign: "center",
    padding: "10px",
  };

  const subtitleStyles = {
    color: "black",
    fontSize: "1.5rem",
    textAlign: "center",
    padding: "10px",
  };

  const approveButtonStyles = {
    background: "green",
    color: "white",
    border: "2px solid green",
    margin: "5px",
  };

  const declineButtonStyles = {
    background: "red",
    color: "white",
    border: "2px solid red",
    margin: "5px",
  };

  const fetchTourPackages = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7234/api/Administrators/UnapprovedTravelAgents"
      );
      setTourPackages(response.data);
    } catch (error) {
      console.error("Error fetching Agents data:", error);
    }
  };

  const fetchTourPackages1 = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7234/api/Administrators/ApprovedTravelAgents"
      );
      setTourPackages1(response.data);
    } catch (error) {
      console.error("Error fetching Agents data:", error);
    }
  };

  const fetchTourPackages2 = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7234/api/Administrators/DeclinedTravelAgents"
      );
      setTourPackages2(response.data);
    } catch (error) {
      console.error("Error fetching Agents data:", error);
    }
  };

  useEffect(() => {
    fetchTourPackages();
    fetchTourPackages1();
    fetchTourPackages2();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `https://localhost:7234/api/Administrators/UpdateApprovalStatus/${id}`,
        "Approved",
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      fetchTourPackages();
      fetchTourPackages1();
      fetchTourPackages2();
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.put(
        `https://localhost:7234/api/Administrators/UpdateApprovalStatus/${id}`,
        "Declined",
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      fetchTourPackages();
      fetchTourPackages1();
      fetchTourPackages2();
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };

  return (
    <div>
      <main className="container" style={{ marginTop: "120px" }}>
        <br></br>
        <br></br>

        <section className="section tour">
          <h3 className="section-title" style={{ textAlign: "center" }}>
            Pending Requests - Agents
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {tourPackages.map((tourPackage) => (
              <div
                key={tourPackage.travelAgent_Id}
                className="tour_card tour_card-hover"
                style={cardStyles}
              >
                <img
                  className="tour__card-img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIbq6stbeqAOVnvByydB7-21M-3yiamqWJw3VXYw6TjA&s"
                  alt={tourPackage.travelAgent_Username}
                  style={imgStyles}
                />
                <div className="tour__data" style={dataStyles}>
                  <h5 className="tour__data-title">
                    Agent Name: {tourPackage.travelAgent_Username}
                  </h5>
                  <span className="tour__data-subtitle">
                    Status: {tourPackage.travelAgent_IsApproved}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    className="tour__button"
                    onClick={() => handleApprove(tourPackage.travelAgent_Id)}
                    style={approveButtonStyles}
                  >
                    Approve
                  </button>
                  <button
                    className="tour__button"
                    onClick={() => handleDecline(tourPackage.travelAgent_Id)}
                    style={declineButtonStyles}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <br></br>

        <section className="section tour">
          <br></br>
          <br></br>
          <h3 className="section-title" style={{ textAlign: "center" }}>
            Approved Requests - Agents
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {tourPackages1.map((tourPackage1) => (
              <div
                key={tourPackage1.travelAgent_Id}
                className="tour_card tour_card-hover"
                style={{ ...cardStyles, backgroundColor: "#4BAC3F" }}
              >
                <img
                  className="tour__card-img"
                  src={tourPackage1.image}
                  alt={tourPackage1.travelAgent_Username}
                  style={{ ...imgStyles, borderRadius: "8px 8px 0 0" }}
                />
                <div className="tour__data" style={dataStyles}>
                  <h5 className="tour__data-title">
                    Agent Name: {tourPackage1.travelAgent_Username}
                  </h5>
                  <span className="tour__data-subtitle">
                    Status: {tourPackage1.travelAgent_IsApproved}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section tour">
          <br></br>
          <br></br>
          <h3 className="section-title" style={{ textAlign: "center" }}>
            Declined Requests - Agents
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {tourPackages2.map((tourPackage2) => (
              <div
                key={tourPackage2.travelAgent_Id}
                className="tour_card tour_card-hover"
                style={{ ...cardStyles, backgroundColor: "#F51720" }}
              >
                <img
                  className="tour__card-img"
                  src={tourPackage2.image}
                  alt={tourPackage2.travelAgent_Username}
                  style={{ ...imgStyles, borderRadius: "8px 8px 0 0" }}
                />
                <div className="tour__data" style={dataStyles}>
                  <h5 className="tour__data-title">
                    Agent Name: {tourPackage2.travelAgent_Username}
                  </h5>
                  <span className="tour__data-subtitle">
                    Status: {tourPackage2.travelAgent_IsApproved}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Adminn/>
    </div>
  );
}
