// Define the interface for the API response
interface NutritionResponse {
  // Define the expected structure of the response JSON here
  // For example:
  name?: string;
  calories?: number;
  fat_total_g?: number;
  // Add more fields based on the API documentation
}

// Actually called API Ninja, I'm lazy.

// Function to fetch nutrition data
export async function fetchNutritionData(query: string): Promise<NutritionResponse> {
  var apiKey = import.meta.env.VITE_NINJA_API_KEY;

  try {
    // Construct the URL with the query parameter
    const url = `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`;

    // Send the GET request with the API key in the headers
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response as JSON
    const data: NutritionResponse = await response.json();

    // Return the data as a dictionary
    return data;
  } catch (error) {
    console.error('Error fetching nutrition data:', error);
    // Handle errors as appropriate for your application
    throw error;
  }
}



