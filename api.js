import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const searchRecipes = async (ingredients, preferences) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recipes/search`, {
      ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
      dietaryPreference: preferences.diet || ''
    });
    return response.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Unable to connect to server. Please check if the server is running.');
    }
    console.error('API Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch recipes. Please try again.');
  }
};