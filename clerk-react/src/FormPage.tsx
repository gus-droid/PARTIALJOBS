import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Box, Typography, CssBaseline, Stack, AppBar, Toolbar } from '@mui/material';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import axios from 'axios';

// Our website Information Section
// TODO: Delete info and add a title and catchprase underneath
const items = [
    {
        icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'How It Works',
        description:
            'Reach your health goals effortlessly. Our AI crafts personalized nutrition plans based on your objectives and budget, while scouring local stores for the best deals. Experience precision nutrition and smart savings, making your journey to better health both effective and affordable.',
    },
    {
        icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Seamless User Experience',
        description:
            'Integrate our platform into your daily routine with ease. The intuitive design allows you to effortlessly input your data, track your progress, and adjust your goals. We\'re here to make your journey as smooth and straightforward as possible—because focusing on your fitness should never feel like a chore.',
    },
    {
        icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Innovative Functionality',
        description:
            'Stay ahead with cutting-edge features that evolve with your needs. Our system is built to provide real-time meal recommendations based on your fitness journey and budget, with constant updates to ensure you\'re always working with the latest nutritional insights.',
    },
];

type FormData = {
    age: string;
    height: string;
    currentWeight: string;
    goalWeight: string;
    budget: string;
    allergies: string;
    dietaryRestrictions: string;
    [key: string]: string;
};

const FormPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
      
        try {
          const response = await axios.post('http://localhost:5000/api/users/create', formData);  // Ensure the URL is correct
          console.log('User created:', response.data);
          navigate('/result', { state: formData });
        } catch (error) {
          console.error('Error submitting data:', error);
        }
      };
      

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', color: "gray" }}>
            <CssBaseline />
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

            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    background: 'linear-gradient(135deg, #70e1f5 0%, #ffd194 100%)',
                    padding: 3,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        maxWidth: 1200,
                        margin: '0 auto',
                        gap: 4,
                    }}
                >
                    {/* Left Side: Sign-up form */}
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
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
                                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
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
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required={['age', 'height', 'currentWeight', 'goalWeight', 'budget'].includes(field)}
                                    sx={{ mb: 2 }}
                                />
                            ))}
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Box>
                    </Box>

                    {/* Right: Information Section */}
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Stack
                            sx={{
                                flexDirection: 'column',
                                gap: 4,
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
            </Box>
        </Box>
    );
};

export default FormPage;