import React from 'react';
import { FaCloud, FaSun, FaCloudRain, FaCloudSunRain, FaSnowflake } from 'react-icons/fa';
import '../styles/HourlyWeather.css';

const HourlyWeather = ({ hourlyData, isVisible }) => {
  if (!isVisible || !hourlyData.length) return null;

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case 0:
        return <FaSun />;
      case 1:
      case 2:
      case 3:
        return <FaCloudSunRain />;
      case 45:
      case 48:
        return <FaCloud />;
      case 51:
      case 53:
      case 55:
        return <FaCloudRain />;
      case 56:
      case 57:
        return <FaSnowflake />;
      default:
        return <FaCloud />;
    }
  };

  return (
    <div className="hourly-weather-background">
      <div className="hourly-weather-container">
        <h3>Meteo nelle prossime 24 ore</h3>
        <div className="hourly-weather-list">
          {hourlyData.map((item, index) => (
            <div key={index} className="hourly-weather-item">
              <div className="hour">
                {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="temperature">{item.temperature}°C</div>
              <div className="weather-icon">{getWeatherIcon(item.weatherCode)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyWeather;
