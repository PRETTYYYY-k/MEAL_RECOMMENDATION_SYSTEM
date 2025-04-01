const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recipe_app')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Recipe search endpoint
app.post('/api/recipes/search', async (req, res) => {
  try {
    const { ingredients, dietaryPreference } = req.body;
    
    // Validate request body
    console.log('Received request body:', req.body);
    
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ 
        error: 'Please add at least one ingredient to search for recipes.',
        recipes: [] 
      });
    }

    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        ingredients: ingredients.join(','),
        number: 5,
        ranking: 2,
        ignorePantry: true,
        limitLicense: true
      }
    });

    if (!response.data || response.data.length === 0) {
      return res.status(404).json({
        error: 'No recipes found with these ingredients. Try different ingredients.',
        recipes: []
      });
    }

    // Changed 'ingredientResponse' to 'response'
    const filteredRecipes = response.data.filter(recipe => 
      recipe.missedIngredientCount <= 2 && 
      recipe.usedIngredientCount >= 1
    );

    // Get detailed information for filtered recipes
    const detailedRecipes = await Promise.all(
      filteredRecipes.slice(0, 5).map(async (recipe) => {
        const details = await axios.get(
          `https://api.spoonacular.com/recipes/${recipe.id}/information`,
          {
            params: {
              apiKey: process.env.SPOONACULAR_API_KEY
            }
          }
        );
        return {
          id: recipe.id,
          name: details.data.title,
          image: details.data.image,
          ingredients: details.data.extendedIngredients.map(ing => ing.original),
          usedIngredients: recipe.usedIngredients.map(ing => ing.name),
          missedIngredients: recipe.missedIngredients.map(ing => ing.name),
          instructions: details.data.instructions,
          cookingTime: details.data.readyInMinutes,
          servings: details.data.servings,
          dietaryInfo: {
            vegetarian: details.data.vegetarian,
            vegan: details.data.vegan,
            glutenFree: details.data.glutenFree
          }
        };
      })
    );

    res.json({ recipes: detailedRecipes });
    
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(400).json({ recipes: [] });
  }
});

// Start server
// Update the port configuration
// Update port configuration to use 3001 explicitly
const PORT = 3001;  // Changed from process.env.PORT || 3001

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server error:', err);
    process.exit(1);
  }
};

startServer();

// Add this temporary test route
app.get('/test-api', async (req, res) => {
  console.log('API Key:', process.env.SPOONACULAR_API_KEY);
  res.json({ message: 'Check your server console' });
});

// Single test route that actually tests the API
// Remove both existing test-api routes and replace with this one
app.get('/test-spoonacular', async (req, res) => {
  try {
    console.log('Testing Spoonacular API...');
    const response = await axios.get('https://api.spoonacular.com/recipes/random', {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        number: 1
      }
    });
    console.log('API Response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.json({ 
      error: 'Failed to fetch recipe', 
      details: error.message,
      apiKey: process.env.SPOONACULAR_API_KEY ? 'API key exists' : 'No API key found'
    });
  }
});

