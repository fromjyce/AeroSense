import PastAQI from '../elements/main/PastAQI';
import FestivalBehaviour from '../elements/main/FestivalBehaviour';
import HealthBehaviour from '../elements/main/HealthBehaviour';

export default function Forecast() {
  return (
    <div className="px-8">
      <div className="flex justify-between gap-x-4">
        <div className="aqi-forecast-container w-[40%] pr-4 rounded-lg shadow-lg">
          <PastAQI />
        </div>
        <div className="healthcare-behaviour-container w-[30%] pl-4 rounded-lg shadow-lg">
        <HealthBehaviour />
        </div>
        <div className="festival-behaviour-container w-[30%] pl-4 rounded-lg shadow-lg">
        <FestivalBehaviour />
        </div>
      </div>
    </div>
  );
}
