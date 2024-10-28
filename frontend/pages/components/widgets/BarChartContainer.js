"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import { Poppins } from "next/font/google";
import { useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function BarChartContainer({ chartData }) {
  const colorPalette = ['#4caf50', '#ff9800', '#f44336'];
  const [tickPlacement, setTickPlacement] = useState('middle');
  const [tickLabelPlacement, setTickLabelPlacement] = useState('middle');
  const customFont = {
    fontFamily: poppins.style.fontFamily,
    fontSize: '14px',
    fontWeight: 500,
  };

  const labels = chartData.map(item => item.label); 
  const values = chartData.map(item => item.value); 

  return (
    <div>
      <BarChart
        borderRadius={9}
        colors={colorPalette}
        xAxis={[
          {
            scaleType: 'band',
            categoryGapRatio: 0.3,
            data: labels,
            label: 'Pollutants',
            labelStyle: customFont,
            labelPlacement: 'below',
            tickPlacement,
            tickLabelPlacement,
          },
        ]}
        series={[
          {
            id: 'pollutants',
            label: 'Pollutant Levels',
            data: values,
            stack: 'A',
          },
        ]}
        width={500}
        height={300}
        margin={{ left: 120, right: 20, top: 10, bottom: 50 }}
        grid={{ horizontal: false }}
        slotProps={{
          legend: {
            hidden: true,
          },
          xAxis: {
            tickStyle: customFont,
            labelPlacement: 'below',
          },
          yAxis: {
            tickStyle: customFont,
            labelStyle: customFont,
          },
          tooltip: {
            style: customFont,
          },
        }}
      />
    </div>
  );
}
