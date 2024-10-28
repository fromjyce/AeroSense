"use client";

import Head from "next/head";
import Link from "next/link";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import MapSuggRules from "./components/results/MapSuggRules";
import ResultCharts from "./components/results/ResultCharts";
import { useEffect, useState } from 'react';

export default function Results() {
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');

    if (data) {
      const parsedData = JSON.parse(decodeURIComponent(data));
      setResultData(parsedData);
      console.log('Result Data:', parsedData);
    }
  }, []);

  const {
    stationId = null,
    city = null,
    datetime = null,
    date = null,
    startDatetime = null,
    endDatetime = null,
    startDate = null,
    endDate = null,
    aqi = null, 
    rangeTrue = null,
    chartData = null
  } = resultData || {};

  return (
    <>
      <Head>
        <title>Aerosense - Results</title>
        <meta name="description" content="View AQI predictions and strategies to stay ahead." />
      </Head>
      <div className="results-section h-screen flex flex-col px-4 sm:px-6 md:px-8">
        <div className="flex justify-center items-center h-16 sm:h-20 mb-4">
          <h1 className="results-title text-center text-2xl sm:text-3xl md:text-4xl font-bold questrial">
            Stay Ahead: AQI Predictions & Strategies
          </h1>
        </div>
            <div className="top-section h-[50%] sm:h-[55%] md:h-[60%] mb-4 sm:mb-6">
              <ResultCharts 
                stationId={stationId}
                city={city}
                datetime={datetime}
                date={date}
                startDatetime={startDatetime}
                endDatetime={endDatetime}
                startDate={startDate}
                endDate={endDate}
                aqi={aqi}
                rangeTrue = {rangeTrue}
                chartData={chartData}
              />
            </div>
            <div className="bottom-section h-[40%] sm:h-[35%] md:h-[40%] mb-4 sm:mb-6">
            <MapSuggRules 
            city={city}
            stationId={stationId}
            aqi={aqi}
          />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <Link href="/#predict" passHref>
                  <button 
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center mr-2 sm:mr-4 back-button" 
                    aria-label="Go back to prediction"
                  >
                    <ArrowCircleLeftOutlinedIcon className="w-6 sm:w-8 h-6 sm:h-8" />
                  </button>
                </Link>
                <span className="text-lg sm:text-xl questrial predict-text">Try Predicting Again?</span>
              </div>
              <span className="text-lg sm:text-xl questrial small-tag-line">Predicting a Cleaner Tomorrow.</span>
            </div>
      </div>
    </>
  );
}
