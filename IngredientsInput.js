import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const IngredientsInput = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ingredients.split(',').map(i => i.trim()));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Enter ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Find Recipes
      </Button>
    </Box>
  );
};

export default IngredientsInput;