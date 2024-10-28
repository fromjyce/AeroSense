import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import GaugeContainer from "./GaugeContainer";
import InfoDisplay from "./InfoDisplay";

export default function InfoGaugeContainer({ 
  stationId, 
  city, 
  datetime, 
  date, 
  startDatetime, 
  endDatetime, 
  startDate, 
  endDate, 
  value
}) {
  const [stationName, setStationName] = useState("");
  const [cityState, setCityState] = useState("");

  useEffect(() => {
    Papa.parse("/dataset/city_data.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const cityStateData = result.data.find(item => item.City === city);
        if (cityStateData) {
          setCityState(`${cityStateData.City}, ${cityStateData.State}`);
        }
      }
    });
    Papa.parse("/dataset/stations_data.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const stationData = result.data.find(item => item.StationId === stationId);
        if (stationData) {
          setStationName(stationData.StationName);
        }
      }
    });
  }, [city, stationId]);

  return (
    <div className="flex flex-col h-full gap-y-4">
      <div className="h-[30%] rounded-lg shadow-lg bg-white">
        <InfoDisplay 
          date={date} 
          datetime={datetime} 
          city={cityState}
          stationName={stationName}
          startDate={startDate} 
          endDate={endDate} 
          startDatetime={startDatetime} 
          endDatetime={endDatetime} 
        />
      </div>
      <div className="rounded-lg shadow-lg bg-white">
        <div className="h-[70%] gauge-main-container p-4">
          <GaugeContainer value={value} />
        </div>
      </div>
    </div>
  );
}
