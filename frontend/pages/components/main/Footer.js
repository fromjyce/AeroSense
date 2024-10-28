import Simulator from "../elements/main/Simulator";
import WeatherForecast from "../elements/main/WeatherForecast";

export default function Footer() {
  return (
    <div className="footer-section flex justify-between gap-8 p-8">
      <div id="simulate" className="first-card-footer p-4 shadow-lg flex flex-col items-start">
      <Simulator />
      </div>

      <div className="second-card-footer p-4 shadow-lg flex flex-col items-start justify-center">
      <WeatherForecast/>
      </div>
    </div>
  );
}
