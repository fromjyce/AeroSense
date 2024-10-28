import { useEffect } from 'react';

const Map = ({ markers }) => {
  useEffect(() => {
    const loadMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: markers[0].lat, lng: markers[0].lng },
        zoom: 10,
      });

      markers.forEach(marker => {
        new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map: map,
          title: marker.title,
        });
      });
    };

    if (window.google) {
      loadMap();
    } else {
      const script = document.createElement('script');
      script.src = process.env.NEXT_PUBLIC_MAP_DISPLAY_URL;
      script.async = true;
      document.head.appendChild(script);
      window.initMap = loadMap;
    }
  }, [markers]);

  return <div id="map" style={{ width: '100%', height: '100%' }} className='rounded-lg shadow-lg' />;
};

export default Map;
