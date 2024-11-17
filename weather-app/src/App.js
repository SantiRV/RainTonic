import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx';
import WeatherDetails from './components/WeatherDetails.jsx';
import Favorites from './components/Favorites.jsx';
import HourlyWeather from './components/HourlyWeather.jsx';
import Header from './components/Header.jsx';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [isWeatherDetailsOpen, setIsWeatherDetailsOpen] = useState(false); 

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const sortedFavorites = sortFavoritesByTemperature(savedFavorites);
    setFavorites(sortedFavorites);
  }, []);
  

  const handleSearch = async (city) => {
    try {
      const geocodingResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geocodingData = await geocodingResponse.json();

      if (geocodingData.results && geocodingData.results.length > 0) {
        const { latitude, longitude, name } = geocodingData.results[0];

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();

        const hourlyResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode`
        );
        const hourlyData = await hourlyResponse.json();

        setWeatherData({ ...weatherData, name });
        setHourlyData(
          hourlyData.hourly.time.slice(0, 24).map((time, index) => ({
            time,
            temperature: hourlyData.hourly.temperature_2m[index],
            weatherCode: hourlyData.hourly.weathercode[index],
          }))
        );
        setIsWeatherDetailsOpen(true); 
      } else {
        console.error('Città non trovata');
      }
    } catch (error) {
      console.error('Errore durante la ricerca del meteo:', error);
    }
  };

  const handleCloseWeatherDetails = () => {
    setIsWeatherDetailsOpen(false); 
  };

  const sortFavoritesByTemperature = (favorites) => {
    return favorites.sort((a, b) => {
      const tempA = a.current_weather?.temperature || 0;
      const tempB = b.current_weather?.temperature || 0;
      return tempA - tempB;
    });
  };
  

  const addFavorite = (cityData) => {
    const newFavorite = {
      name: cityData.name,
      current_weather: cityData.current_weather, 
      hourlyData: hourlyData, 
    };
  
    const updatedFavorites = [...favorites, newFavorite];
    const sortedFavorites = sortFavoritesByTemperature(updatedFavorites);
  
    setFavorites(sortedFavorites);
    localStorage.setItem('favorites', JSON.stringify(sortedFavorites));
  };
  
  

  const removeFavorite = (cityName) => {
    const updatedFavorites = favorites.filter((fav) => fav.name !== cityName);
    const sortedFavorites = sortFavoritesByTemperature(updatedFavorites);
  
    setFavorites(sortedFavorites);
    localStorage.setItem('favorites', JSON.stringify(sortedFavorites));
  };
  
  return (
    <div className="app">
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <SearchBar onSearch={handleSearch} />
            <WeatherDetails
              weatherData={weatherData}
              onAddFavorite={addFavorite}
              onClose={handleCloseWeatherDetails}
              isVisible={isWeatherDetailsOpen}
            />
            <HourlyWeather hourlyData={hourlyData} isVisible={isWeatherDetailsOpen} />
          </div>
        </div>
        <Favorites 
        favorites={favorites} 
        onRemove={removeFavorite} 
        hourlyData={hourlyData} 
        weatherData={weatherData} />
      </div>
    </div>
  );
};

export default App;
