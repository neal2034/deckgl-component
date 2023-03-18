import React, { useEffect, useState } from 'react';
import { Map } from 'mapbox-gl';
import './home.css';
import MapBox from '../../components/mapbox/MapBox';
import { MapboxOverlay } from '@deck.gl/mapbox/typed';
import { MAP_DATA_COLOR } from '../../assets/constant';
import ControlPanel from '../../components/control-panel/ControlPanel';
import { Layer } from '@deck.gl/core/typed';
import NodeLayer from '../../components/node-layer/NodeLayer';
import { v4 as uuidv4 } from 'uuid';

const Home = (): JSX.Element => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [refresh, setRefresh] = useState(0);
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
        const node = new NodeLayer({
          id: uuidv4(),
          data: value,
          color,
        });
        setLayers([...layers, node]);
      }
    };
  };

  const handleToggle = (layerIndex: number) => {
    const layer = layers[layerIndex] as NodeLayer;
    layer.toggle();
    setRefresh(refresh + 1);
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
