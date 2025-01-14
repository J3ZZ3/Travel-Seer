import React from 'react';

const activities = {
  Clear: [
    "Go hiking",
    "Visit outdoor attractions",
    "Have a picnic",
    "Go sightseeing",
    "Outdoor photography"
  ],
  Clouds: [
    "Visit museums",
    "Walking tour",
    "Shopping",
    "Café hopping",
    "City exploration"
  ],
  Rain: [
    "Visit indoor attractions",
    "Museum tours",
    "Shopping malls",
    "Local cuisine experience",
    "Indoor entertainment"
  ],
  Snow: [
    "Skiing",
    "Snowboarding",
    "Winter photography",
    "Visit warm cafés",
    "Indoor activities"
  ]
};

const ActivityRecommendations = ({ weather }) => {
  if (!weather) return null;

  const getRecommendations = (weatherCondition) => {
    const condition = Object.keys(activities).find(key => 
      weatherCondition.toLowerCase().includes(key.toLowerCase())
    ) || 'Clear';
    return activities[condition];
  };

  return (
    <div className="activity-recommendations">
      <h3>Recommended Activities</h3>
      <ul>
        {getRecommendations(weather.conditions).map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityRecommendations; 