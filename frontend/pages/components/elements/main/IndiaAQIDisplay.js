"use client";

import React, { useEffect, useState } from 'react';
import { IoReloadCircle } from "react-icons/io5";
import IconButton from '@mui/material/IconButton';

export default function IndiaAQIDisplay() {
  const [aqiData, setAqiData] = useState({
    aqi: null,
    pm25: null,
    pm10: null,
    co: null,
  });

  const fetchAqiData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_INDIA_AQI_URL);
      const data = await response.json();
      if (data.status === "ok") {
        const { aqi, iaqi } = data.data;
        setAqiData({
          aqi: aqi,
          pm25: iaqi.pm25 ? iaqi.pm25.v : null,
          pm10: iaqi.pm10 ? iaqi.pm10.v : null,
          co: iaqi.co ? iaqi.co.v : null,
        });
      }
    } catch (error) {
      console.error("Error fetching AQI data:", error);
    }
  };

  useEffect(() => {
    fetchAqiData();
  }, []);

  const handleReload = () => {
    fetchAqiData();
  };

  const getAqiInfo = (aqi) => {
    if (aqi <= 50) return { category: "Good", color: "#00b050", textColor: "#32B000" };
    if (aqi <= 100) return { category: "Satisfactory", color: "#92d050", textColor: "#4FD171" };
    if (aqi <= 200) return { category: "Moderate", color: "#FFE000", textColor: "#FFC200" };
    if (aqi <= 300) return { category: "Poor", color: "#ffc000", textColor: "#FFA000" };
    if (aqi <= 400) return { category: "Very Poor", color: "#f60000", textColor: "#F52B00" };
    return { category: "Severe", color: "#c00000", textColor: "#BF2100" };
  };

  const aqiInfo = getAqiInfo(aqiData.aqi);

  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4">
      <div className='flex flex-row items-center justify-center gap-5'>
        <div className="flex flex-col items-center">
          <h2 className="text-7xl font-bold bebas_neue" style={{ color: aqiInfo.color }}>
            {aqiData.aqi !== null ? aqiData.aqi : <span className="josefin_sans loading-text">Loading...</span>}
          </h2>
          <p className="text-xl questrial" style={{ color: aqiInfo.textColor }}>
            {aqiData.aqi !== null ? aqiInfo.category : <span className="josefin_sans loading-text">Loading...</span>}
          </p>
        </div>
        <div className='flex flex-row items-center gap-2'>
          <img src="/misc/india.png" alt="Air Quality Icon" className="india-icon" />
          <p className='font-bold poppins text-lg india-name'>India</p>
        </div>
      </div>

      <div className="flex flex-row items-center gap-3 mt-8">
        <div className='flex flex-col concentration-lists mr-9'>
          <p className="josefin_sans">PM2.5: {aqiData.pm25 !== null ? `${aqiData.pm25} µg/m³` : <span className="josefin_sans loading-text">Loading...</span>}</p>
          <p className="josefin_sans">PM10: {aqiData.pm10 !== null ? `${aqiData.pm10} µg/m³` : <span className="josefin_sans loading-text">Loading...</span>}</p>
          <p className="josefin_sans">CO: {aqiData.co !== null ? `${aqiData.co} µg/m³` : <span className="josefin_sans loading-text">Loading...</span>}</p>
        </div>
        <div>
          <IconButton aria-label="reload" className="icon-button" onClick={handleReload}>
            <IoReloadCircle className="reload-icon-aqi" />
          </IconButton>
        </div>
      </div>
      <div className='flex flex-row items-center justify-center gap-4 mt-8'>
        <div className="flex flex-col items-center justify-center">
          <img src="/misc/dept_2.png" alt="Air Quality Icon" className="dept-cpcb-icon" />
        </div>
        <p className='josefin_sans cpcb-name'>Central Pollution Control Board, India</p>
      </div>
    </div>
  );
}