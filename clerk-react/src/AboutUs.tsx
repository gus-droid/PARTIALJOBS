import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', color: "gray", width: '100%' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#2c3e50' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#ecf0f1' }}>
            <Button color="inherit" href="/" sx={{ color: '#ecf0f1' }}>PartialJobs</Button>
          </Typography>
          <Box sx={{ mr: 2 }}>
            <Button color="inherit" component={Link} to="/about" sx={{ color: '#ecf0f1' }}>About Us</Button>
            <Button color="inherit" component={Link} to="/progress" sx={{ color: '#ecf0f1' }}>My Progress</Button>
            <Button color="inherit" component={Link} to="/diet-plan" sx={{ color: '#ecf0f1' }}>My Diet Plan</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ flexGrow: 1, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          About Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h5" gutterBottom>
                Our Mission
              </Typography>
              <Typography>
                At our core, we believe that achieving your fitness goals shouldn't be complicated. Whether you're looking to bulk up, lose weight, or maintain a balanced lifestyle, we simplify nutrition planning by creating personalized meal plans within your budget. With the help of innovative technologies and a data-driven approach, we empower you to reach your goals with ease.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h5" gutterBottom>
                How It Works
              </Typography>
              <Typography>
              Achieving your health goals has never been easier. Just provide us with some basic information about your health and fitness objectives, and our advanced AI will instantly generate a customized nutrition plan tailored to your specific needs and budget. Our AI doesn’t just stop there—it intelligently scans the web to find average prices at stores near you, ensuring you get the best deals without compromising on quality. With precision-backed recommendations and real-time price comparisons, we make healthy eating affordable and effortless, so you can focus on what matters most: reaching your goals.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <img src="https://i.pinimg.com/736x/a1/9b/16/a19b1645a2b9aecbca4f7b276dc32b7c.jpg" alt="Mission" style={{ width: '100%', borderRadius: '8px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="https://www.perfectdiettracker.com/support/wp-content/uploads/2020/03/media_1238433334135.png" alt="Works" style={{ width: '100%', borderRadius: '8px' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;

