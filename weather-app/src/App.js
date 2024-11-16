import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx';
import WeatherDetails from './components/WeatherDetails.jsx';
import Favorites from './components/Favorites.jsx';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
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

        setWeatherData({ ...weatherData, name, latitude, longitude });
      } else {
        console.log('Ciudad no encontrada');
      }
    } catch (error) {
      console.error('Error al buscar el clima:', error);
    }
  };

  const addFavorite = (city) => {
    if (!favorites.some((fav) => fav.name === city.name)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFavorite = (cityName) => {
    const updatedFavorites = favorites.filter((fav) => fav.name !== cityName);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Weather App</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <SearchBar onSearch={handleSearch} />
          <WeatherDetails
            weatherData={weatherData}
            onAddFavorite={addFavorite}
          />
          <Favorites favorites={favorites} onRemove={removeFavorite} />
        </div>
      </div>
    </div>
  );
};

export default App;


