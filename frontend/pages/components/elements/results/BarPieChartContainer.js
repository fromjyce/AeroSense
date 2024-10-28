"use client";
import { useState, useEffect } from 'react';
import BarChartContainer from "../../widgets/BarChartContainer";
import PieChartContainer from "../../widgets/PieChartContainer";
import PollutantDetails from './PollutantDetails';

export default function BarPieChartContainer({ rangeTrue, chartData }) {
  const [selectedPollutant, setSelectedPollutant] = useState('');

  useEffect(() => {
    const primaryPollutant = chartData.reduce((max, pollutant) => 
      pollutant.value > max.value ? pollutant : max, chartData[0]
    );
    setSelectedPollutant(primaryPollutant.label);
  }, [chartData]);

  return (
    <div>
      <h2 className="text-2xl font-semibold oswald gauge-project-text mb-8">
        Air Quality Pollutant Analysis
      </h2>
      <div className="flex">
        <div className="w-2/3">
          {rangeTrue ? (
            <BarChartContainer data={chartData} />
          ) : (
            <PieChartContainer data={chartData} />
          )}
        </div>
        <div className="w-1/3 pollutant-paragraph">
          {selectedPollutant && (
            <PollutantDetails pollutant={selectedPollutant} />
          )}
        </div>
      </div>
    </div>
  );
}