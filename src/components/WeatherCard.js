import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake, faWind } from '@fortawesome/free-solid-svg-icons';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return <p>No weather data available</p>;

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <FontAwesomeIcon icon={faSun} />;
      case 'cloudy':
        return <FontAwesomeIcon icon={faCloud} />;
      case 'rain':
        return <FontAwesomeIcon icon={faCloudRain} />;
      case 'snow':
        return <FontAwesomeIcon icon={faSnowflake} />;
      case 'wind':
        return <FontAwesomeIcon icon={faWind} />;
      default:
        return null;
    }
  };

  return (
    <div className="weather-card">
      <h3>Current Weather</h3>
      <div className="weather-info">
        <p>Temperature: {weatherData.temp}°C {getWeatherIcon(weatherData.conditions)}</p>
        <p>Humidity: {weatherData.humidity}%</p>
        <p>Wind Speed: {weatherData.windSpeed} m/s</p>
        <p>Conditions: {weatherData.conditions} {getWeatherIcon(weatherData.conditions)}</p>
      </div>
    </div>
  );
};

export default WeatherCard;