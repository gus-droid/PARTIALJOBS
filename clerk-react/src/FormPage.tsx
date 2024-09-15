import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, CssBaseline, Stack } from '@mui/material';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

// Our website Information Section
const items = [
    {
        icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Our Mission: Personalized Nutrition, Simplified',
        description:
            'At our core, we believe that achieving your fitness goals shouldn\'t be complicated. Whether you\'re looking to bulk up, lose weight, or maintain a balanced lifestyle, we simplify nutrition planning by creating personalized meal plans within your budget. With the help of innovative technologies and a data-driven approach, we empower you to reach your goals with ease.',
    },
    {
        icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Tailored Nutrition for Every Goal',
        description:
            'We know that one size doesn’t fit all. Our platform adapts to your unique needs—whether you\'re aiming to build muscle, burn fat, or just stay in shape. With our expert-backed recommendations, you can be sure that every meal plan is designed with your specific goals in mind, ensuring the right balance of nutrition to fuel your progress.',
    },
    {
        icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Seamless User Experience',
        description:
            'Integrate our platform into your daily routine with ease. The intuitive design allows you to effortlessly input your data, track your progress, and adjust your goals. We’re here to make your journey as smooth and straightforward as possible—because focusing on your fitness should never feel like a chore.',
    },
    {
        icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Innovative Functionality',
        description:
            'Stay ahead with cutting-edge features that evolve with your needs. Our system is built to provide real-time meal recommendations based on your fitness journey and budget, with constant updates to ensure you’re always working with the latest nutritional insights.',
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
                background: 'linear-gradient(135deg, #70e1f5 0%, #ffd194 100%)', // Single gradient for entire background
            }}
        >
            <CssBaseline />
            {/* Left Side of Sign-up form */}
            <Box
                sx={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 4,
                    background: 'transparent', // Transparent to let parent gradient show
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
                    width: '50%', // Other half of the screen
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 4,
                    background: 'transparent', // Transparent to let parent gradient show
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
