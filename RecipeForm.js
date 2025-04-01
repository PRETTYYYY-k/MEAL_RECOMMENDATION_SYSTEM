import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Chip, Paper } from '@mui/material';

const RecipeForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('');

  const handleAddIngredient = () => {
    if (currentIngredient.trim()) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredients.length === 0) return;
    
    // Log the data being sent
    const formData = {
      ingredients: ingredients.map(ing => ing.trim()).filter(ing => ing),
      dietaryPreference: dietaryPreference || ''
    };
    console.log('Submitting data:', formData);
    
    onSubmit(formData);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        autoComplete="off"
        role="form"
        aria-label="Recipe search form"
      >
        <TextField
          id="name-input"
          name="name"
          label="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          inputProps={{
            'aria-label': 'Your name'
          }}
        />

        <FormControl fullWidth>
          <InputLabel id="dietary-preference-label">Dietary Preference</InputLabel>
          <Select
            labelId="dietary-preference-label"
            id="dietary-preference"
            name="dietary-preference"
            value={dietaryPreference}
            label="Dietary Preference"
            onChange={(e) => setDietaryPreference(e.target.value)}
            inputProps={{
              'aria-label': 'Select dietary preference'
            }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="vegetarian">Vegetarian</MenuItem>
            <MenuItem value="vegan">Vegan</MenuItem>
            <MenuItem value="gluten-free">Gluten-Free</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            id="ingredient-input"
            name="ingredient"
            fullWidth
            label="Add Ingredient"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddIngredient())}
            autoComplete="off"
            inputProps={{
              'aria-label': 'Enter ingredient'
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleAddIngredient}
            aria-label="Add ingredient to list"
          >
            Add
          </Button>
        </Box>

        <Box 
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
          role="list"
          aria-label="Selected ingredients"
        >
          {ingredients.map((ingredient, index) => (
            <Chip
              key={index}
              label={ingredient}
              onDelete={() => handleRemoveIngredient(index)}
              aria-label={`Remove ${ingredient}`}
            />
          ))}
        </Box>

        <Button 
          variant="contained" 
          type="submit" 
          disabled={ingredients.length === 0}
          sx={{ mt: 2 }}
          aria-label="Search for recipes"
        >
          Find Recipes
        </Button>
      </Box>
    </Paper>
  );
};

export default RecipeForm;