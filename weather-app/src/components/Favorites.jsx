import React, { useState } from 'react';
import WeatherDetails from './WeatherDetails';
import HourlyWeather from './HourlyWeather';
import '../styles/Favorites.css';


const Favorites = ({ favorites, onRemove, hourlyData }) => {
  const [expandedCity, setExpandedCity] = useState(null);

  const handleExpand = (cityName) => {
    setExpandedCity(expandedCity === cityName ? null : cityName);
  };

  return (
    <div className="mt-5">
      <h3 className="text-center text-primary mb-4">Città preferite</h3>
      {favorites.length === 0 ? (
        <p className="text-center text-muted">Non hai ancora città preferite.</p>
      ) : (
        <div className="row">
          {favorites.map((city, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{city.name}</h5>
                  {city.current_weather && city.current_weather.temperature !== undefined ? (
                    <p className="temperature-text">{city.current_weather.temperature}°C</p>
                  ) : (
                    <p className="text-muted">Temperatura non disponibile</p>
                  )}

                  <div className="btn-group w-100">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onRemove(city.name)}
                    >
                      Eliminare
                    </button>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleExpand(city.name)}
                    >
                      {expandedCity === city.name ? 'Chiudi' : 'Vedere i dettagli'}
                    </button>
                  </div>
                </div>
              </div>
              {expandedCity === city.name && (
                <div className="expanded-card">
                  <button className="close-btn" onClick={() => setExpandedCity(null)}>×</button>
                  <div className="expanded-content">
                    <WeatherDetails 
                    weatherData={city} 
                    onAddFavorite={() => {}} 
                    onClose={() => setExpandedCity(null)} />
                    <HourlyWeather 
                    hourlyData={hourlyData} 
                    isVisible={expandedCity === city.name} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
