import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Button, Box, useMediaQuery, Theme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ResponsiveNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  // Check if the screen size is less than 'sm' (for mobile devices)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navItems = ['Home', 'Health Topics', 'Resources', 'About Us', 'Contact', 'Login'];

  const handleLoginClick = () => {
    // Navigate to login page
    router.push('/login');
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#8bc34a' }}>
        <Toolbar>
          {isMobile ? (
            // Mobile view: show hamburger icon
            <>
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{ display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{
                    width: 250,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                >
                  <IconButton onClick={toggleDrawer(false)} sx={{ margin: '1rem', alignSelf: 'flex-end' }}>
                    <CloseIcon />
                  </IconButton>
                  <List sx={{ width: '100%', padding: 0 }}> {/* Remove extra padding */}
                    {navItems.map((text) => (
                      <ListItem
                        button
                        key={text}
                      >
                        {text === 'Login' ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleLoginClick}
                            
                          >
                            {text}
                          </Button>
                        ) : (
                            <Link href={`#`} passHref>
                            <Typography variant="h6" key={text} sx={{ margin: '0 1rem', display: 'inline-block' }}>
                                {text}
                                </Typography>
                          </Link>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            // Desktop view: show full menu
            <Box sx={{ 
                display: { xs: 'none', sm: 'flex' }, // Use 'flex' instead of 'block'
                justifyContent: 'center',
                alignItems: 'center', // Center vertically
                width: '100%', // Make sure it uses full width
              }}>
                {navItems.map((item) => (
                  item === 'Login' ? (
                    <Button
                      key={item}
                      variant="contained"
                      color="primary"
                      onClick={handleLoginClick}
                      sx={{ margin: '0 1rem' }}
                    >
                      {item}
                    </Button>
                  ) : (
                    <Link href={`#`} passHref>
                    <Typography variant="h6" key={item} sx={{ margin: '0 1rem', display: 'inline-block', color:'white' }}>
                      {item}
                    </Typography>
                    </Link>
                  )
                ))}
              </Box>
              
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default ResponsiveNav;
