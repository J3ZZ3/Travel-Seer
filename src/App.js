import React, { useState } from "react";

const MapImageAPIs = () => {
  const [location, setLocation] = useState("New York");

  const [hereMapImage, setHereMapImage] = useState("");

  const HERE_API_KEY = process.env.REACT_APP_HERE_API_KEY;

 

  const fetchHereMapImage = async () => {
    const url = `https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${HERE_API_KEY}&c=${location}&z=14&w=400&h=400`;
    setHereMapImage(url);
  };

  const handleFetchImages = () => {
    fetchHereMapImage();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Map Image API Tester</h1>
      <input
        type="text"
        placeholder="Enter a location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "300px" }}
      />
      <br />
      <button onClick={handleFetchImages} style={{ padding: "10px 20px", margin: "10px" }}>
        Fetch Images
      </button>

      <div>
        <h2>HERE Map Image</h2>
        {hereMapImage ? <img src={hereMapImage} alt="HERE Map" /> : <p>No image available</p>}
      </div>
    </div>
  );
};

export default MapImageAPIs;