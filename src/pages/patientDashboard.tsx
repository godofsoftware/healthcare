import React, { useState } from 'react';
import Head from 'next/head';
import { Box, Typography, Button, Paper, IconButton, Toolbar, AppBar } from '@mui/material';
import Sidebar from './SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { useRouter } from 'next/router';

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const user = localStorage.getItem('username')
  const router = useRouter()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleRedirect = (redirect: string) => {
    router.push(redirect)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Head>
        <title>Health Dashboard</title>
        <meta name="description" content="Health Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* AppBar for mobile screens */}
      {isSmallScreen && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Bayer Health
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar Component */}
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          marginLeft: { sm: `${isSmallScreen ? 0 : '0px'}` }, // Adjust margin for desktop
          marginTop: { xs: 8, sm: 0 }, // Adjust margin top for mobile (AppBar height)
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Welcome, {user}
        </Typography>

        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6">Upcoming Appointments</Typography>
          <Typography>Next appointment: Dr. Smith on June 15, 2023 at 10:00 AM</Typography>
          <Typography>Following: Dr. Johnson on June 22, 2023 at 2:00 PM</Typography>
        </Paper>

        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6">Health Reminders</Typography>
          <Typography>• Take medication A at 9:00 AM daily</Typography>
          <Typography>• Schedule annual check-up</Typography>
        </Paper>

        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6">Health Tip of the Day</Typography>
          <Typography>Stay hydrated! Aim to drink at least 8 glasses of water per day.</Typography>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" color="success" onClick={() => handleRedirect('/appointment')}>Book Appointment</Button>
          <Button variant="contained" color="primary">View Health Records</Button>
          <Button variant="contained" color="secondary">Message Provider</Button>
        </Box>
      </Box>
    </Box>
  );
}
