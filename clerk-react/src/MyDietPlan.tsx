import React from 'react';
import { Box, Typography } from '@mui/material';

const MyDietPlan: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Diet Plan
      </Typography>
      <Typography variant="body1">
        Personalized diet plan.
        Maybe show them their logs of goals. if it changes?
      </Typography>
    </Box>
  );
};

export default MyDietPlan;