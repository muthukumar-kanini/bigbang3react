  import React, { useEffect, useState } from 'react';
  import Avatar from '@mui/material/Avatar';
  import Button from '@mui/material/Button';
  import CssBaseline from '@mui/material/CssBaseline';
  import TextField from '@mui/material/TextField';
  import FormControlLabel from '@mui/material/FormControlLabel';
  import Checkbox from '@mui/material/Checkbox';
  import Link from '@mui/material/Link';
  import Paper from '@mui/material/Paper';
  import Box from '@mui/material/Box';
  import Grid from '@mui/material/Grid';
  import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
  import Typography from '@mui/material/Typography';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  import Snackbar from '@mui/material/Snackbar';
  import Dialog from '@mui/material/Dialog';
  import DialogTitle from '@mui/material/DialogTitle';
  import DialogContent from '@mui/material/DialogContent';
  import PaymentForm from './PaymentForm';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';

  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();

  export default function Bookings() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [travellerdate, setTravellerdate] = useState('');
  const [noOfDays, setNoOfDays] = useState('');
  const [packageId, setPackageId] = useState('');
  const [travellerId, setTravellerId] = useState('');

  const [openPaymentModel, setOpenPaymentModel] = useState(false);
  const navigate = useNavigate();

  const handleClosePaymentModel = () => {
    setOpenPaymentModel(false);
  };

  const [selectedPackage, setSelectedPackage] = useState({
    location_image: '',
    package_name: '',
    package_speciality: '',
    package_price: 0,
    package_id: 0,
    traveller_id: 0
  });

  useEffect(() => {
    // Get data from localStorage
    const location_image = localStorage.getItem('location_image');
    const package_name = localStorage.getItem('package_name');
    const package_speciality = localStorage.getItem('package_speciality');
    const package_price = localStorage.getItem('package_price');
    const package_id = localStorage.getItem('package_id');
    const traveller_id = localStorage.getItem('travellerId'); // Use the correct key

    console.log(package_id);
    console.log(traveller_id);

    // Update the selectedPackage state
    setSelectedPackage({
      location_image,
      package_name,
      package_speciality,
      package_price: parseInt(package_price), // Convert to number
      package_id: parseInt(package_id), // Convert to number
      traveller_id,
    });
  }, []);

  const isFormValid = () => {
    // Your form validation logic goes here
    return (
      travellerdate.trim() !== '' &&
      noOfDays.trim() !== '' 
    );
  };


  const handlePlaceOrder = (formData) => {
    const tid = localStorage.getItem('travellerId');
    console.log(tid);
    const bookingData = {
      booking_Date: travellerdate,
      booking_NoOfDays: parseInt(noOfDays), // Convert to number
      booking_TotalAmount: selectedPackage.package_price * parseInt(noOfDays), // Calculate total amount
      traveler: {
        traveller_Id: tid,
      },
      tourPackage: {
        tourPackage_Id: selectedPackage.package_id,
      },
      cardName: formData.cardName,
      cardNumber: formData.cardNumber,
      expDate: formData.expDate,
      cvv: formData.cvv,
    };

    console.log(bookingData);

    axios
      .post('https://localhost:7234/api/Bookings', bookingData)
      .then((response) => {
        console.log('Booking created successfully:', response.data);
        localStorage.setItem('BID',response.data.booking_Id)
        setOpenPaymentModel(false); 
        setSnackbarOpen(true);
        navigate('/invoice');
      })
      .catch((error) => {
        console.error('Error creating booking:', error);
        setSnackbarOpen(true); 
      });
  };

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

  const [packageInfoVisible, setPackageInfoVisible] = useState(false);



  // Handler for hover on the image grid
  const handleGridHover = () => {
    setPackageInfoVisible(true);
  };

  // Handler for leaving the image grid
  const handleGridLeave = () => {
    setPackageInfoVisible(false);
  };

    return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${convertToImageURL(selectedPackage.location_image)})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            '&:hover::after': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1, // Display above the image
            },
          }}
          onMouseEnter={handleGridHover} // Add hover event handler
          onMouseLeave={handleGridLeave} // Add leave event handler
        >
          {/* Add the package name and other information above the image */}
          {packageInfoVisible && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#fff',
                textAlign: 'center',
                zIndex: 2, // Display above the overlay pseudo-element
              }}
            >
              <Typography variant="h4">{selectedPackage.package_name}</Typography>
              <Typography variant="body1">{selectedPackage.package_speciality}</Typography>
              <Typography variant="body1">{selectedPackage.package_price}</Typography>
            </Box>
          )}
        </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Bookings Page
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Travellerdate"
                  label="Travellerdate"
                  name="Travellerdate"
                  autoComplete="Travellerdate"
                  autoFocus
                  value={travellerdate}
                  onChange={(e) => setTravellerdate(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="NoOfDays"
                  label="No of Days"
                  name="NoOfDays"
                  autoComplete="No of Days"
                  autoFocus
                  type="number"
                  value={noOfDays}
                  onChange={(e) => setNoOfDays(e.target.value)}
                />
                <Button
                  type="button" // Change the type to "button" to prevent form submission
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!isFormValid()}
                  onClick={() => {
                    setOpenPaymentModel(true);
                  }}
                >
                  Book now
                </Button>
                <Grid container>
                  {/* ... */}
                </Grid>
              </Box>
            </Box>
          </Grid>
          {/* ... */}
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="Booking Successful"
        />
        <Dialog open={openPaymentModel} onClose={handleClosePaymentModel} aria-labelledby="payment-form-dialog-title">
          <DialogTitle id="payment-form-dialog-title">Payment Details</DialogTitle>
          <DialogContent>
            {/* Pass handlePlaceOrder as a prop to PaymentForm */}
            <PaymentForm handlePlaceOrder={handlePlaceOrder} />
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    );
  }
