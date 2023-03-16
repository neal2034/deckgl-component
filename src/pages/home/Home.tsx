import React, { useEffect, useState } from 'react';
import { Map } from 'mapbox-gl';
import './home.css';
import MapBox from '../../components/mapbox/MapBox';
import { TextLayer } from '@deck.gl/layers/typed';
import { MapboxOverlay } from '@deck.gl/mapbox/typed';
import { MAP_LAYER_DATA } from '../../assets/constant';
import { createTextLayer } from '../../utils/layerUtil';
import ControlPanel from '../../components/control-panel/ControlPanel';

const Home = (): JSX.Element => {
  const [layers, setLayers] = useState<TextLayer[]>([]);
  const [mapboxOverLay, setMapboxOverLay] = useState<MapboxOverlay | null>(
    null,
  );

  let theMap: Map | null = null;

  const onMapMount = (map: Map) => {
    theMap = map;
  };

  const addLayer = () => {
    const dataIndex = layers.length;
    const layerData = MAP_LAYER_DATA[dataIndex];
    const layer = createTextLayer({
      id: layerData.key,
      dataUrl: layerData.source,
      visible: true,
      color: layerData.color,
    });
    setLayers([...layers, layer]);
  };

  const handleToggle = (layerIndex: number) => {
    const tempLayers = layers.slice(0);
    const layerData = MAP_LAYER_DATA[layerIndex];
    tempLayers[layerIndex] = createTextLayer({
      id: layerData.key,
      dataUrl: layerData.source,
      visible: !layers[layerIndex].props.visible,
      color: layerData.color,
    });
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
