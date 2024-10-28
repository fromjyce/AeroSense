"use client";

import { useEffect, useState } from 'react';

export default function HealthBehaviour() {
  const [aqiData, setAqiData] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [aqiMessages, setAqiMessages] = useState([]);

  useEffect(() => {
    const fetchAQIMessages = async () => {
      try {
        const response = await fetch('/data/aqiMessages.json');
        const data = await response.json();
        setAqiMessages(data.levels);
      } catch (error) {
        console.error("Error fetching AQI messages:", error);
      }
    };

    const fetchAQIData = async (latitude, longitude) => {
      const AQI_FORECAST = `${process.env.NEXT_PUBLIC_AQI_API_URL}?latitude=${latitude}&longitude=${longitude}&hourly=us_aqi&timezone=auto&past_days=1&forecast_days=1`;

      try {
        const response = await fetch(AQI_FORECAST);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        const hourlyData = data.hourly;
        const dailyData = {};

        hourlyData.time.forEach((time, index) => {
          const date = new Date(time).toISOString().split('T')[0];
          if (!dailyData[date]) {
            dailyData[date] = {
              totalAQI: 0,
              count: 0,
            };
          }
          dailyData[date].totalAQI += hourlyData.us_aqi[index];
          dailyData[date].count++;
        });
        const currentDate = new Date().toISOString().split('T')[0];
        const todayAQIData = dailyData[currentDate];

        if (todayAQIData) {
          const aqiDataForToday = {
            aqi: todayAQIData.totalAQI / todayAQIData.count,
          };
          setAqiData(aqiDataForToday);
        }
      } catch (error) {
        console.error('Error fetching AQI data:', error);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchAQIData(latitude, longitude);
          },
          (error) => {
            setLocationError('Unable to retrieve your location. Please ensure location services are enabled.');
          }
        );
      } else {
        setLocationError('Geolocation is not supported by this browser.');
      }
    };

    fetchAQIMessages();
    getLocation();
  }, []);

  const getAQIMessage = (aqi) => {
    if (!aqiMessages.length) return { message: 'Loading...', severity: 'Unknown' };

    const matchingLevel = aqiMessages.find((level) => aqi >= level.aqiRange[0] && aqi <= level.aqiRange[1]);
    return matchingLevel || { message: 'Unknown AQI level', severity: 'Unknown' };
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h3 className="text-3xl font-bold mb-4 oswald_card_title text-center forecast-title">
        Localized Air Quality Index Forecast
      </h3>
      {locationError ? (
        <p className="text-center">{locationError}</p>
      ) : aqiData ? (
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <img
              src="/misc/health.png"
              alt="Air Quality"
              className="h-16 w-auto mx-auto"
            />
          </div>
          <h4 className="text-xl font-semibold poppins">
            {getAQIMessage(aqiData.aqi).severity}
          </h4>
          <p className="mt-2 text-lg josefin_sans">
            {getAQIMessage(aqiData.aqi).message}
          </p>
        </div>
      ) : (
        <p className='josefin_sans text-center'>Loading AQI data...</p>
      )}
    </div>
  );
}
