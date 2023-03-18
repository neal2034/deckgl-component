import React, { useState } from 'react';
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';
import ReactMapBox from '../../components/react-mapbox/ReactMapBox';
import { useControl } from 'react-map-gl';
import { MAP_DATA_COLOR } from '../../assets/constant';
import { MAP_TOKEN } from '../../assets/constant';
import ControlPanel from '../../components/control-panel/ControlPanel';
import './dashboard.css';
import { Layer } from '@deck.gl/core/typed';
import NodeLayer from '../../components/node-layer/NodeLayer';
import { v4 as uuidv4 } from 'uuid';

function DeckGLOverlay(
  props: MapboxOverlayProps & {
    interleaved?: boolean;
  },
) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

const Dashboard = (): JSX.Element => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [refresh, setRefresh] = useState(0);

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

  return (
    <>
      <ControlPanel
        layers={layers}
        handleToggle={handleToggle}
        addLayer={addLayer}
      />
      <ReactMapBox mapToken={MAP_TOKEN}>
        <DeckGLOverlay layers={layers} />
      </ReactMapBox>
    </>
  );
};

export default Dashboard;
