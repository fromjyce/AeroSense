"use client";

import { useState, useEffect } from "react";
import { IoReloadCircle } from "react-icons/io5";
import IconButton from '@mui/material/IconButton';

export default function CurrentWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const fetchWeatherData = async (lat, lon) => {
    const FIFTEEN_MIN_UPDATE_URL = `${process.env.NEXT_PUBLIC_WEATHER_FORECAST_API_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,wind_speed_10m&timezone=auto&past_days=3&forecast_days=3`;
    setLoading(true);
    try {
      const response = await fetch(FIFTEEN_MIN_UPDATE_URL);
      const data = await response.json();
      setWeatherData(data.current);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setLocationError("Error getting location");
          console.error("Error getting location:", error);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeatherData(latitude, longitude);
    } else {
      getLocation();
    }
  }, [latitude, longitude]);

  const handleReload = () => {
    if (latitude && longitude) {
      fetchWeatherData(latitude, longitude);
    } else {
      getLocation();
    }
  };

  if (loading) {
    return <p className="josefin_sans fetch-line font-bold">Fetching...</p>;
  }

  if (locationError) {
    return <p>{locationError}</p>;
  }

  const isDay = weatherData?.is_day === 1;
  const imageUrl = isDay ? "/misc/day.png" : "/misc/night.png";

  const date = new Date(weatherData?.time);
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = date.toLocaleDateString(undefined, options).replace(/(\w+day)/, '$1,');

  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace('am', 'AM').replace('pm', 'PM');

  return (
    <div className="flex items-center justify-between p-3 space-x-4">
      <div className="flex-shrink-0 weather-image-container">
        <img src={imageUrl} alt={isDay ? "Morning" : "Night"} className="weather-image" />
      </div>

      <div className="flex-grow text-center">
        <p className="font-bold bebas_neue display-big-temp">{weatherData?.temperature_2m}°C</p>
      </div>

      <div className="font-bold flex-grow text-left space-y-1 josefin_sans display-props">
        <p>Humidity: {weatherData?.relative_humidity_2m}%</p>
        <p>Precipitation: {weatherData?.precipitation} mm</p>
        <p>Wind Speed: {weatherData?.wind_speed_10m} km/h</p>
      </div>
      
      <div className="flex flex-row flex-shrink-0 text-right imd-date-box p-2">
        <div className="font-bold flex flex-col">
          <p className="display-time-text josefin_sans">{formattedDate}</p>
          <p className="display-time-text josefin_sans">
            Last Updated: 
            <span className="ml-1">
              {formattedTime}
            </span>
          </p>
          <div className="ml-auto">
            <IconButton aria-label="reload" className="icon-button" onClick={handleReload}>
              <IoReloadCircle className="reload-icon" />
            </IconButton>
          </div>
        </div>
        <div className="flex-shrink-0">
          <img src="/misc/dept_1.png" alt="Weather Icon" className="dept-display-1" />
        </div>
      </div>
    </div>
  );
}
