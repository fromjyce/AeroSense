"use client";

import React, { useEffect, useState } from 'react';
import CityAQIWidget from '../../widgets/CityAQIWidget';

export default function MetroAQIWidgetContainer() {
  const [metroCitiesData, setMetroCitiesData] = useState([]);
  const cityDetails = [
    { name: "Kanpur", regionalName: "कानपुर", imagePath: "/cities_icons/kanpur.png" },
    { name: "New Delhi", regionalName: "नई दिल्ली", imagePath: "/cities_icons/delhi.svg" },
    { name: "Ahmedabad", regionalName: "અમદાવાદ", imagePath: "/cities_icons/ahmedabad.svg" },
    { name: "Bengaluru", regionalName: "ಬೆಂಗಳೂರು", imagePath: "/cities_icons/bengaluru.jpg" },
    { name: "Mumbai", regionalName: "मुंबई", imagePath: "/cities_icons/mumbai.png" },
    { name: "Pune", regionalName: "पुणे", imagePath: "/cities_icons/pune.webp" },
    { name: "Chennai", regionalName: "சென்னை", imagePath: "/cities_icons/chennai.webp" },
    { name: "Hyderabad", regionalName: "హైదరాబాద్", imagePath: "/cities_icons/hyderabad.webp" },
    { name: "Kolkata", regionalName: "কলকাতা", imagePath: "/cities_icons/kolkata.jpg" },
    { name: "Jaipur", regionalName: "जयपुर", imagePath: "/cities_icons/jaipur.jpg" },
    { name: "Lucknow", regionalName: "लखनऊ", imagePath: "/cities_icons/lucknow.jpg" },
    { name: "Kochi", regionalName: "കൊച്ചി", imagePath: "/cities_icons/kochi.webp" },
  ];
  const fetchAQIData = async () => {
    try {
      const CITIES_AQI_URL = `${process.env.NEXT_PUBLIC_AQI_API_URL}?latitude=26.4499,28.61,23.0225,12.9789,19.0761,18.5203,13.0825,17.3617,22.5675,26.9000,26.8500,9.9312&longitude=80.3319,77.23,72.5714,77.5917,72.8775,73.8567,80.275,78.4747,88.37,75.8000,80.9500,76.2670&current=us_aqi&timezone=auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto`;
      const response = await fetch(CITIES_AQI_URL);
      const data = await response.json();
      const updatedCityData = cityDetails.map((city, index) => ({
        ...city,
        aqi: data[index]?.current?.us_aqi || "N/A"
      }));

      setMetroCitiesData(updatedCityData);
    } catch (error) {
      console.error("Error fetching AQI data:", error);
    }
  };

  useEffect(() => {
    fetchAQIData();
  }, []);

  return (
    <div className="grid grid-cols-6 grid-rows-2 gap-x-2 gap-y-3">
      {metroCitiesData.map((city, index) => (
        <CityAQIWidget 
          key={index} 
          cityName={city.name} 
          regionalName={city.regionalName} 
          aqiValue={city.aqi} 
          imagePath={city.imagePath} 
        />
      ))}
    </div>
  );
}
