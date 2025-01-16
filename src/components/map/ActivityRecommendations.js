import React from "react";
import '../../styles/activity.css';  // Import the CSS file

const ActivityRecommendations = ({ weather }) => {
  const activitySuggestions = {
    hot: ["Swimming", "Beach Day", "Outdoor Hiking", "Water Sports"],
    cold: ["Skiing", "Snowboarding", "Indoor Activities", "Hot Chocolate"],
    rainy: ["Museum Visit", "Indoor Games", "Shopping", "Cooking"],
    clear: ["Hiking", "Cycling", "Picnic", "Nature Walk"],
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
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityRecommendations;
