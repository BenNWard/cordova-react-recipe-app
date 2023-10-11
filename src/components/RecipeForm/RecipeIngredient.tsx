import React from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  ListItemSecondaryAction,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import { Fastfood, RemoveCircleOutline } from "@mui/icons-material";
import { Draggable } from "@hello-pangea/dnd";

interface RecipeIngredientProps {
  ingredient: {
    id: string;
    name: string;
    amount: string;
    optional: boolean;
  };
  index: number;
  onIngredientChange: (
    value: string | boolean,
    id: string,
    fieldName: "name" | "amount" | "optional"
  ) => void;
  onRemoveIngredient: (id: string) => void;
}

const ResponsiveListItem = styled(ListItem)(({ theme }) => ({
  alignItems: "center",
  backgroundColor: theme.palette.background.paper, // Use the custom background color from your theme
  boxShadow: `0 2px 4px rgba(0, 0, 0, 0.1)`, // Apply a subtle shadow
  borderRadius: theme.shape.borderRadius, // Use the custom border radius from your theme
  cursor: "grab",
  marginBottom: theme.spacing(2), // Use the custom spacing from your theme
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const RecipeIngredient: React.FC<RecipeIngredientProps> = ({
  ingredient,
  index,
  onIngredientChange,
  onRemoveIngredient,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Draggable draggableId={ingredient.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            opacity: snapshot.isDragging ? 0.9 : 1,
            transition: "opacity 0.2s",
            ...provided.draggableProps.style,
          }}
        >
          <ResponsiveListItem>
            <ListItemIcon>
              <Fastfood />
            </ListItemIcon>
            <ListItemText>
              <TextField
                fullWidth
                label={`Ingredient ${index + 1} Name`}
                value={ingredient.name}
                onChange={(e) =>
                  onIngredientChange(e.target.value, ingredient.id, "name")
                }
                required
                size="small"
                sx={{
                  marginBottom: isSmallScreen ? "4px" : theme.spacing(1),
                }}
              />
              <TextField
                fullWidth
                label="Amount"
                value={ingredient.amount}
                onChange={(e) =>
                  onIngredientChange(e.target.value, ingredient.id, "amount")
                }
                size="small"
                sx={{
                  marginBottom: isSmallScreen ? "4px" : theme.spacing(1),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ingredient.optional}
                    onChange={(e) =>
                      onIngredientChange(
                        e.target.checked,
                        ingredient.id,
                        "optional"
                      )
                    }
                  />
                }
                label="Optional"
              />
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => onRemoveIngredient(ingredient.id)}
                edge="end"
              >
                <RemoveCircleOutline />
              </IconButton>
            </ListItemSecondaryAction>
          </ResponsiveListItem>
        </div>
      )}
    </Draggable>
  );
};

export default RecipeIngredient;
