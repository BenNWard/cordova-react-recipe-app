import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { useAuth } from '../../context/UserContext';
import axios from '../../axiosConfig';
import { useTheme } from '@mui/material/styles'; // Import useTheme

import Visibility from '@mui/icons-material/Visibility'; // Add this line
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // Add this line

const Register = () => {
  const [showPassword, setShowPassword] = useState(false); // Added password toggle state
  const [showPassword2, setShowPassword2] = useState(false); // Added password toggle state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const theme = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state
    setError(null); // Clear any previous errors

    try {
      // Send the registration data to the backend
      const response = await axios.post('/register/', formData);
      console.log('Registration successful:', response.data);

      const loginResponse = await axios.post('/login/', formData);
      const { refresh, access } = loginResponse.data;
      login(access);
      // Optionally, you can handle successful registration, such as redirecting the user to the login page.
    } catch (error) {
      setError('Registration failed. Please check your credentials.'); // Set error message
      console.error('Registration error:', error);
      // Handle registration error, e.g., display an error message to the user.
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center"  height="100vh">
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h4">Register</Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            onChange={handleInputChange}
            value={formData.username}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            onChange={handleInputChange}
            value={formData.email}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'} // Toggle password visibility
            onChange={handleInputChange}
            value={formData.password}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            name="password2"
            type={showPassword2 ? 'text' : 'password'} // Toggle password visibility
            onChange={handleInputChange}
            value={formData.password2}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword2(!showPassword2)}
                    edge="end"
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Bio"
            name="bio"
            multiline
            rows={4}
            onChange={handleInputChange}
            value={formData.bio}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              marginTop: '1rem',
            }}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </form>
        {error && (
          <p style={{ color: theme.palette.error.main, marginTop: '1rem' }}>
            {error}
          </p>
        )}{' '}
        {/* Display error message */}
      </Grid>
    </Grid>
  );
};

export default Register;
