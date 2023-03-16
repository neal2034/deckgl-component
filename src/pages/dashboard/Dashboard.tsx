import React, { useState } from 'react';
import { TextLayer } from '@deck.gl/layers/typed';
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';
import ReactMapBox from '../../components/react-mapbox/ReactMapBox';
import { useControl } from 'react-map-gl';
import { MAP_LAYER_DATA } from '../../assets/constant';
import { MAP_TOKEN } from '../../assets/constant';
import ControlPanel from '../../components/control-panel/ControlPanel';
import { createTextLayer } from '../../utils/layerUtil';
import './dashboard.css';

function DeckGLOverlay(
  props: MapboxOverlayProps & {
    interleaved?: boolean;
  },
) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

const Home = (): JSX.Element => {
  const [layers, setLayers] = useState<TextLayer[]>([]);

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

export default Home;
