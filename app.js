const axios = require('axios');
const readline = require('readline');

// Initialize the user input interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const apiKey = 'f329855f363d4f246a76aa0fdefecb09'; // Replace with your Weatherstack API key

// Function to fetch weather data
const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(
      `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
    );
    return response.data;
  } catch (error) {
    console.error('\nError fetching weather data:', error.message);
    return null;
  }
};

// Function to display weather data
const displayWeather = (data) => {
  if (data.success === false || !data.current) {
    console.log(`Error: ${data.error.info || 'Unable to fetch weather data.'}`);
    return;
  }

  console.log(`\nWeather in ${data.location.name}, ${data.location.country}:`);
  console.log(`Description: ${data.current.weather_descriptions[0]}`);
  console.log(`Temperature: ${data.current.temperature}°C`);
  console.log(`Feels Like: ${data.current.feelslike}°C`);
  console.log(`Humidity: ${data.current.humidity}%`);
  console.log(`Wind Speed: ${data.current.wind_speed} km/h`);
};

// Main function to get and display weather
const getWeather = async (city) => {
  const data = await fetchWeatherData(city);
  if (data) {
    displayWeather(data);
  }
};

// Prompt for user input and allow multiple searches
const promptForCity = () => {
  rl.question('Enter a city name (or type "exit" to quit): ', (city) => {
    if (city.trim().toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
    } else if (!city.trim()) {
      console.log('Please enter a valid city name.');
      promptForCity(); // Ask again if input is empty
    } else {
      getWeather(city.trim());
      promptForCity(); // Ask for the next city
    }
  });
};

// Start the loop
promptForCity();
