import InfoGaugeContainer from "../elements/results/InfoGaugeContainer";
import BarPieChartContainer from "../elements/results/BarPieChartContainer";

export default function ResultCharts({ stationId, city, datetime, date, startDatetime, endDatetime, startDate, endDate, value, aqi, rangeTrue, chartData }) {
    return (
      <div className="flex h-full gap-x-4">
        <div className="w-[40%]">
        <InfoGaugeContainer 
          stationId={stationId}
          city={city}
          datetime={datetime}
          date={date}
          startDatetime={startDatetime}
          endDatetime={endDatetime}
          startDate={startDate}
          endDate={endDate}
          value={aqi}
        />
        </div>
        <div className="w-[60%] rounded-lg shadow-lg bg-white p-4">
        <BarPieChartContainer rangeTrue={rangeTrue} chartData={chartData} />
        </div>
      </div>
    );
  }
  