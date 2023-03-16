import { Accessor, Color } from '@deck.gl/core/typed';
import { TextLayer } from '@deck.gl/layers/typed';

export const createTextLayer = (props: {
  dataUrl: string;
  id: string;
  color?: number[] & Accessor<any, Color>;
  visible: boolean;
}) => {
  return new TextLayer({
    id: props.id,
    data: props.dataUrl,
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
    visible: props.visible,
  });
};
