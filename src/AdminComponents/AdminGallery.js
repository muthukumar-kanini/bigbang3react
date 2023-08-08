import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'; // Import Axios
import Adminn from './Adminn';
import AGallery from './Agallery';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px', // Adjust this value to set the height of the centered container
  },
  button: {
    margin: 'auto',
  },
};

export default function AdminGallery() {

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the userEmail from local storage
    const tokenhere = localStorage.getItem('token');
    console.log("not working")
    if(tokenhere!=null)
    {
      return <Navigate to='/login' />
    }
    
    
  }, []);


    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
  
    const handleOpenDialog = () => {
      setOpen(true);
    };
  
    const handleCloseDialog = () => {
      setOpen(false);
  
      // Fetch Admin_Id from local storage
      const adminId = localStorage.getItem('Admin_Id');
  
      // POST the selected image to the API
      if (selectedImage) {
        const formData = new FormData();
        formData.append('Admin_Id', adminId); // Add the Admin_Id to the form data
        formData.append('Image', selectedImage); // Add the selected image to the form data
  
        axios
          .post('https://localhost:7120/api/AdminGallery', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type explicitly for multipart form data
            },
          })
          .then((response) => {
            // Handle successful response if needed
            console.log('Image uploaded successfully:', response.data);
          })
          .catch((error) => {
            // Handle error if needed
            console.error('Error uploading image:', error);
          });
      }
    };
  
    const handleImageSelection = (event) => {
      const file = event.target.files[0];
      setSelectedImage(file);
    };

  return (
    <div>
    <div style={styles.container}>
       
      <Button
        variant="contained"
        color="primary"
        style={styles.button}
        onClick={handleOpenDialog}
      >
        Choose Image
      </Button>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Choose an Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please choose an image file:
          </DialogContentText>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelection}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Adminn/>
      
    </div>
    <AGallery/>
    </div>
  );
}
