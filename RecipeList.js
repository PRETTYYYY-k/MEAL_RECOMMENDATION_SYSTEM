import React from 'react';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const RecipeList = ({ recipes = [] }) => {
  // Don't show anything on initial load
  if (!recipes || (Array.isArray(recipes) && recipes.length === 0)) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        {recipes === null ? (
          // Initial state
          null
        ) : (
          <Typography variant="h6" color="text.secondary">
            No recipes found. Try adding some ingredients above.
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {recipes.map((recipe, index) => (
        <Card key={recipe.id || index} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {recipe.image && (
                <img 
                  src={recipe.image} 
                  alt={recipe.name} 
                  style={{ width: 100, height: 100, objectFit: 'cover', marginRight: 16 }}
                />
              )}
              <Box>
                <Typography variant="h5" gutterBottom>{recipe.name || 'Untitled Recipe'}</Typography>
                <Typography color="text.secondary">
                  Cooking Time: {recipe.cookingTime || 'Not specified'} minutes
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" gutterBottom>Ingredients:</Typography>
            <List dense>
              {(recipe.ingredients || []).map((ingredient, i) => (
                <ListItem key={i}>
                  <ListItemText primary={ingredient} />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>Instructions:</Typography>
            <Typography 
              sx={{ whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{ __html: recipe.instructions || 'No instructions available' }}
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default RecipeList;