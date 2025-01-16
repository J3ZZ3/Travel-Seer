import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link component for navigation

import ActivityRecommendations from "./../components/map/ActivityRecommendations";
import '../styles/LandStyle.css';

const credentials = require("./../components/config/credentials.json");

const LandingPage = () => {
  const [travelList, setTravelList] = useState([]);
  const [filteredTravel, setFilteredTravel] = useState([]);
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [locationCoordinates, setLocationCoordinates] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const response = await fetch("https://travel-back-end-test.onrender.com/api/travel");
        if (!response.ok) throw new Error("Failed to fetch travel data.");
        const data = await response.json();
        setTravelList(data);
        setFilteredTravel(data);
      } catch (error) {
        console.error("Error fetching travel data:", error.message);
      }
    };
    fetchTravel();
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${credentials.apiKey}&q=${cityName}&days=1&aqi=no&alerts=no`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data.");
      const data = await response.json();
      setWeatherInfo(data.current);
      setForecast(data.forecast.forecastday[0].day);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  const fetchLocationCoordinates = async (location) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`
      );
      if (!response.ok) throw new Error("Failed to fetch coordinates.");
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setLocationCoordinates({ lat, lon });
      }
    } catch (error) {
      console.error("Error fetching location coordinates:", error.message);
    }
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedTravel(null);
    setWeatherInfo(null);
    setForecast(null);
  };

  const handleViewMore = (travel) => {
    setSelectedTravel(travel);
    setShowDetailsModal(true);
    fetchWeather(travel.destination);
    fetchLocationCoordinates(travel.destination);
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="landing-page">
      <div className="header-container">
        <h1 className="website-name">Bambo<Badge bg="success">o</Badge></h1>
        <h1 className="heads">Explore Travel Destinations</h1>
        <Button className="get-started-button" onClick={() => navigate("/home")}>
          Get Started
        </Button>
      </div>

      {/* Travel Cards */}
      <div className="travel-cards-container">
        {filteredTravel.slice(0, visibleCount).map((travel) => (
          <div key={travel.id} className="travel-card">
            <img src={travel.photo} alt="Destination" className="travel-image" />
            <div className="travel-details">
              <h2>{travel.destination}</h2>
              <p className="desctext">
                <strong>Description:</strong> {travel.description}
              </p>
              <Button
                className="purple"
                bsPrefix="custom-button"
                onClick={() => handleViewMore(travel)}
              >
                View More
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredTravel.length && (
        <div className="load-more-container">
          <Button variant="primary" onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}

      {/* Details Modal */}
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTravel?.destination}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="desctext">
            <strong>Description:</strong> {selectedTravel?.description}
          </p>

          {/* Weather Information */}
          <div className="weather-display">
            <h5>Weather Information</h5>
            <p>{weatherInfo ? `${weatherInfo.condition.text}` : "Loading weather..."}</p>
            {forecast && (
              <div>
                <p>
                  <strong>Rain Chance:</strong> {forecast.daily_chance_of_rain}%
                </p>
                <p>
                  <strong>Wind Speed:</strong> {weatherInfo.wind_kph} kph
                </p>
                <p>
                  <strong>Temperature:</strong> {weatherInfo.temp_c}°C
                </p>
              </div>
            )}
          </div>

          {/* Link to See More */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Link to="/home" className="see-more-link">
              See More Destinations
            </Link>
          </div>

          {/* Activity Recommendations */}
          <div style={{ marginTop: "20px" }}>
            <ActivityRecommendations weather={weatherInfo} />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LandingPage;
