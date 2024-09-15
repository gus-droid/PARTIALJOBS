import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, TextField, Button, Box, Typography, CssBaseline, Chip, Stack, Divider } from '@mui/material';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { ExerciseLevel, calculate_bmr, calorie_delta_goal, energy_delta } from './calorie_math';
import {get_meal_plan} from './OpenAI';

var first_passed = false;
var breakfast = "loading...";
var lunch = "loading...";
var dinner = "loading...";
var breakfast_ing = "loading...";
var lunch_ing = "loading...";
var dinner_ing = "loading...";
var text = "Ingredients: ";
var meal = "loading...";

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

    
    var [switchval, setSwitch] = useState(true);

    useEffect(() => {
        async function update_text() {
            get_meal_plan(40, 40, 40).then((result) => {
                
                console.log("running")
                breakfast_ing = "Ingredients: ";
                
                breakfast = result["breakfast"]["meal"];
                console.log(result["breakfast"]["meal"]);
                console.log(breakfast);
                for(const index in result["breakfast"]["ingredients"]) {
                    if (first_passed == false) {
                        first_passed = true;
                        var ingredient = result.breakfast.ingredients[index].quantity + " " + result.breakfast.ingredients[index].name;
                        breakfast_ing += ingredient;
                        continue;
                    }
                    ingredient = ", " + result.breakfast.ingredients[index].quantity + " " + result.breakfast.ingredients[index].name;
                    breakfast_ing += ingredient;
                }
                first_passed = false;

                lunch_ing = "Ingredients: ";
                lunch = result["lunch"]["meal"];
                console.log(result["lunch"]["meal"]);
                for(const index in result["lunch"]["ingredients"]) {
                    if (first_passed == false) {
                        first_passed = true;
                        ingredient = result.lunch.ingredients[index].quantity + " " + result.lunch.ingredients[index].name;
                        lunch_ing += ingredient;
                        continue;
                    }
                    ingredient = ", " + result.lunch.ingredients[index].quantity + " " + result.lunch.ingredients[index].name;
                    lunch_ing += ingredient;
                }
                first_passed = false;

                dinner_ing = "Ingredients: ";
                dinner = result["dinner"]["meal"];
                console.log(result["dinner"]["meal"]);
                for(const index in result["dinner"]["ingredients"]) {
                    if (first_passed == false) {
                        first_passed = true;
                        ingredient = result.dinner.ingredients[index].quantity + " " + result.dinner.ingredients[index].name;
                        dinner_ing += ingredient;
                        continue;
                    }
                    ingredient = ", " + result.dinner.ingredients[index].quantity + " " + result.dinner.ingredients[index].name;
                    dinner_ing += ingredient;
                }

                setSwitch(!switchval)

            }).catch((error) => {
                console.error('Error:', error);
            });
        }
        update_text();
    }, []);




    function MealCard(prop) {

        
        if(prop.dailymeal == "Breakfast") {
            text = breakfast_ing;
            meal = breakfast;
        } else if(prop.dailymeal == "Lunch") {
            text = lunch_ing;
            meal = lunch;
        } else {
            text = dinner_ing;
            meal = dinner;
        }

        return ( 
            <Card variant="outlined" sx={{ maxWidth: 360 }}>
                <Box sx={{ p: 2 }}>
                    <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                    <Typography gutterBottom variant="h4" component="div">
                        {meal}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {prop.dailymeal}
                    </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {text}
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        Learn More
                    </Typography>
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

            <p>Oh yeah here some's GPT output: {switchval}</p>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
            <MealCard dailymeal="Breakfast"/>
            <MealCard dailymeal="Lunch"/>
            <MealCard dailymeal="Dinner"/>
            </div>
        </div>
    );
};

export default ResultPage;
