import React, { useState } from 'react';
// eslint-disable
import axios from 'axios';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const backgroundImageUrl =
  'https://images.pexels.com/photos/1581581/pexels-photo-1581581.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
    const userData = {
      traveller_Username: data.get('firstName'),
      traveller_Email: data.get('email'),
      traveller_Password: data.get('password'),
    };

    try {
      const response = await axios.post('https://localhost:7234/api/Travelers', userData);
      console.log('Response:', response.data);
      navigate('/loginuser');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <Box
          component="main"
          sx={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <CssBaseline />
          <Container component="div" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                padding: '20px',
                borderRadius: '8px',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up User
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="Remember Me."
                    />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign Up 
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/loginuser" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}
