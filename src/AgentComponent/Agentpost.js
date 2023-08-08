import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Agentpost() {
  const [openDialog, setOpenDialog] = useState(false);
  const [travelAgentId, setTravelAgentId] = useState(null); // To store the travelAgent_Id
  const [agentEmail, setAgentEmail] = useState(null); // State to store the email
  const token = localStorage.getItem('Token');


  useEffect(() => {
    // Fetch the agentEmail from local storage on page load
    const storedAgentEmail = localStorage.getItem("agentEmail");
    if (storedAgentEmail) {
      setAgentEmail(storedAgentEmail);
      fetchAgentByEmail(storedAgentEmail); // Automatically pass the agentEmail to the API
    }
  }, []);

  const handlePostTourPackage = async () => {
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("tourPackage_Name", formData.tourPackage_Name);
      formDataWithImage.append(
        "tourPackage_Location",
        formData.tourPackage_Location
      );
      formDataWithImage.append(
        "tourPackage_HotelName",
        formData.tourPackage_HotelName
      );
      formDataWithImage.append(
        "tourPackage_PricePerDay",
        formData.tourPackage_PricePerDay
      );
      formDataWithImage.append(
        "location_Speciality",
        formData.location_Speciality
      );
      formDataWithImage.append("spots_Nearby", formData.spots_Nearby);
      formDataWithImage.append("location_Image", formData.location_Image);
      formDataWithImage.append(
        "travelAgent.Administrator.admin_Id",
        formData.travelAgent.administrator.admin_Id
      );
      formDataWithImage.append(
        "travelAgent.TravelAgent_Id",
        formData.travelAgent.travelAgent_Id
      );

      for (let [key, value] of formDataWithImage.entries()) {
        console.log(key, value);
      }

      const postResponse = await axios.post(
        "https://localhost:7234/api/TourPackages",
        formDataWithImage
      );

      if (postResponse.status === 201) {
        console.log("Tour package posted successfully:", postResponse.data);
        // Add any success handling logic here
      } else {
        console.error(
          "Error adding tour package:",
          postResponse.statusText
        );
        // Add any error handling logic here
      }
    } catch (error) {
      console.error("Error posting tour package:", error);
      // Add any error handling logic here
    }
  };

  const fetchAgentByEmail = async (email) => {
    try {
      const response = await axios.get(
        `https://localhost:7234/api/TravelAgents/ByEmail?email=${encodeURIComponent(email)}`
      );
  
      if (response.status === 200) {
        const agentId = response.data.travelAgent_Id;
        setTravelAgentId(agentId);
        localStorage.setItem("agentId", agentId); // Store the agentId in local storage
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching agent details:", error);
    }
  };
  

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [formData, setFormData] = useState({
    tourPackage_Id: "",
    tourPackage_Name: "",
    tourPackage_Location: "",
    tourPackage_HotelName: "",
    tourPackage_PricePerDay: "",
    location_Speciality: "",
    spots_Nearby: "",
    location_Image: null,
    travelAgent: {
      travelAgent_Id: localStorage.getItem("agentId") || "", // Use the agentId from local storage if available
      administrator: {
        admin_Id: 0,
      },
    },
  });

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.includes("travelAgent.")) {
      const [nestedProperty, nestedField] = name.split(".");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [nestedProperty]: {
          ...prevFormData[nestedProperty],
          [nestedField]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, location_Image: file }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* Apply blue color style to the button */}
      <button
        style={{
          marginBottom: "10%",
          padding: "10px 20px",
          fontSize: "18px",
          backgroundColor: "blue", // Set the background color to blue
          color: "white", // Set the text color to white
          border: "none", // Remove the default button border
          cursor: "pointer",
        }}
        onClick={handleOpenDialog}
      >
        Post Now
      </button>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm">
        <DialogTitle>Package Details</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Package Name"
            name="tourPackage_Name"
            value={formData.tourPackage_Name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Package Location"
            name="tourPackage_Location"
            value={formData.tourPackage_Location}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Hotel Name"
            name="tourPackage_HotelName"
            value={formData.tourPackage_HotelName}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price Per Day"
            name="tourPackage_PricePerDay"
            value={formData.tourPackage_PricePerDay}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Speciality"
            name="location_Speciality"
            value={formData.location_Speciality}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Spots Nearby"
            name="spots_Nearby"
            value={formData.spots_Nearby}
            onChange={handleInputChange}
          />
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </DialogContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "90px 0",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handlePostTourPackage}
          >
            Post Tour Package
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
