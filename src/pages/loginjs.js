import { Button, TextField, Box, Typography, Link } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // handle login logic here
    console.log(email, password);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          width: 400,
          p: 4,
          backgroundColor: 'white',
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        {/* Bayer Logo */}
        <Box sx={{ mb: 2 }}>
          <Image
            src="/logo.svg"  // Replace with your logo path
            alt="Bayer Logo"
            width={100}
            height={100}
          />
        </Box>

        {/* Login Heading */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#2196f3' }}>
          Login
        </Typography>

        {/* Email Input */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#4caf50',
            color: 'white',
            mb: 2,
            '&:hover': { backgroundColor: '#388e3c' },
          }}
          onClick={handleLogin}
        >
          Login
        </Button>

        {/* Links for Forgot Password and Register */}
        <Link href="#" sx={{ display: 'block', mb: 1, color: '#2196f3', textDecoration:'none' }}>
          Forgot Password?
        </Link>
        <Link href="#" sx={{ color: '#2196f3', textDecoration:'none' }}>
          New User? Register here
        </Link>
      </Box>
    </Box>
  );
}
