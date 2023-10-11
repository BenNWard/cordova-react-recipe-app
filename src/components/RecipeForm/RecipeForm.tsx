import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextareaAutosize,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import RecipeIngredientsList from "./RecipeIngredientsList";
import { v4 as uuidv4 } from 'uuid';

const RecipeForm: React.FC = () => {
  const theme = useTheme();

  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [{ id: uuidv4(), name: "", amount: "", optional: false }],
    instructions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleAddIngredient = () => {
    const newIngredientId = uuidv4();
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [
        ...prevRecipe.ingredients,
        { id: newIngredientId, name: "", amount: "", optional: false },
      ],
    }));
  };

  const handleRemoveIngredient = (id: string) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: prevRecipe.ingredients.filter(
        (ingredient) => ingredient.id !== id
      ),
    }));
  };

  const handleIngredientChange = (
    value: string | boolean,
    id: string,
    fieldName: "name" | "amount" | "optional"
  ) => {
    setRecipe((prevRecipe) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      const ingredientIndex = updatedIngredients.findIndex(
        (ingredient) => ingredient.id === id
      );

      if (ingredientIndex !== -1) {
        const updatedIngredient = { ...updatedIngredients[ingredientIndex] };
        if (fieldName === "optional") {
          updatedIngredient[fieldName] = value as boolean;
        } else {
          updatedIngredient[fieldName] = value as string;
        }
        updatedIngredients[ingredientIndex] = updatedIngredient;
      }

      return {
        ...prevRecipe,
        ingredients: updatedIngredients,
      };
    });
  };

  const handleIngredientReorder = (reorderedIngredients: typeof recipe.ingredients) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: reorderedIngredients,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(recipe);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
          <Typography variant="h4" gutterBottom sx={{ marginBottom: theme.spacing(2) }}>
            Create a New Recipe
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              label="Recipe Title"
              name="title"
              value={recipe.title}
              onChange={handleChange}
              required
              sx={{ marginBottom: theme.spacing(2) }}
            />
            <RecipeIngredientsList
              ingredients={recipe.ingredients}
              onIngredientChange={handleIngredientChange}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
              onIngredientReorder={handleIngredientReorder}
            />
            <TextareaAutosize
              minRows={4}
              placeholder="Instructions (step by step)"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              required
              style={{ marginBottom: theme.spacing(2) }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(2),
                background: theme.palette.secondary.main,
                color: "#fff",
                "&:hover": {
                  background: theme.palette.secondary.dark,
                },
              }}
            >
              Submit
            </Button>
          </form>
      </Grid>
    </Grid>
  );
};

export default RecipeForm;
