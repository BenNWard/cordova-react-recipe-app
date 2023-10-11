// src/containers/RecipeDetails/RecipeDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any | null>(null);

  useEffect(() => {
    // Fetch the specific recipe by ID from your Django backend
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${id}`); // Replace with your backend API endpoint
        setRecipe(response.data);
      } catch (error) {
        // Handle error
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      {/* Display other recipe details as needed */}
    </div>
  );
};

export default RecipeDetails;
