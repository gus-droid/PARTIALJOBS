import OpenAI from 'openai';
import {fetchNutritionData} from './NutritionNinja';



// Define an interface for an ingredient
interface Ingredient {
  name: string;        // Name of the ingredient
  quantity: string;    // Quantity by unit (e.g., "1 cup", "200 grams")
  cost_usd: number;    // Cost in USD
  calories: number;    // Calories in the ingredient
  protein: number;     // Protein content in grams
  fat: number;     // Total fat in grams
  carbs: number;     // Total carbs in grams
}

// Define an interface for a meal (breakfast, lunch, dinner)
interface Meal {
  meal: string;               // Name of the meal
  ingredients: Ingredient[];  // List of ingredients
}

// Define the overall structure
interface DailyMeals {
  breakfast: Meal;  // Details for breakfast
  lunch: Meal;      // Details for lunch
  dinner: Meal;     // Details for dinner
}








export async function get_meal_plan(carbs: number, protein: number, fat: number): DailyMeals {
  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role: 'user', content: `I have 60 dollars on food I can spend for today, and I need a daily caloric intake that needs to be exactly 1900 calories per day. Design 3 different meals that I can eat today that have at least ${protein} grams of protein in total. List all ingredients used and their cost and calories. If you are unsure of a meal or ingredient's number, give a reasonable estimate. Respond in the following: JSON format without talking.

{ 
  "breakfast": {
    "meal": "[name of meal]",
    "ingredients": [
      {
        "name": "[name of ingredient]",
        "quantity": "[by unit]",
        "cost_usd": 1.00,
        "calories": 100,
        "protein": 10
      },
      ...
    ],
  }
 "lunch": { ... },
 "dinner": { ... }
}` }],
    model: 'gpt-3.5-turbo',
  };
  const chatCompletion_: OpenAI.Chat.ChatCompletion = await client.chat.completions.create(params);

  const data = JSON.parse(chatCompletion_.choices[0].message.content);


  // Correct data with NutritionNinja
  for(const index in data["breakfast"]["ingredients"]) {
    var ingredient = data.breakfast.ingredients[index];
      var ingredient_name = ingredient.name;
      var ingredient_amount = ingredient.quantity;
      var prompt = ingredient_amount + " of " + ingredient_name;

      var corrected_data = await fetchNutritionData(prompt);
      ingredient.protein = corrected_data.items[0].protein_g;
      ingredient.fat = corrected_data.items[0].fat_total_g;
      ingredient.carbs = corrected_data.items[0].carbohydrates_total_g;
    }
  for(const index in data["lunch"]["ingredients"]) {
    var ingredient = data.lunch.ingredients[index];
      var ingredient_name = ingredient.name;
      var ingredient_amount = ingredient.quantity;
      var prompt = ingredient_amount + " of " + ingredient_name;

      var corrected_data = await fetchNutritionData(prompt);
      ingredient.protein = corrected_data.items[0].protein_g;
      ingredient.fat = corrected_data.items[0].fat_total_g;
      ingredient.carbs = corrected_data.items[0].carbohydrates_total_g;
    }
  for(const index in data["dinner"]["ingredients"]) {
    var ingredient = data.dinner.ingredients[index];
      var ingredient_name = ingredient.name;
      var ingredient_amount = ingredient.quantity;
      var prompt = ingredient_amount + " of " + ingredient_name;

      var corrected_data = await fetchNutritionData(prompt);
      ingredient.protein = corrected_data.items[0].protein_g;
      ingredient.fat = corrected_data.items[0].fat_total_g;
      ingredient.carbs = corrected_data.items[0].carbohydrates_total_g;
    }
  

  return data;
}







