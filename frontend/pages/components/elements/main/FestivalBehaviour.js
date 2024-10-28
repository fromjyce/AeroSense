"use client";
import { useEffect, useState } from 'react';
import FestivalWidget from '../../widgets/FestivalWidget';

export default function FestivalBehaviour() {
  const [festivals, setFestivals] = useState([]);
  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7);
  
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  }
  
  const apiUrl = `${process.env.NEXT_PUBLIC_FESTIVALS_API_URL}&timeMin=${formatDate(today)}T00:00:00Z&timeMax=${formatDate(sevenDaysLater)}T23:59:59Z`;

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          setFestivals(data.items);
        }
      })
      .catch(error => console.error('Error fetching festival data:', error));
  }, [apiUrl]);

  return (
    <div>
      <h3 className="text-3xl font-bold oswald_card_title text-center forecast-title">
        Festival Air Quality Forecast
      </h3>
      <div className="festival-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {festivals.map(festival => (
          <FestivalWidget 
            key={festival.id} 
            festivalName={festival.summary} 
            date={festival.start.date} 
          />
        ))}
      </div>
    </div>
  );
}
