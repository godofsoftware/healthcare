import { Grid, Button, Typography, Box, Card, CardContent, CardActions } from '@mui/material';
import { NextPage } from 'next';
import ResponsiveNav from './responsiveNav'; // Adjust the path based on your folder structure

const Home: NextPage = () => {
  return (
    <>
      {/* Full-width header */}
      <Box sx={{ backgroundColor: '#0288d1', color: 'white', padding: '2rem', textAlign: 'center', width: '100%' }}>
        <Typography variant="h4" sx={{mb:4}} component="h1">Bayer Healthcare</Typography>
        
        {/* Responsive Navigation */}
        <ResponsiveNav /> {/* <-- Using the ResponsiveNav component here */}
      </Box>

      {/* Main Section */}
      <Box sx={{ textAlign: 'center', margin: '2rem 0', width: '100%' }}>
        <Typography variant="h5">Your Health, Our Priority</Typography>
        <Typography variant="subtitle1" sx={{ marginTop: '1rem' }}>
          Explore the latest health information and resources from Bayer Healthcare
        </Typography>
      </Box>

      {/* Health Topics Section */}
      <Box sx={{ padding: '0 2rem' }}>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Featured Health Topics</Typography>
        <Grid container spacing={4} sx={{ width: '100%' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">COVID-19 Updates</Typography>
                <Typography variant="body2" color="textSecondary">
                  Stay informed about the latest COVID-19 guidelines and vaccination information.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="success">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Heart Health</Typography>
                <Typography variant="body2" color="textSecondary">
                  Discover tips and information for maintaining a healthy heart and cardiovascular system.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="success">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Mental Wellness</Typography>
                <Typography variant="body2" color="textSecondary">
                  Explore resources and support options for maintaining good mental health.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="success">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Nutrition & Diet</Typography>
                <Typography variant="body2" color="textSecondary">
                  Learn about balanced nutrition and healthy eating habits for overall wellbeing.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="success">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
