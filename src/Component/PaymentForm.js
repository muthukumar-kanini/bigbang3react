import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

export default function PaymentForm({ handlePlaceOrder }) {
  const [formData, setFormData] = React.useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    saveCard: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: fieldValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    handlePlaceOrder(formData); // Pass the form data to the parent component
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              name="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              value={formData.cardName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              name="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              value={formData.cardNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              name="expDate"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              value={formData.expDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              name="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              value={formData.cvv}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  name="saveCard"
                  checked={formData.saveCard}
                  onChange={handleChange}
                />
              }
              label="Remember credit card details for next time"
            />
          </Grid>
        </Grid>
        <Button
          type="submit" // Change the type to "submit" to trigger form submission
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Place order
        </Button>
      </form>
    </React.Fragment>
  );
}
