import React from 'react';
import { Box, Typography } from '@mui/material';

const MyProgress: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Progress
      </Typography>
      <Typography variant="body1">
        Show users progress.
        Maybe through graphs or a calendar?
      </Typography>
    </Box>
  );
};

export default MyProgress;