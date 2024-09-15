import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyProgress: React.FC = () => {
  // Sample data for weekly weight loss and savings
  const weightData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weight Loss (lbs)',
        data: [0.5, 0.9, 1.3, 2.3], // Example data points
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const savingsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Savings ($)',
        data: [50, 60, 80, 95], // Example data points
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Goal ($)',
        data: [60, 60, 60, 60], // Example comparison data
        borderColor: 'rgba(75, 192, 192, 1)',
        borderDash: [10, 5],
        fill: false,
      },
    ],
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#2c3e50' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#ecf0f1' }}>
                    <Button color="inherit" href="/" sx={{ color: '#ecf0f1' }}>Partial</Button>
                    </Typography>
                    <Box sx={{ mr: 2 }}>
                        <Button color="inherit" component={Link} to="/about" sx={{ color: '#ecf0f1' }}>About Us</Button>
                        <Button color="inherit" component={Link} to="/progress" sx={{ color: '#ecf0f1' }}>My Progress</Button>
                        <Button color="inherit" component={Link} to="/diet-plan" sx={{ color: '#ecf0f1' }}>My Diet Plan</Button>
                    </Box>
                </Toolbar>
            </AppBar>

      {/* Line Graphs */}
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Progress
        </Typography>

        {/* Weight Chart */}
        <Box sx={{ marginBottom: 5 }}>
          <Typography variant="h6" gutterBottom>
            Weekly Weight
          </Typography>
          <Line data={weightData} />
        </Box>

        <Box sx={{ marginBottom: 5 }}>
          <Typography variant="h6" gutterBottom>
            General Takeaways:
            <Typography align="center">
              Based on your weight goals, our ai predicts this is how your weight might change if you stick to the nutritioal plan tailored for you. 
            </Typography>
          </Typography>
        </Box>

        {/* Savings Chart */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Weekly Savings vs Goal
          </Typography>
          <Line data={savingsData} />
        </Box>

        <Box sx={{ marginBottom: 5 }}>
          <Typography variant="h6" gutterBottom>
            General Takeaways:
            <Typography align="center">
              Based on your budget, we estimate that on average you would be saving more than $12 weekly than if you were to not use the AI nutritional plan. 
            </Typography>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default MyProgress;
