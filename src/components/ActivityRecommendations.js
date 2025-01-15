import React, { useEffect, useState } from 'react';

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
  const [imageUrl, setImageUrl] = useState('');

  const getRecommendations = (weatherCondition) => {
    const condition = Object.keys(activities).find(key =>
      weatherCondition.toLowerCase().includes(key.toLowerCase())
    ) || 'Clear';
    return activities[condition];
  };

  useEffect(() => {
    const fetchImage = async () => {
      if (!weather) return;

      const recommendations = getRecommendations(weather.conditions);
      const activityQuery = recommendations[0] || 'outdoor activities';

      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(activityQuery)}`,
          {
            headers: {
              Authorization: 'your pexels api key' 
            }
          }
        );
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          setImageUrl(data.photos[0].src.original);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [weather]);

  if (!weather) return null;

  return (
    <div className="activity-recommendations">
      <h3>Recommended Activities</h3>
      {imageUrl && <img src={imageUrl} alt="Activity" style={{ width: '100%', borderRadius: '8px' }} />}
      <ul>
        {getRecommendations(weather.conditions).map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityRecommendations;
