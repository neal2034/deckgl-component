import React, { useEffect, useRef } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import { MAP_TOKEN } from '../../assets/constant';

mapboxgl.accessToken = MAP_TOKEN;

interface IMapBox {
  lng?: number;
  lat?: number;
  zoom?: number;
  onMapMount: (map: Map) => void;
}

const MapBox = (props: IMapBox) => {
  const { lng = 114.3443, lat = 22.9046, zoom = 9.1, onMapMount } = props;
  const mapContainerRef = useRef(null);
  let map: any = null;

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainerRef.current) return;
    map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    onMapMount(map);
    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapBox;
