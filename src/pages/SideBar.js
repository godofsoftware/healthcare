import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if it's a small screen

  const drawerContent = (
    <div>
      <Typography variant="h5" sx={{ padding: 2, color: '#fff' }}>Bayer Health</Typography>
      <List>
        {['Dashboard', 'My Profile', 'Appointments', 'Health Records', 'Messages', 'Logout'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} sx={{ color: '#fff' }} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {isSmallScreen ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: { width: drawerWidth, backgroundColor: '#0288d1', color: '#fff' },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, backgroundColor: '#0288d1', color: '#fff' },
          }}
        >
          <Toolbar />
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
