import React from 'react';
import '../styles/WeatherDetails.css';


const WeatherDetails = ({ weatherData, onAddFavorite }) => {
  if (!weatherData) {
    return null; 
  }

  const { name, latitude, longitude, current_weather } = weatherData;

  return (
    <div className="card mt-4 shadow-sm">
      <div className="card-body text-center">
        <h5 className="card-title text-primary">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Lat: {latitude.toFixed(2)}, Lon: {longitude.toFixed(2)}
        </h6>
        <div className="d-flex justify-content-center align-items-center mt-3">
          <div>
            <h1 className="display-4 mb-0">{current_weather.temperature}°C</h1>
            <p className="text-muted">Temperatura actual</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="mb-1">
            <strong>Velocidad del viento:</strong> {current_weather.windspeed} km/h
          </p>
          <p>
            <strong>Dirección del viento:</strong> {current_weather.winddirection}°
          </p>
        </div>
        
        <button
          className="btn btn-success mt-3"
          onClick={() => onAddFavorite(weatherData)}  
        >
          Agregar a favoritos
        </button>
      </div>
    </div>
  );
};

export default WeatherDetails;
