import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, useTheme } from '@mui/material'; // Import necessary components and utilities from MUI
import axios from '../../axiosConfig'; // Import your Axios instance

interface Recipe {
  id: number;
  title: string;
  // Add other fields as needed
}

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const theme = useTheme(); // Use the theme

  useEffect(() => {
    // Fetch recipes from your Django backend
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<Recipe[]>('/recipes/'); // Replace with your backend API endpoint
        setRecipes(response.data);
      } catch (error) {
        // Handle error
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ marginTop: 16 }} >
      <Typography variant="h4" gutterBottom>
        Recipe List
      </Typography>
      {recipes.length > 0 ? (
        <List>
          {recipes.map((recipe) => (
            <ListItem key={recipe.id}>
              <ListItemText primary={recipe.title} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No recipes available.</Typography>
      )}
    </Container>
  );
};

export default Home;
