"use client";

import React, { useEffect, useState } from 'react';
import WeatherWidget from "../../widgets/WeatherWidget";

export default function WidgetContainer() {
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const DAYS_WEATHER_URL = `${process.env.NEXT_PUBLIC_WEATHER_FORECAST_API_URL}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=6`;
        const response = await fetch(DAYS_WEATHER_URL);
        const data = await response.json();
        const currentDate = new Date().toISOString().split('T')[0];
        const filteredWeather = data.daily.time
          .map((date, index) => ({
            date,
            maxTemp: data.daily.temperature_2m_max[index],
            minTemp: data.daily.temperature_2m_min[index],
          }))
          .filter(item => item.date !== currentDate)
          .slice(0, 7);
        
        setWeatherData(filteredWeather);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-between items-center gap-2 p-1">
      {weatherData.map((weather) => (
        <WeatherWidget
          key={weather.date}
          date={weather.date}
          maxTemp={weather.maxTemp}
          minTemp={weather.minTemp}
        />
      ))}
    </div>
  );
}
