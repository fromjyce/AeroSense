import React, { useEffect, useState } from 'react';

export default function FestivalWidget({ festivalName, date }) {
    const [aqi, setAqi] = useState(null);

    useEffect(() => {
        const fetchAqi = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_FESTIVALS_AQI_URL}`
                );
                const data = await response.json();
                const aqiData = getAqiForDate(data.hourly, date);
                setAqi(aqiData);
            } catch (error) {
                console.error('Error fetching AQI:', error);
            }
        };

        fetchAqi();
    }, [date]);

    const getAqiForDate = (hourlyData, festivalDate) => {
        const targetDate = new Date(festivalDate).toISOString().split('T')[0];
        const aqiForDay = hourlyData.time.reduce((acc, time, index) => {
            if (time.startsWith(targetDate)) {
                acc.push(hourlyData.us_aqi[index]);
            }
            return acc;
        }, []);
        return aqiForDay.length > 0 ? (aqiForDay.reduce((a, b) => a + b, 0) / aqiForDay.length).toFixed(0) : null;
    };

    const getAqiInfo = (aqi) => {
        if (aqi <= 50) return { color: "#00b050" };
        if (aqi <= 100) return { color: "#92d050" };
        if (aqi <= 200) return { color: "#FFE000" };
        if (aqi <= 300) return { color: "#ffc000" };
        if (aqi <= 400) return { color: "#f60000" };
        return { color: "#c00000" };
    };

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options);
    };

    return (
        <div className="festival-widget p-3 shadow-lg rounded-lg bg-white">
            <div className="festival-name flex font-bold mb-2 poppins items-center justify-between">
                {festivalName} <span style={aqi ? getAqiInfo(aqi) : { color: 'black' }}>
                    {aqi ? ` AQI: ${aqi}` : ' No Forecast'}
                </span>
            </div>
            <div className="festival-date poppins">
            <span>{formatDate(date)}</span>
            </div>
        </div>
    );
}
