import React, { useState } from 'react';
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';
import ReactMapBox from '../../components/react-mapbox/ReactMapBox';
import { useControl } from 'react-map-gl';
import { MAP_DATA_COLOR } from '../../assets/constant';
import { MAP_TOKEN } from '../../assets/constant';
import ControlPanel from '../../components/control-panel/ControlPanel';
import {
  createScatterplotLayer,
  createTextLayer,
  getToggleLayer,
} from '../../utils/layerUtil';
import './dashboard.css';
import { Layer } from '@deck.gl/core/typed';

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
          visible: true,
          color: color,
        });
        const textLayer = createTextLayer({
          id: 'Layer' + (dataIndex + 1),
          data: value,
          visible: true,
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
