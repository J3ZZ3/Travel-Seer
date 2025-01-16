import React from "react";
import { FaSwimmer, FaMountain, FaWater, FaSnowflake, FaSkiing, FaGamepad, FaShoppingCart, FaBiking, FaHiking, FaAppleAlt } from 'react-icons/fa';  // Import icons
import '../../styles/activity.css';  // Import CSS

const ActivityRecommendations = ({ weather }) => {
  const activitySuggestions = {
    hot: [
      { name: "Swimming", icon: <FaSwimmer className="activity-icon hot" /> },
      { name: "Beach Day", icon: <FaWater className="activity-icon hot" /> },
      { name: "Outdoor Hiking", icon: <FaMountain className="activity-icon hot" /> },
      { name: "Water Sports", icon: <FaWater className="activity-icon hot" /> },
    ],
    cold: [
      { name: "Skiing", icon: <FaSkiing className="activity-icon cold" /> },
      { name: "Snowboarding", icon: <FaSnowflake className="activity-icon cold" /> },
      { name: "Indoor Activities", icon: <FaGamepad className="activity-icon cold" /> },
      { name: "Hot Chocolate", icon: <FaAppleAlt className="activity-icon cold" /> },
    ],
    rainy: [
      { name: "Museum Visit", icon: <FaShoppingCart className="activity-icon rainy" /> },
      { name: "Indoor Games", icon: <FaGamepad className="activity-icon rainy" /> },
      { name: "Shopping", icon: <FaShoppingCart className="activity-icon rainy" /> },
      { name: "Cooking", icon: <FaAppleAlt className="activity-icon rainy" /> },
    ],
    clear: [
      { name: "Hiking", icon: <FaHiking className="activity-icon clear" /> },
      { name: "Cycling", icon: <FaBiking className="activity-icon clear" /> },
      { name: "Picnic", icon: <FaAppleAlt className="activity-icon clear" /> },
      { name: "Nature Walk", icon: <FaHiking className="activity-icon clear" /> },
    ],
  };

  let recommendedActivities = [];
  if (weather) {
    const weatherCondition = weather.condition.text.toLowerCase();
    if (weatherCondition.includes("hot")) {
      recommendedActivities = activitySuggestions.hot;
    } else if (weatherCondition.includes("cold")) {
      recommendedActivities = activitySuggestions.cold;
    } else if (weatherCondition.includes("rain")) {
      recommendedActivities = activitySuggestions.rainy;
    } else {
      recommendedActivities = activitySuggestions.clear;
    }
  }

  return (
    <div className="recommended-activities-container">
      <h4 className="recommended-activities-header">
        Recommended Activities for This Weather
      </h4>
      <ul className="recommended-activities-list">
        {recommendedActivities.map((activity, index) => (
          <li key={index} className="recommended-activities-item">
            {activity.icon} {activity.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityRecommendations;
