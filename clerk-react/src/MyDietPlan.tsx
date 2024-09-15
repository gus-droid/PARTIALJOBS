import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MyDietPlan: React.FC = () => {
  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', color: "gray" }}>
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
      </Box>
    </>
  );
};

export default MyDietPlan;