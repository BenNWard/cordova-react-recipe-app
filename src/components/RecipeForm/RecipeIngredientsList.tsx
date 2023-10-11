import React from "react";
import {
  Typography,
  Paper,
  List,
  Button,
  useTheme,
} from "@mui/material";
import RecipeIngredient from "./RecipeIngredient";
import { AddCircleOutline } from "@mui/icons-material";
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';

interface RecipeIngredientsListProps {
  ingredients: Array<{
    id: string;
    name: string;
    amount: string;
    optional: boolean;
  }>;
  onIngredientChange: (
    value: string | boolean,
    id: string,
    fieldName: "name" | "amount" | "optional"
  ) => void;
  onAddIngredient: () => void;
  onRemoveIngredient: (id: string) => void;
  onIngredientReorder: (ingredients: Array<{
    id: string;
    name: string;
    amount: string;
    optional: boolean;
  }>) => void;
}

const RecipeIngredientsList: React.FC<RecipeIngredientsListProps> = ({
  ingredients,
  onIngredientChange,
  onAddIngredient,
  onRemoveIngredient,
  onIngredientReorder,
}) => {
  const theme = useTheme();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedIngredients = [...ingredients];
    const [removed] = reorderedIngredients.splice(result.source.index, 1);
    reorderedIngredients.splice(result.destination.index, 0, removed);

    onIngredientReorder(reorderedIngredients);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        marginBottom: theme.spacing(2),
        border: `1px solid ${theme.palette.primary.main}`,
        padding: theme.spacing(2),
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ marginBottom: theme.spacing(1) }}>
        Ingredients: {/* Use a larger typography variant */}
      </Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="ingredients">
          {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps}>
              {ingredients.map((ingredient, index) => (
                <RecipeIngredient
                  key={ingredient.id}
                  ingredient={ingredient}
                  index={index}
                  onIngredientChange={onIngredientChange}
                  onRemoveIngredient={onRemoveIngredient}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        variant="contained" // Change to a contained button
        color="primary"
        fullWidth
        onClick={onAddIngredient}
        startIcon={<AddCircleOutline />}
        sx={{
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
          background: theme.palette.secondary.main, // Use a secondary color
          color: "#fff", // Text color
          "&:hover": {
            background: theme.palette.secondary.dark, // Hover color
          },
        }}
      >
        Add Ingredient
      </Button>
    </Paper>
  );
};

export default RecipeIngredientsList;
