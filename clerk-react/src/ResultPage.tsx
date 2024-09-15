import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, TextField, Button, Box, Typography, CssBaseline, Chip, Stack, Divider } from '@mui/material';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { ExerciseLevel, calculate_bmr, calorie_delta_goal, energy_delta } from './calorie_math';
import {get_meal_plan, Ingredient, DailyMeals} from './OpenAI';

var first_passed = false;
var breakfast = "loading...";
var lunch = "loading...";
var dinner = "loading...";
var breakfast_ing = "loading...";
var lunch_ing = "loading...";
var dinner_ing = "loading...";
// var text = "Ingredients: ";
// var meal = "loading...";
interface meal_vals {
    cost: number,
    calories: number,
    protein: number,
    fat: number,
    carbs: number
};

var breakfast_vals : meal_vals = {cost: 0, calories: 0, protein: 0, fat: 0, carbs: 0};
var lunch_vals : meal_vals = {cost: 0, calories: 0, protein: 0, fat: 0, carbs: 0};
var dinner_vals : meal_vals = {cost: 0, calories: 0, protein: 0, fat: 0, carbs: 0}; 

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
            get_meal_plan(50, 40, 40, 40).then((result: DailyMeals) => {
                console.log(result);
                
                breakfast_ing = "Ingredients: ";
                
                breakfast = result["breakfast"]["meal"];
                for(const index in result["breakfast"]["ingredients"]) {
                    breakfast_vals.cost += result.breakfast.ingredients[index].cost_usd;
                    breakfast_vals.calories += result.breakfast.ingredients[index].calories;
                    breakfast_vals.protein += result.breakfast.ingredients[index].protein;
                    breakfast_vals.fat += result.breakfast.ingredients[index].fat;
                    breakfast_vals.carbs += result.breakfast.ingredients[index].carbs;

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
                for(const index in result["lunch"]["ingredients"]) {
                    var ingredient: Ingredient = result.lunch.ingredients[index];
                    console.log(ingredient);
                    lunch_vals.cost += ingredient.cost_usd;
                    lunch_vals.calories += ingredient.calories;
                    lunch_vals.protein += ingredient.protein;
                    lunch_vals.fat += ingredient.fat;
                    lunch_vals.carbs += ingredient.carbs;

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
                for(const index in result["dinner"]["ingredients"]) {
                    dinner_vals.cost += result.dinner.ingredients[index].cost_usd;
                    dinner_vals.calories += result.dinner.ingredients[index].calories;
                    dinner_vals.protein += result.dinner.ingredients[index].protein;
                    dinner_vals.fat += result.dinner.ingredients[index].fat;
                    dinner_vals.carbs += result.dinner.ingredients[index].carbs;

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
            var text = breakfast_ing;
            var meal = breakfast;
            var cost = breakfast_vals.cost;
            var calories = breakfast_vals.calories;
            var protein = breakfast_vals.protein;
            var fat = breakfast_vals.fat;
            var carbs = breakfast_vals.carbs;
        } else if(prop.dailymeal == "Lunch") {
            text = lunch_ing;
            meal = lunch;
            cost = lunch_vals.cost;
            calories = lunch_vals.calories;
            protein = lunch_vals.protein;
            fat = lunch_vals.fat;
            carbs = lunch_vals.carbs;
        } else {
            text = dinner_ing;
            meal = dinner;
            cost = dinner_vals.cost;
            calories = dinner_vals.calories;
            protein = dinner_vals.protein;
            fat = dinner_vals.fat;
            carbs = dinner_vals.carbs;
        }

        return ( 
            <Card variant="outlined" sx={{ maxWidth: 360 }}>
                <Box sx={{ p: 2 }}>
                    <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                    <Stack direction="column">
                        <Typography variant="h5" gutterBottom>
                            {meal}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {prop.dailymeal}
                        </Typography>
                    </Stack>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {text}
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        Learn More:
                    </Typography>
                    <Stack direction="column" spacing={1}>
                        <p>Cost: {cost} Dollars</p>
                        <p>Calories: {calories} Calories</p>
                        <p>Protein: {protein} g</p>
                        <p>Fat: {fat} g</p>
                        <p>Carbs: {carbs} g</p>
                    </Stack>
                </Box>
            </Card>
        );
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                background: 'linear-gradient(135deg, #70e1f5 0%, #ffd194 100%)',
                padding: 3,
            }}
        >
            <div>
                <h1>Your Tailored Diet Plan</h1>
                <p>Based on the information you provided, here's what we recommend:</p>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}>
                <MealCard dailymeal="Breakfast"/>
                <MealCard dailymeal="Lunch"/>
                <MealCard dailymeal="Dinner"/>
                </div>
                {/* Display results here */}
                <p>You burn {bmr} calories from doing nothing. You also burn {energy_cal} from moderate energy activites. 
                This means you can eat {bmr + energy_cal} calories per day without any change in weight.</p>
                <p>You will need a calorie deficit of {in_12_weeks} calories per day to lose {weight - target_weight} pounds in 12 weeks. 
                This means that, if you want to lose weight, you should eat around {bmr + energy_cal + in_12_weeks} calories per day for 12 weeks 
                to lose {weight - target_weight} calories</p>
            </div>
        </Box>
    );
};

export default ResultPage;
