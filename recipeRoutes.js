const router = require('express').Router();
const axios = require('axios');

router.post('/search', async (req, res) => {
  try {
    const { ingredients, dietaryPreference } = req.body;
    
    // Call Spoonacular API
    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        ingredients: ingredients.join(','),
        number: 10,
        ranking: 2,
        ignorePantry: true
      }
    });

    // Get detailed recipe information including dietary info
    const detailedRecipes = await Promise.all(
      response.data.map(async (recipe) => {
        const details = await axios.get(
          `https://api.spoonacular.com/recipes/${recipe.id}/information`,
          {
            params: {
              apiKey: process.env.SPOONACULAR_API_KEY
            }
          }
        );
        return details.data;
      })
    );

    // Filter by dietary preference if specified
    const matchingRecipes = dietaryPreference
      ? detailedRecipes.filter(recipe => 
          recipe.diets.includes(dietaryPreference.toLowerCase()))
      : detailedRecipes;

    res.json({ recipes: matchingRecipes });
  } catch (error) {
    console.error('API Error:', error);
    res.status(400).json({ error: 'Failed to fetch recipes' });
  }
});

module.exports = router;