import React, { useState, useEffect } from 'react';
import WeatherCard from "../components/WeatherCard";
import ActivityRecommendations from "../components/ActivityRecommendations";
import { getWeatherData } from "../services/weatherService";
import "../styles/home.css";
import MapView from '../components/MapView';
import { getCurrentUser, logout } from '../services/authService';
import { addFavorite, getFavorites } from '../services/favoriteService';
import Login from './Login';
import Register from './Register';

const App = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(getCurrentUser());
  const [showRegister, setShowRegister] = useState(false);

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

  const loadFavorites = async () => {
    try {
      const userFavorites = await getFavorites();
      setFavorites(userFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setFavorites([]);
  };

  const handleAddToFavorites = async () => {
    if (!user) {
      setError('Please login to add favorites');
      return;
    }

    try {
      await addFavorite(location, coordinates);
      await loadFavorites();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to add favorite');
    }
  };

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="auth-container">
        {showRegister ? (
          <Register onRegisterSuccess={() => setShowRegister(false)} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? 'Switch to Login' : 'Switch to Register'}
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>Weather-Based Travel Planner</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      
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
          <button className="button" onClick={handleAddToFavorites}>
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
            {favorites.map((fav) => (
              <li 
                key={fav._id} 
                onClick={() => setLocation(fav.location)} 
                style={{cursor: 'pointer'}}
              >
                {fav.location}
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