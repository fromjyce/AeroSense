'use client';

import React from 'react';
import Map from '../../widgets/GoogleMap';

const MapContainer = ({ markers }) => {
  return (
    <div className="h-full w-full rounded-lg shadow-lg">
      <Map markers={markers} />
    </div>
  );
};

export default MapContainer;
