'use client';

import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import L from 'leaflet';


const Map = () => {
  const mapRef = useRef(null);
  const socket = useRef(null);
  const map = useRef(null); // Keep track of the map instance

  useEffect(() => {
    // Set default icon paths
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/marker-icon-2x.png',
      iconUrl: '/marker-icon.png',
      shadowUrl: '/marker-shadow.png',
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        if (!map.current) {
          // Initialize the map only once
          map.current = L.map(mapRef.current).setView([latitude, longitude], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
          }).addTo(map.current);

          L.marker([latitude, longitude])
            .addTo(map.current)
            .bindPopup('You are here.')
            .openPopup();

          socket.current = io();  // Connect to the Socket.io server

          socket.current.emit('send-location', { latitude, longitude });

          socket.current.on('receive-location', (data) => {
            const { id, latitude, longitude } = data;
            map.current.setView([latitude, longitude], 16);
          });
        }
      });
    }
  }, []);

  return <div id="map" ref={mapRef} style={{ height: '100vh', width: '100%' }}></div>;
};

export default Map;
