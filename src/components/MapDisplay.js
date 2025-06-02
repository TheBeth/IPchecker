import React from 'react';
import { MapContainer, Popup, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import iconLocate from '../asset/image/icon-location.svg';
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet's CSS is included
import { INITIAL_MAP_ZOOM_WITH_LOCATION, DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '../constants';

function MapDisplay({ locationData }) {
  const mapIcon = L.icon({
    iconUrl: iconLocate,
    iconSize: [33, 40],
    iconAnchor: [12, 12], // Adjusted anchor based on typical icon design
    popupAnchor: [0, -10], // Adjusted popup anchor
  });

  // Use locationData.lat and locationData.lon for the marker and map center if available

  // Determine position and zoom based on locationData
  const isValidLocation = locationData && typeof locationData.lat !== 'undefined' && typeof locationData.lon !== 'undefined';
  const position = isValidLocation ? [locationData.lat, locationData.lon] : DEFAULT_MAP_CENTER;
  const zoomLevel = isValidLocation ? INITIAL_MAP_ZOOM_WITH_LOCATION : DEFAULT_MAP_ZOOM;

  // Conditional rendering based on valid location, or always render with default if preferred.
  // For this task, maintaining the original behavior: only render if valid location.
  if (!isValidLocation) {
    return null;
  }

  return (
    <div className='lower-page'>
      <MapContainer
        center={position} // Center map on the new location or default
        zoom={zoomLevel} // Zoom in a bit more for a single marker, or default
        style={{ width: '100vw', height: '65vh', zIndex: '0' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=WhudaG1AvZgpeFPYlf14"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        <ZoomControl position='bottomright' />
        <Marker position={position} icon={mapIcon}>
          <Popup>
            {locationData.regionName || 'N/A'} <br />
            {locationData.query || 'N/A'} <br />
            {locationData.isp || 'N/A'}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapDisplay;
