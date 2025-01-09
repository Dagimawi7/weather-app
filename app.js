const axios = require('axios'); // Import Axios library
const readline = require('readline'); // Import readline for user input

// Initialize the user input interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const apiKey = 'f329855f363d4f246a76aa0fdefecb09'; // Your Weatherstack API key

// Function to fetch weather data
const getWeather = async (city) => {
  try {
    // API endpoint with the city and API key
    const response = await axios.get(
      `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
    );

    const data = response.data;

    // Check if the API response contains weather data
    if (data.success === false || !data.current) {
      console.log(`Error: ${data.error.info || 'Unable to fetch weather data.'}`);
      return;
    }

    // Display the weather information
    console.log(`\nWeather in ${data.location.name}, ${data.location.country}:`);
    console.log(`Description: ${data.current.weather_descriptions[0]}`);
    console.log(`Temperature: ${data.current.temperature}°C`);
    console.log(`Feels Like: ${data.current.feelslike}°C`);
    console.log(`Humidity: ${data.current.humidity}%`);
    console.log(`Wind Speed: ${data.current.wind_speed} km/h`);
  } catch (error) {
    // Handle unexpected errors
    console.error('\nError fetching weather data:', error.message);
  }
};

// Prompt user for a city name
rl.question('Enter a city name: ', (city) => {
  getWeather(city.trim()); // Fetch weather data for the entered city
  rl.close(); // Close the input interface
});
