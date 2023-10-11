// Create a file for your Axios instance, e.g., axiosConfig.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.2.16:8000/api', // Replace with your API base URL
});

// Add an interceptor to include the JWT token in the headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
