import OpenAI from "openai";
import { fetchNutritionData } from "./NutritionNinja";

// Define an interface for an ingredient
export interface Ingredient {
  name: string; // Name of the ingredient
  quantity: string; // Quantity by unit (e.g., "1 cup", "200 grams")
  cost_usd: number; // Cost in USD
  calories: number; // Calories in the ingredient
  protein: number; // Protein content in grams
  fat: number; // Total fat in grams
  carbs: number; // Total carbs in grams
}

// Define an interface for a meal (breakfast, lunch, dinner)
interface Meal {
  meal: string; // Name of the meal
  ingredients: Ingredient[]; // List of ingredients
}

// Define the overall structure
export interface DailyMeals {
  breakfast: Meal; // Details for breakfast
  lunch: Meal; // Details for lunch
  dinner: Meal; // Details for dinner
}

export async function get_meal_plan(
 
  daily_budget: number,
  calorie_target: number,
  negatives: string,
  preferences: string
): DailyMeals {
  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  var params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      {
        role: "user",
        content: `I have ${daily_budget} dollars on food I can spend for today, and I need a daily caloric intake that needs to be near ${calorie_target} calories per day. List all ingredients used and their cost and calories. If you are unsure of a meal or ingredient's number, give a reasonable estimate. 

In addition, please make accomodations to never include ${negatives} as ingredients. This is very serious, and it could cause the life or death of someone as these are allergies.

However, please make accomodations to make sure you include ${preferences} as ingredients.

Respond in the following: JSON format without talking and with no markdown, just plain text.

{ 
  "breakfast": {
    "meal": "[name of meal]",
    "ingredients": [
      {
        "name": "[name of ingredient]",
        "quantity": "[by unit]",
        "cost_usd": 1.00,
        "calories": 100
      },
      ...
    ],
  }
 "lunch": { ... },
 "dinner": { ... }
}`,
      },
    ],
    model: "gpt-4o",
  };
  var chatCompletion_: OpenAI.Chat.ChatCompletion =
    await client.chat.completions.create(params);

  const previous_data = chatCompletion_.choices[0].message.content;

  const data = JSON.parse(previous_data);

  // Correct data with NutritionNinja
  const times = ["breakfast", "lunch", "dinner"];

    for (const index in data["breakfast"]["ingredients"]) {
    var ingredient = data["breakfast"].ingredients[index];
    var ingredient_name = ingredient.name;
    var ingredient_amount = ingredient.quantity;
    var prompt = ingredient_amount + " of " + ingredient_name;

    var corrected_data = await fetchNutritionData(prompt);
    ingredient.protein = corrected_data.items[0].protein_g;
    ingredient.fat = corrected_data.items[0].fat_total_g;
    ingredient.carbs = corrected_data.items[0].carbohydrates_total_g;

    }


    for (const index in data["lunch"]["ingredients"]) {
    var ingredient = data["lunch"].ingredients[index];
    var ingredient_name = ingredient.name;
    var ingredient_amount = ingredient.quantity;
    var prompt = ingredient_amount + " of " + ingredient_name;

    var corrected_data = await fetchNutritionData(prompt);
    ingredient.protein = corrected_data.items[0].protein_g;
    ingredient.fat = corrected_data.items[0].fat_total_g;
    ingredient.carbs = corrected_data.items[0].carbohydrates_total_g;

    }


    for (const index in data["dinner"]["ingredients"]) {
        var ingredient = data["dinner"].ingredients[index];
        var ingredient_name = ingredient.name;
        var ingredient_amount = ingredient.quantity;
        var prompt = ingredient_amount + " of " + ingredient_name;

        var corrected_data = await fetchNutritionData(prompt);
        ingredient.protein = corrected_data.items[0].protein_g;
        ingredient.fat = corrected_data.items[0].fat_total_g;
        ingredient.carbs = corrected_data.items[0].carbohydrates_total_g;

    }



  console.log(data);

  return data;
}
