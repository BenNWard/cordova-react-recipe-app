// src/components/Auth/Auth.js
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/UserContext';

const Auth = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('your-django-login-endpoint', formData);
      const { token } = response.data;
      login(token);
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <div>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Username"
        name="username"
        onChange={handleInputChange}
        value={formData.username}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        onChange={handleInputChange}
        value={formData.password}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default Auth;
