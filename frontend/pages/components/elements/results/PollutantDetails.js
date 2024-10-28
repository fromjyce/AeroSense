import React, { useState } from 'react';

const pollutantInfo = {
  PM2_5: {
    causes: ['Construction Dust', 'Road Dust', 'Industrial Emissions', 'Vehicle Exhaust'],
    sideEffects: [
      'Aggravation of respiratory disease',
      'Increased risk of lung infections',
      'Fatigue',
      'Coughing and throat irritation',
    ],
    remedies: [
      'Wear N95 masks in high-pollution areas',
      'Use air purifiers indoors',
      'Stay hydrated to reduce irritation',
      'Limit outdoor activities during high pollution periods',
    ],
  },
  PM10: {
    causes: ['Construction Sites', 'Unpaved Roads', 'Burning of Agricultural Waste'],
    sideEffects: [
      'Worsened asthma symptoms',
      'Lung and eye irritation',
      'Shortness of breath',
    ],
    remedies: [
      'Avoid outdoor activities in areas with dust exposure',
      'Use saline nasal sprays to ease nasal irritation',
      'Close windows to prevent outdoor dust from entering',
    ],
  },
  NO2: {
    causes: ['Vehicle Exhaust', 'Power Plants', 'Industrial Combustion'],
    sideEffects: [
      'Exacerbation of asthma',
      'Irritation of the respiratory system',
      'Increased risk of respiratory infections',
    ],
    remedies: [
      'Use air purifiers with activated carbon filters',
      'Avoid exercising near roads with heavy traffic',
      'Ensure proper ventilation in indoor spaces',
    ],
  },
};

export default function PollutantDetails({ pollutant }) {
  const [activeTab, setActiveTab] = useState('causes');
  const details = pollutantInfo[pollutant];

  if (!details) {
    return <p>Information not available for this pollutant.</p>;
  }

  return (
    <div className="pollutant-details p-4 max-h-80 overflow-y-auto border border-gray-300 rounded-lg shadow-lg">
      <div>
        <div className="flex justify-around mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'causes' ? 'bg-[#073414] text-white poppins' : 'bg-gray-200 poppins'}`}
            onClick={() => setActiveTab('causes')}
          >
            Causes
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'sideEffects' ? 'bg-[#073414] text-white poppins' : 'bg-gray-200 poppins'}`}
            onClick={() => setActiveTab('sideEffects')}
          >
            Side Effects
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'remedies' ? 'bg-[#073414] text-white poppins' : 'bg-gray-200 poppins'}`}
            onClick={() => setActiveTab('remedies')}
          >
            Remedies
          </button>
        </div>
        {activeTab === 'causes' && (
          <div>
            <h4 className="text-lg font-semibold poppins">Causes:</h4>
            <ul className="list-disc list-inside josefin_sans">
              {details.causes.map((cause, index) => (
                <li key={index}>{cause}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'sideEffects' && (
          <div>
            <h4 className="text-lg font-semibold poppins">Possible Side Effects:</h4>
            <ul className="list-disc list-inside josefin_sans">
              {details.sideEffects.map((effect, index) => (
                <li key={index}>{effect}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'remedies' && (
          <div>
            <h4 className="text-lg font-semibold poppins">Remedies:</h4>
            <ul className="list-disc list-inside josefin_sans">
              {details.remedies.map((remedy, index) => (
                <li key={index}>{remedy}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
