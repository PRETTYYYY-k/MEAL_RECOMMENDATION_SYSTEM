import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const PreferencesFilter = ({ preferences, onPreferencesChange }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Diet</InputLabel>
        <Select
          value={preferences.diet}
          label="Diet"
          onChange={(e) => onPreferencesChange({ ...preferences, diet: e.target.value })}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="vegetarian">Vegetarian</MenuItem>
          <MenuItem value="vegan">Vegan</MenuItem>
          <MenuItem value="gluten-free">Gluten Free</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PreferencesFilter;