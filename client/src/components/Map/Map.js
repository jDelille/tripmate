import React, {useState, useRef, useCallback} from 'react'
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;



function Map(params) {


 const [viewport, setViewport] = useState({
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 8
});

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic29ja2xvcmQiLCJhIjoiY2t5ZjRza2x1MGlqeDJucnNoMTFleDc1cCJ9.FIzfyIV5X_ff2zE-CnJLoA'

const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
   (newViewport) => {
     const geocoderDefaultOverrides = { transitionDuration: 1000 };

     return handleViewportChange({
       ...newViewport,
       ...geocoderDefaultOverrides
     });
   },
   [handleViewportChange]
 );
 return (
  <div style={{ height: "100vh" }}>
  <MapGL
    ref={mapRef}
    {...viewport}
    width="100%"
    height="100%"
    onViewportChange={handleViewportChange}
    mapboxApiAccessToken={MAPBOX_TOKEN}
    mapStyle="mapbox://styles/socklord/ckyf5h3kn07pz14ryx6tz4qem"
    queryParams={params}
  >
    <Geocoder
      mapRef={mapRef}
      onViewportChange={handleGeocoderViewportChange}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      position="top-left"
      
    />
  </MapGL>
</div>
 )
}

export default Map
