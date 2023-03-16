import React, { ReactNode } from 'react';
import './reactMapBox.css';

import Map from 'react-map-gl';

interface IReactMapBox {
  children: ReactNode;
  lat?: number;
  lng?: number;
  zoom?: number;
  style?: string;
  mapToken: string;
}

const ReactMapBox = (props: IReactMapBox): JSX.Element => {
  const {
    lat = 22.9046,
    lng = 114.3443,
    zoom = 9.1,
    style = 'mapbox://styles/mapbox/streets-v11',
    mapToken,
  } = props;
  return (
    <div className={'map-container'}>
      <Map
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: zoom,
        }}
        mapStyle={style}
        mapboxAccessToken={mapToken}
      >
        {props.children}
      </Map>
    </div>
  );
};

export default ReactMapBox;
