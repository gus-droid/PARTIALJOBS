import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, CssBaseline } from '@mui/material';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

// import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
// import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
// import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
// import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';


type FormData = {
    age: string;
    height: string;
    currentWeight: string;
    goalWeight: string;
    budget: string;
    allergies: string;
    dietaryRestrictions: string;
    [key: string]: string;  // Add this line
};

// Addition of our information section
// const items = [
//     {
//         icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary'}} />
//     }
// ]






const FormPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({ // Use the FormData type here
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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        navigate('/result', { state: formData });
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            margin: 0,
            padding: 0,
            background: 'linear-gradient(135deg, #70e1f5 0%, #ffd194 100%)' // Fitness-themed gradient
        }}>
            <CssBaseline /> {/* Ensures no default margins/padding are affecting layout */}
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%', // Uses full width of the parent container
                    maxWidth: 400, // Limits form width for aesthetic purposes
                    padding: 3,
                    borderRadius: 1,
                    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)', // Optional: adds visibility
                    bgcolor: 'background.paper', // Ensures form is visibly distinct on gradient
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Typography variant="h6" color="primary" gutterBottom>
                    Enter Your Details
                </Typography>
                {['age', 'height', 'currentWeight', 'goalWeight', 'budget', 'allergies', 'dietaryRestrictions'].map(field => (
                    <TextField
                        key={field}
                        label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} // Formats labels nicely
                        variant="outlined"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required={['age', 'height', 'currentWeight', 'goalWeight', 'budget'].includes(field)}
                        sx={{ mb: 2 }} // Adds margin below each field
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
    );

};

export default FormPage;
