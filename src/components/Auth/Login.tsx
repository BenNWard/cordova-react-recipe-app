import React, { useState } from 'react';
import { Button, TextField, Typography, CircularProgress, Grid } from '@mui/material';
import { useAuth } from '../../context/UserContext';
import axios from '../../axiosConfig'; // Import your Axios instance
import { useTheme } from '@mui/material/styles'; // Import useTheme

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Store error message
  const { login } = useAuth();
  const theme = useTheme(); // Use the useTheme hook to access the theme

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    setLoading(true); // Set loading state
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post('/login/', formData); // Replace with your login endpoint
      const { refresh, access } = response.data;
      login(access);
    } catch (error) {
      // Handle login error
      setError('Login failed. Please check your credentials.'); // Set error message
      console.error('Login error:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Grid container justifyContent="center" height="100vh">
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h4">Login</Typography>
        </div>
        <form>
          <TextField
            label="Username"
            name="username"
            autoComplete="on"
            onChange={handleInputChange}
            value={formData.username}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="on"
            onChange={handleInputChange}
            value={formData.password}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            value="Login"
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              marginTop: '1rem',
            }}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          {error && (
            <p style={{ color: theme.palette.error.main, marginTop: '1rem' }}>
              {error}
            </p>
          )}{' '}
          {/* Display error message */}
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
