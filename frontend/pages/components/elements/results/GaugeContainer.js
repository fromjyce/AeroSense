'use client';
import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

export default function GaugeContainer({ value }) {
  const getAQIMessage = (value) => {
    if (value <= 50) {
      return `Good: Minimal impact on health.`;
    } else if (value <= 100) {
      return `Moderate: Breathing discomfort for sensitive groups.`;
    } else if (value <= 200) {
      return `Poor: Breathing discomfort for everyone.`;
    } else if (value <= 300) {
      return `Very Poor: Respiratory illness risks for the population.`;
    } else if (value <= 400) {
      return `Severe: Serious health effects for all.`;
    } else {
      return `Beyond scale: Extreme health effects for all.`;
    }
  };

  const aqiMessage = getAQIMessage(value);

  return (
    <div className="grid grid-cols-2">
      <div className="text-left">
        <h2 className="text-2xl font-bold oswald gauge-project-text mb-2">Projected AQI Levels</h2>
        <p className="font-bold poppins mb-1 aqi-level-message">{aqiMessage}</p>
        <p className="poppins mb-1">Predicted by our advanced machine learning model, powered by Intel Software.</p>
        <p className="poppins">This AQI value complies with the <a href="https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fcpcb.nic.in%2Fupload%2Fnational-air-quality-index%2FAQI-Calculator.xls&wdOrigin=BROWSELINK" target="_blank" rel="noopener noreferrer" className="cpcb-text-link font-bold">Central Pollution Control Board, India</a> guidelines for air quality calculation.</p>
      </div>
      <div>
        <GaugeComponent
          value={value}
          type="radial"
          minValue={0}
          className="main-gauge josefin_sans flex"
          maxValue={400}
          style={{ top: '0', bottom: '0', left: '0', right: '0' }}
          labels={{
            tickLabels: {
              type: "inner",
              ticks: [
                { value: 0, valueConfig: { style: { fill: "#36454F" } }, lineConfig: { color: "#36454F" } },
                { value: 50, valueConfig: { style: { fill: "#36454F" } }, lineConfig: { color: "#36454F" } },
                { value: 100, valueConfig: { style: { fill: "#36454F" } }, lineConfig: { color: "#36454F" } },
                { value: 200, valueConfig: { style: { fill: "#36454F" } }, lineConfig: { color: "#36454F" } },
                { value: 300, valueConfig: { style: { fill: "#36454F" } }, lineConfig: { color: "#36454F" } },
                { value: 400, valueConfig: { style: { fill: "#36454F" } }, lineConfig: { color: "#36454F" } },
              ]
            },
            valueLabel: {
              formatTextValue: (value) => `${value}`,
              style: { fill: "#1B1212" }
            }
          }}
          arc={{
            colorArray: ['#00b050', '#92d050', '#ff8000', '#ffc000'],
            subArcs: [
              { limit: 50 },   
              { limit: 100 },  
              { limit: 200 },  
              { limit: 300 }, 
              { limit: 400 }
            ],
          }}
          pointer={{
            elastic: true,
            animationDelay: 0,
          }}
        />
      </div>
    </div>
  );
}
