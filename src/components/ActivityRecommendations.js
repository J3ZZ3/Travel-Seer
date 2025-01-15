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

  useEffect(() => {
    const fetchImage = async (activity) => {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(activity)}`, {
        headers: {
          Authorization: 'RsO5Ju0JVUEXoVC3EtsCUzK4UNfB69uyiHNCWm0eX75gxCFe7GX6JxXi' // Replace with your Pexels API key
        }
      });
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        setImageUrl(data.photos[0].src.original); // Get the first image
      }
    };

    if (weather) {
      const recommendations = getRecommendations(weather.conditions);
      const randomActivity = recommendations[Math.floor(Math.random() * recommendations.length)]; // Select a random activity
      fetchImage(randomActivity); // Fetch image for the random activity
    }
  }, [weather]); // Run effect when weather changes

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