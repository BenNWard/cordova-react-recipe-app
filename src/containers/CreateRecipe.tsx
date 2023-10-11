import React from 'react';
import { Container, Typography, useTheme } from '@mui/material'; // Import useTheme from @mui/material
import RecipeForm from '../components/RecipeForm/RecipeForm';

const CreateRecipe: React.FC = () => {
  const theme = useTheme(); // Use the theme

  return (
    <Container maxWidth="xl">
      <RecipeForm />
    </Container>
  );
};

export default CreateRecipe;
