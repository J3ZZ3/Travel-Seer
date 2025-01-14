import React from 'react';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return <p>No weather data available</p>;

  return (
    <div className="weather-card">
      <h3>Current Weather</h3>
      <div className="weather-info">
        <p>Temperature: {weatherData.temp}°C</p>
        <p>Humidity: {weatherData.humidity}%</p>
        <p>Wind Speed: {weatherData.windSpeed} m/s</p>
        <p>Conditions: {weatherData.conditions}</p>
      </div>
    </div>
  );
};

export default WeatherCard;