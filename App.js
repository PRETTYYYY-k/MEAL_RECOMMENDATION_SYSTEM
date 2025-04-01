import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import axios from 'axios';

function App() {
  const [recipes, setRecipes] = useState(null); // Changed from [] to null
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    if (!formData.ingredients || formData.ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setError('');
    try {
      console.log('Form Data received:', formData);
      
      // Validate ingredients
      if (!formData.ingredients || !Array.isArray(formData.ingredients) || formData.ingredients.length === 0) {
        throw new Error('Please add at least one ingredient');
      }

      console.log('Making API request to:', 'http://localhost:3001/api/recipes/search');
      console.log('With data:', {
        ingredients: formData.ingredients,
        dietaryPreference: formData.dietaryPreference || ''
      });

      const response = await axios.post('http://localhost:3001/api/recipes/search', {
        ingredients: formData.ingredients,
        dietaryPreference: formData.dietaryPreference || ''
      });

      console.log('API Response:', response.data);
      
      if (response.data && response.data.recipes) {
        setRecipes(response.data.recipes);
      } else {
        setRecipes([]);
        setError('No recipes found for these ingredients');
      }
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setRecipes([]);
      setError(
        err.response?.data?.error || 
        err.message || 
        'Failed to fetch recipes. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h3" gutterBottom>
          Meal Recommendation
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Enter your ingredients and preferences to find recipes
        </Typography>
      </Box>

      <RecipeForm onSubmit={handleSubmit} />
      
      {error && (
        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      
      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography>Loading recipes...</Typography>
        </Box>
      ) : (
        <RecipeList recipes={recipes || []} />
      )}
    </Container>
  );
}

export default App;