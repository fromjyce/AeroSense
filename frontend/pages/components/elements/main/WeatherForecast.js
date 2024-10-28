import CurrentWeather from "./CurrentWeather";
import WidgetContainer from "./WidgetContainer";


export default function WeatherForecast() {

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
      <h3 className="text-3xl font-bold mb-4 oswald_card_title">Weather Forecast</h3>
      </div>
        <div className="flex justify-between border-b h-[35%] ">
          <CurrentWeather />
        </div>
        <div className="grid grid-cols gap-4 items-center flex-grow">
          <WidgetContainer />
        </div>
      </div>
    </>
  );
}
