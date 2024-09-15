import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, TextField, Button, Box, Typography, CssBaseline, Chip, Stack, Divider } from '@mui/material';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { ExerciseLevel, calculate_bmr, calorie_delta_goal, energy_delta } from './calorie_math';
import {get_meal_plan} from './OpenAI';

const ResultPage = () => {
    const location = useLocation();
    const formData = location.state as { [key: string]: string };

    const age = parseFloat(formData["age"]);
    const height = parseFloat(formData["height"]);
    const weight = parseFloat(formData["currentWeight"]);
    const target_weight = parseFloat(formData["goalWeight"]);
    const budget = parseFloat(formData["budget"]);
    const is_male = formData["sex"] == "male";

    const bmr: number = calculate_bmr(weight, height, age, is_male);
    const energy_cal: number = energy_delta(bmr, ExerciseLevel.Moderate);
    const in_12_weeks: number = calorie_delta_goal(-(weight - target_weight)/12);

    const [test_chatgpt, setText] = useState("hehe");

    useEffect(() => {
        async function assign_text() {
            get_meal_plan(40, 40, 40).then((result) => {
                setText( result["breakfast"]["meal"] );
                console.log("PRINTING");
                console.log(test_chatgpt);
            }).catch((error) => {
                console.error('Error:', error);
            });
        }
        assign_text();
        console.log(test_chatgpt);
    }, []);



    function MealCard() {
        return ( 
            <Card variant="outlined" sx={{ maxWidth: 360 }}>
                <Box sx={{ p: 2 }}>
                    <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                    <Typography gutterBottom variant="h5" component="div">
                        Chicken and Rice
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        600 Calories
                    </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Succulent poached white chicken cut into bite-size pieces and served on fragrant rice with some light soy sauce
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    {/* <Typography gutterBottom variant="body2">
                    Select type
                    </Typography> */}
                    <Stack direction="row" spacing={1}>
                    <Chip label="High in Protein" size="small" />
                    <Chip label="Filling" size="small" />
                    </Stack>
                </Box>
            </Card>
        );
    }

    return (
        <div>
            <h1>Your Tailored Diet Plan</h1>
            <p>Based on the information you provided, here's what we recommend:</p>
            {/* Display results here */}
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <p>You burn {bmr} calories from doing nothing. You also burn {energy_cal} from moderate energy activites. This means you can eat {bmr + energy_cal} calories per day without any change in weight.</p>
            <p>You will need a calorie deficit of {in_12_weeks} calories per day to lose {weight - target_weight} pounds in 12 weeks. This means that, if you want to lose weight, you should eat around {bmr + energy_cal + in_12_weeks} calories per day for 12 weeks to lose {weight - target_weight}</p>

            <p>Oh yeah here some's GPT output: {test_chatgpt}</p>
            <MealCard />
        </div>
    );
};

export default ResultPage;
