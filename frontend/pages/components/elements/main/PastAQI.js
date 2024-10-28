"use client";

import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import CurrentAQIWidget from '../../widgets/CurrentAQIWidget';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import styles from './PastAQICarousel.module.css';

export default function PastAQI() {
  const [aqiData, setAqiData] = useState([]);
  const [locationError, setLocationError] = useState('');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, slidesToScroll: 1, });

  useEffect(() => {
    const fetchAQIData = async (latitude, longitude) => {
      try {
        const AQI_FORECAST = `${process.env.NEXT_PUBLIC_AQI_API_URL}?latitude=${latitude}&longitude=${longitude}&hourly=us_aqi,pm2_5&timezone=auto&past_days=2&forecast_days=5`;
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
              totalPM2_5: 0,
              count: 0,
            };
          }
          dailyData[date].totalAQI += hourlyData.us_aqi[index];
          dailyData[date].totalPM2_5 += hourlyData.pm2_5[index];
          dailyData[date].count++;
        });

        const pastAQIData = Object.keys(dailyData).map((date) => ({
          date: date,
          aqi: dailyData[date].totalAQI / dailyData[date].count,
          pm2Concentration: dailyData[date].totalPM2_5 / dailyData[date].count,
        }));

        setAqiData(pastAQIData);
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

    getLocation();
  }, []);

  useEffect(() => {
    if (emblaApi && aqiData.length > 0) {
      emblaApi.reInit();
    }
  }, [emblaApi, aqiData]);

  return (
    <div className="carousel-container">
      <h3 className="text-3xl font-bold mb-4 oswald_card_title text-center forecast-title">
      Localized Air Quality Index Forecast
      </h3>

      {locationError && <p className="text-red-500 text-center">{locationError}</p>}

      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {aqiData.map((item, index) => (
            <div className={styles.embla__slide} key={index}>
              <CurrentAQIWidget
                date={item.date}
                aqi={item.aqi.toFixed(0)}
                pm2Concentration={item.pm2Concentration.toFixed(1)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.embla__buttons}>
        <button
          onClick={() => emblaApi && emblaApi.scrollPrev()}
          className={styles.iconButton}
        >
          <ArrowCircleUpIcon style={{ transform: 'rotate(-90deg)', fontSize: '42px' }} />
        </button>
        <button
          onClick={() => emblaApi && emblaApi.scrollNext()}
          className={styles.iconButton}
        >
          <ArrowCircleUpIcon style={{ transform: 'rotate(90deg)', fontSize: '42px' }} />
        </button>
      </div>
    </div>
  );
}
