import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, CssBaseline, Stack } from '@mui/material';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

// Our website Information Section
const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Adaptable performance',
    description:
      'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Built to last',
    description:
      'Experience unmatched durability that goes above and beyond with lasting investment.',
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Great user experience',
    description:
      'Integrate our product into your routine with an intuitive and easy-to-use interface.',
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Innovative functionality',
    description:
      'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
  },
];

const FormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    currentWeight: '',
    goalWeight: '',
    budget: '',
    allergies: '',
    dietaryRestrictions: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/result', { state: formData });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        background: 'linear-gradient(135deg, #70e1f5 0%, #ffd194 100%)', // Gradient background
      }}
    >
      <CssBaseline />
      {/* Left Side of Sign-up form */}
      <Box
        sx={{
          width: '50%', // Takes half the screen width
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
          backgroundColor: 'white',
        }}
      >
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: 400,
            padding: 3,
            borderRadius: 1,
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
            bgcolor: 'background.paper',
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" color="primary" gutterBottom>
            Enter Your Details
          </Typography>
          {['age', 'height', 'currentWeight', 'goalWeight', 'budget', 'allergies', 'dietaryRestrictions'].map((field) => (
            <TextField
              key={field}
              label={field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              variant="outlined"
              name={field}
              value={formData[field]} //error
              onChange={handleChange}
              required={['age', 'height', 'currentWeight', 'goalWeight', 'budget'].includes(field)}
              sx={{ mb: 2 }}
            />
          ))}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Box>
      </Box>

      {/* Right: Information Section */}
      <Box
        sx={{
          width: '50%', // Other half of the screen
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'column',
            gap: 4,
            maxWidth: 450,
          }}
        >
          {items.map((item, index) => (
            <Stack key={index} direction="row" sx={{ gap: 2 }}>
              {item.icon}
              <Box>
                <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.description}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default FormPage;
