import IndiaAQIDisplay from "./IndiaAQIDisplay";
import MetroAQIWidgetContainer from "./MetroAQIWidgetContainer";

export default function CitiesAQIWidgetContainer() {
  return (
    <><h3 className="text-3xl md:text-3xl lg:text-3xl font-bold mb-4 oswald_card_title">
    Metro Cities - Air Quality Index
  </h3>
    <div className="flex flex-row h-full align-items items-center">
      <div className="first-half flex-shrink-0">
        <IndiaAQIDisplay />
      </div>
      <div className="second-half flex-grow ml-3">
        <MetroAQIWidgetContainer />
      </div>
    </div>
    </>
  );
}
