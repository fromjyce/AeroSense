export default function WeatherWidget({ date, maxTemp, minTemp }) {
  const weatherDate = new Date(date);
  const options = { weekday: 'short' };
  const day = weatherDate.toLocaleDateString('en-US', options);
  const dateNum = weatherDate.getDate();

  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg temp-widget"> 
      <p className="day-name questrial">{day}</p>
      <p className="text-7xl font-bold bebas_neue date-num">{dateNum}</p>
      <p className="questrial">
        <span className="max-temp">{maxTemp}°</span> / <span className="min-temp">{minTemp}°</span>
      </p>
    </div>
  );
}
