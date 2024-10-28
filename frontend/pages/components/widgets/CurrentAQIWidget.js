import React from 'react';

const getAqiInfo = (aqi) => {
  if (aqi <= 50) return { color: "#00b050" };
  if (aqi <= 100) return { color: "#92d050" };
  if (aqi <= 200) return { color: "#FFE000" };
  if (aqi <= 300) return { color: "#ffc000" };
  if (aqi <= 400) return { color: "#f60000" };
  return { color: "#c00000" };
};

const getTransportationAdvice = (aqi) => {
  if (aqi <= 50) {
    return {
      trainText: "Great to Ride",
      flightText: "Excellent Choice",
      carText: "Perfect to Drive",
      trainColor: "#3BB06F",
      flightColor: "#3BB06F",
      carColor: "#3BB06F",
    };
  }
  if (aqi <= 100) {
    return {
      trainText: "Good to Travel",
      flightText: "Safe to Fly",
      carText: "Okay to Drive",
      trainColor: "#5CD14F",
      flightColor: "#5CD14F",
      carColor: "#5CD14F",
    };
  }
  if (aqi <= 200) {
    return {
      trainText: "Caution Recommended",
      flightText: "Consider Your Options",
      carText: "Drive Carefully",
      trainColor: "#FFA400",
      flightColor: "#FFA400",
      carColor: "#FFA400",
    };
  }
  if (aqi <= 300) {
    return {
      trainText: "Travel with Care",
      flightText: "Best to Rethink",
      carText: "Think Before You Go",
      trainColor: "#FF7900",
      flightColor: "#FF7900",
      carColor: "#FF7900",
    };
  }
  if (aqi <= 400) {
    return {
      trainText: "Avoid Traveling",
      flightText: "Not Safe to Fly",
      carText: "Stay Home if Possible",
      trainColor: "#f60000",
      flightColor: "#f60000",
      carColor: "#f60000",
    };
  }
  return {
    trainText: "Hazardous",
    flightText: "Discouraged",
    carText: "Unsafe",
    trainColor: "#c00000",
    flightColor: "#c00000",
    carColor: "#c00000",
  };
};

export default function CurrentAQIWidget({ date, aqi, pm2Concentration }) {
  const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
  const numericDay = new Date(date).getDate();
  const month = new Date(date).toLocaleDateString('en-US', { month: 'short' });
  const { color } = getAqiInfo(aqi);
  const currentDate = new Date().toISOString().split('T')[0];
  const widgetDate = new Date(date).toISOString().split('T')[0];
  const backgroundColor = widgetDate === currentDate ? "#F9F6EE" : "#ffffff";
  const { trainText, flightText, carText, trainColor, flightColor, carColor } = getTransportationAdvice(aqi);

  return (
    <div
      className="current-aqi-widget shadow-lg rounded-lg p-4 flex"
      style={{ backgroundColor: backgroundColor, flexWrap: 'wrap', maxWidth: '600px' }}
    >
      <div className="left-side flex flex-col items-center justify-center text-center" style={{ flex: '1 1 auto', marginRight: '10px' }}>
        <p className="font-bold current-date poppins">
          {day}, {month} {numericDay}
        </p>
        <p className="text-6xl font-bold mt-2 bebas_neue" style={{ color: color }}>
          {aqi}
        </p>
        <p className="current-concentration josefin_sans mt-2">PM2.5: {pm2Concentration}</p>
      </div>
      <div className="right-side flex flex-col justify-center items-center">
        <h3 className="font-bold text-lg right-side-title poppins">Smart Travel Decisions</h3>
        <ul className="right-list">
          <li className="flex items-center">
            <img src="/misc/car.png" alt="Car Icon" className="icon" />
            <span className="transportation-text josefin_sans">
              Car: <span style={{ color: carColor }}>{carText}</span>
            </span>
          </li>
          <li className="flex items-center">
            <img src="/misc/train.png" alt="Train Icon" className="icon" />
            <span className="transportation-text josefin_sans">
              Train: <span style={{ color: trainColor }}>{trainText}</span>
            </span>
          </li>
          <li className="flex items-center">
            <img src="/misc/flight.png" alt="Flight Icon" className="icon" />
            <span className="transportation-text josefin_sans">
              Flight: <span style={{ color: flightColor }}>{flightText}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
