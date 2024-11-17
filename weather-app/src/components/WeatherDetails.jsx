import React from 'react';
import '../styles/WeatherDetails.css';

const WeatherDetails = ({ weatherData, onAddFavorite, onClose, isVisible }) => {
  if (!isVisible || !weatherData) return null; 

  const { name, current_weather,latitude, longitude, } = weatherData;

  return (
    <div className="weather-details-container">
      
      <button
        className="btn-close"
        aria-label="Cerrar"
        onClick={onClose}
      ></button>

      <div className="card">
        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Lat: {latitude.toFixed(2)}, Lon: {longitude.toFixed(2)}
          </h6>

          <div className="d-flex justify-content-center align-items-center mt-3">
            <div>
              <h1 className="display-4 mb-0">{current_weather.temperature}°C</h1>
              <p className="text-muted">Temperatura attuale</p>
            </div>
          </div>

          <div className="mt-3">
            <p className="mb-1">
              <strong>Velocità del vento:</strong> {current_weather.windspeed} km/h
            </p>
            <p>
              <strong>Direzione del vento:</strong> {current_weather.winddirection}°
            </p>
          </div>

          <button
            className="btn btn-success mt-3"
            onClick={() => onAddFavorite(weatherData)}
          >
            Aggiungi ai preferiti
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default WeatherDetails;


