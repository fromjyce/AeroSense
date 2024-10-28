import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import PropTypes from 'prop-types';
import { useDrawingArea } from '@mui/x-charts/hooks';

const colors = [
  '#007f4e',
  '#72b043',
  '#b5be2f',
  '#f8cc1b',
  '#f6a020',
  '#f37324',
  '#ae311e',
  '#711415',
];

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <>
      <text
        style={{ fontSize: '18px', fontWeight: 'bold', fill: '#666' }}
        x={left + width / 2}
        y={primaryY}
        textAnchor="middle"
      >
        {primaryText}
      </text>
      <text
        style={{ fontSize: '15px', fill: '#999' }}
        x={left + width / 2}
        y={secondaryY}
        textAnchor="middle"
      >
        {secondaryText}
      </text>
    </>
  );
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

export default function PieChartContainer({ data }) {
  const maxDataItem = data.reduce((prev, current) => (prev.value > current.value ? prev : current), data[0]);
  return (
    <div className='piechart-con questrial'>
      <PieChart
        colors={colors}
        margin={{
          left: 70,
          right: 0,
          top: 0,
          bottom: 100,
        }}
        series={[
          {
            data,
            innerRadius: 74,
            outerRadius: 100,
            highlightScope: { faded: 'global', highlighted: 'item' },
            paddingAngle: 0,
            animation: { duration: 1000, easing: 'ease-in-out' },
          },
        ]}
        height={300}
        width={300}
        slotProps={{
            legend: { hidden: true },
          }}
          className='main-piechart'
      >
        <PieCenterLabel primaryText={maxDataItem.label} secondaryText="Primary Pollutant" />
      </PieChart>
    </div>
  );
}