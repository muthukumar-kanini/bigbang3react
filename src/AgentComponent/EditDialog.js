import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EditDialog = ({ packageData, onSave, onCancel }) => {
  const [tourpackage_id, setTourPackage_Id] = useState(packageData.tourPackage_Id);
  const [name, setName] = useState(packageData.tourPackage_Name);
  const [speciality, setSpeciality] = useState(packageData.location_Speciality);
  const [pricePerDay, setPricePerDay] = useState(packageData.tourPackage_PricePerDay);
  const [spots_Nearby, setSpotsNearby] = useState(packageData.spots_Nearby);
  const [selectedFile, setSelectedFile] = useState(null);
  const [agent_id, setAgentId] = useState(1)
  const [admin_id, setadmin_id] =useState(null)

  useEffect(() => {
    const agentId = localStorage.getItem("agentId");
    setadmin_id(agentId)
    console.log('Agent ID:', agentId);
  }, []);

  const handleSave = () => {
    const formData = new FormData();
    formData.append('tourPackage_id', tourpackage_id);
    formData.append('tourPackage_Name', name);
    formData.append('location_Speciality', speciality);
    formData.append('tourPackage_PricePerDay', pricePerDay);
    formData.append('spots_Nearby', spots_Nearby);
    formData.append('locationImageFile', selectedFile);
    formData.append('travelAgent.TravelAgent_Id', agent_id);
    formData.append('travelAgent.Administrator.Admin_Id', admin_id)

    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    // Make the Axios PUT request
    axios
      .put(`https://localhost:7234/api/TourPackages/${tourpackage_id}`, formData)
      .then((response) => {
        console.log('Update successful:', response.data);
        onSave(response.data); // Pass the updated data to the onSave callback
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleFileChange = (e) => {
    // Update the selectedFile state when the file input value changes
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Dialog open={true} onClose={handleCancel}>
      <DialogTitle>Edit Package</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Speciality"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Price Per Day"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Spots Nearby"
          value={spots_Nearby}
          onChange={(e) => setSpotsNearby(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <input type="file" onChange={handleFileChange} accept="image/*" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
