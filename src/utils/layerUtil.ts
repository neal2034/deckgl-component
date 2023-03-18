import { Accessor, Color, Layer, LayerData } from '@deck.gl/core/typed';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers/typed';

export const createTextLayer = (props: {
  data: string | Promise<LayerData<any>>;
  id: string;
  color?: Accessor<any, Color>;
  visible?: boolean;
}) => {
  return new TextLayer({
    id: props.id,
    data: props.data,
    dataTransform: (d: any) => d.features,
    characterSet: 'auto',
    getAlignmentBaseline: 'center',
    getAngle: 0,
    getColor: props.color || [255, 128, 0],
    getPosition: d => d.geometry.coordinates,
    getSize: 16,
    getText: d => d.properties.name,
    getTextAnchor: 'middle',
    sizeScale: 1,
    pickable: true,
    visible: props.visible || true,
  });
};

export const createScatterplotLayer = (props: {
  data: string | Promise<LayerData<any>>;
  id: string;
  color?: Accessor<any, Color>;
  visible?: boolean;
}) => {
  return new ScatterplotLayer({
    id: props.id,
    data: props.data,
    dataTransform: (d: any) => d.features,
    pickable: true,
    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: 26,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: d => d.geometry.coordinates,
    getRadius: 12,
    getFillColor: props.color || [255, 128, 0],
    getLineColor: props.color || [255, 128, 0],
    visible: props.visible || true,
  });
};

export const getToggleLayer = (layer: Layer) => {
  if (layer instanceof TextLayer) {
    console.log('it is text', layer.props.visible);
    return new TextLayer({
      ...layer.props,
      visible: !layer.props.visible,
      data: layer.props.data,
    });
  } else if (layer instanceof ScatterplotLayer) {
    return new ScatterplotLayer({
      ...layer.props,
      visible: !layer.props.visible,
      data: layer.props.data,
    });
  }
};
