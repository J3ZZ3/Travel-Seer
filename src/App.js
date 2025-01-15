import React, { useState, useEffect } from 'react';
import WeatherCard from "./components/WeatherCard";
import ActivityRecommendations from "./components/ActivityRecommendations";
import { getWeatherData } from "./services/weatherService";
import "./styles/App.css";
import MapView from './components/MapView';

const App = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!location) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const weather = await getWeatherData(location);
      setWeatherData(weather);
      setCoordinates(weather.coordinates);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (!favorites.includes(location)) {
      setFavorites([...favorites, location]);
    }
  };

  useEffect(() => {
  }, [location]);

  return (
    <div className="app-container">
      <h1>Weather-Based Travel Planner</h1>
      
      <div className="main-content">
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Enter a location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="button" onClick={fetchData}>
            Search Location
          </button>
          <button className="button" onClick={addToFavorites}>
            Add to Favorites
          </button>
        </div>

        {error && <div className="error">{error}</div>}
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="content-section">
            <div className="map-section">
              <h2>Location Map</h2>
              <MapView location={location} coordinates={coordinates} />
            </div>

            <div className="sidebar">
              {weatherData && (
                <>
                  <WeatherCard weatherData={weatherData.current} />
                  <ActivityRecommendations weather={weatherData.current} />
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="favorites-section">
        <h2>Favorites</h2>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((fav, index) => (
              <li key={index} onClick={() => setLocation(fav)} style={{cursor: 'pointer'}}>
                {fav}
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorites added yet</p>
        )}
      </div>
    </div>
  );
};

export default App;