import React, { useEffect, useState } from 'react';
import { Map } from 'mapbox-gl';
import './home.css';
import MapBox from '../../components/mapbox/MapBox';
import { MapboxOverlay } from '@deck.gl/mapbox/typed';
import { MAP_DATA_COLOR } from '../../assets/constant';
import {
  createScatterplotLayer,
  createTextLayer,
  getToggleLayer,
} from '../../utils/layerUtil';
import ControlPanel from '../../components/control-panel/ControlPanel';
import { Layer } from '@deck.gl/core/typed';

const Home = (): JSX.Element => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [mapboxOverLay, setMapboxOverLay] = useState<MapboxOverlay | null>(
    null,
  );

  let theMap: Map | null = null;
  const onMapMount = (map: Map) => {
    theMap = map;
  };

  const addLayer = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = e => {
      if (e.target && typeof e.target.result === 'string') {
        const value = JSON.parse(e.target.result);
        const dataIndex = layers.length;
        const color = MAP_DATA_COLOR[dataIndex % MAP_DATA_COLOR.length];
        const scatterLayer = createScatterplotLayer({
          id: 'Layer' + dataIndex,
          data: value,
          color: color,
        });
        const textLayer = createTextLayer({
          id: 'Layer' + (dataIndex + 1),
          data: value,
          color: [0, 0, 0],
        });

        setLayers([...layers, scatterLayer, textLayer]);
      }
    };
  };

  const handleToggle = (layerIndex: number) => {
    const scatterLayerIndex = layerIndex * 2;
    const textLayerIndex = layerIndex * 2 + 1;
    const tempLayers = layers.slice(0);
    const toggledScatterLayer = getToggleLayer(tempLayers[scatterLayerIndex]);
    const toggledTextLayer = getToggleLayer(tempLayers[textLayerIndex]);
    if (toggledScatterLayer) {
      tempLayers[scatterLayerIndex] = toggledScatterLayer;
    }
    if (toggledTextLayer) {
      tempLayers[textLayerIndex] = toggledTextLayer;
    }

    setLayers(tempLayers);
  };

  useEffect(() => {
    mapboxOverLay?.setProps({ layers: layers });
  }, [layers]);

  useEffect(() => {
    if (mapboxOverLay === null) {
      const overlay = new MapboxOverlay({
        layers: layers,
      });
      setMapboxOverLay(overlay);
      theMap?.addControl(overlay);
    }
  }, []);

  return (
    <>
      <ControlPanel
        layers={layers}
        handleToggle={handleToggle}
        addLayer={addLayer}
      />
      <MapBox onMapMount={onMapMount} />
    </>
  );
};

export default Home;
