import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';  // Add this import
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password
      });
      login(response.data.user, response.data.token);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Paper style={{ padding: 20, maxWidth: 400, margin: '20px auto' }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 20 }}
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default Login;