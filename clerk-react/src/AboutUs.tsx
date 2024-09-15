import React from 'react';
import { Box, Typography } from '@mui/material';

const AboutUs: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        Information About our mission
        How our product Works
        Why our product Works
        i.e. sell it/documentation spill
      </Typography>
    </Box>
  );
};

export default AboutUs;
