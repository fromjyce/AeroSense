import PredictCard from "../elements/main/PredictCard";
import CitiesAQIWidgetContainer from "../elements/main/CitiesAQIWidgetContainer";

export default function Dashboard() {
  return (
    <div className="dashboard-section flex flex-col lg:flex-row justify-between gap-4 md:gap-8 p-4 md:p-8">
      <div id="predict" className="first-card w-full lg:w-[32%] p-4 shadow-lg flex flex-col items-start">
        <PredictCard />
      </div>

      <div className="second-card w-full lg:w-[68%] p-4 shadow-lg flex flex-col items-start justify-center">
        <CitiesAQIWidgetContainer />
      </div>
    </div>
  );
}
