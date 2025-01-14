import axios from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHERAPI_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeatherData = async (location) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(location)}&aqi=no`
    );

    const { current, location: locationData } = response.data;

    return {
      coordinates: { 
        lat: locationData.lat, 
        lon: locationData.lon 
      },
      current: {
        temp: Math.round(current.temp_c),
        humidity: current.humidity,
        windSpeed: current.wind_kph,
        conditions: current.condition.text,
        description: current.condition.text,
      }
    };
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your WeatherAPI key.');
    }
    console.error('Error fetching weather data:', error);
    throw new Error(error.response?.data?.error?.message || 'Error fetching weather data');
  }
}; 