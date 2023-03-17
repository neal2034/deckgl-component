import React, { useEffect, useState } from 'react';
import { Map } from 'mapbox-gl';
import './home.css';
import MapBox from '../../components/mapbox/MapBox';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers/typed';
import { MapboxOverlay } from '@deck.gl/mapbox/typed';
import { MAP_DATA_COLOR } from '../../assets/constant';
import { createScatterplotLayer, createTextLayer } from '../../utils/layerUtil';
import ControlPanel from '../../components/control-panel/ControlPanel';
import { Accessor, Color, LayerData } from '@deck.gl/core/typed';

type LayerType = TextLayer | ScatterplotLayer;

const Home = (): JSX.Element => {
  const [layers, setLayers] = useState<LayerType[]>([]);
  const [layerData, setLayerData] = useState<
    { content: Promise<LayerData<any>>; color: Accessor<any, Color> }[]
  >([]);
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
        setLayerData([...layerData, { content: value, color }]);
      }
    };
  };

  const handleToggle = (layerIndex: number) => {
    const scatterLayerIndex = layerIndex * 2;
    const textLayerIndex = layerIndex * 2 + 1;
    const tempLayers = layers.slice(0);
    const data = layerData[layerIndex];
    tempLayers[scatterLayerIndex] = createScatterplotLayer({
      id: tempLayers[scatterLayerIndex].id,
      data: data.content,
      visible: !tempLayers[scatterLayerIndex].props.visible,
      color: data.color,
    });
    tempLayers[textLayerIndex] = createTextLayer({
      id: tempLayers[textLayerIndex].id,
      data: data.content,
      visible: !tempLayers[textLayerIndex].props.visible,
      color: [0, 0, 0],
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
