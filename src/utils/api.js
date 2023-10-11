// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://192.168.2.16:8000/api/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const getRecipes = async () => {
  try {
    const response = await axiosInstance.get('recipes/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more API functions for creating, updating, and deleting recipes as needed
