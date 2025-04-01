import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const RecipeCard = ({ recipe, onSave }) => {
  return (
    <Card style={{ maxWidth: 345, margin: '15px' }}>
      <CardMedia
        component="img"
        height="194"
        image={recipe.image}
        alt={recipe.title}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Ready in: {recipe.readyInMinutes} minutes
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Servings: {recipe.servings}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => onSave(recipe)}
          style={{ marginTop: '10px' }}
        >
          Save Recipe
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;