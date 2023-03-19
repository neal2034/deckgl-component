import {
  Accessor,
  Color,
  CompositeLayer,
  Layer,
  LayerData,
  LayersList,
} from '@deck.gl/core/typed';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers/typed';

type NodeLayerProps = {
  id: string;
  data: string | Promise<LayerData<any>>;
  color: Accessor<any, Color>;
  visible: boolean;
};

export default class NodeLayer extends CompositeLayer<NodeLayerProps> {
  renderLayers(): Layer | LayersList | null {
    return [
      new ScatterplotLayer({
        id: this.props.id + '-scatter',
        data: this.props.data,
        dataTransform: (d: any) => d.features,
        opacity: 0.8,
        stroked: true,
        filled: true,
        radiusScale: 5,
        radiusMinPixels: 1,
        radiusMaxPixels: 15,
        lineWidthMinPixels: 1,
        getPosition: d => d.geometry.coordinates,
        getRadius: 15,
        getFillColor: [0, 86, 248],
        getLineColor: [0, 86, 248],
        visible: this.props.visible,
      }),
      new TextLayer({
        id: this.props.id + '-text',
        visible: this.props.visible,
        data: this.props.data,
        dataTransform: (d: any) => d.features,
        characterSet: 'auto',
        getAlignmentBaseline: 'center',
        getAngle: 0,
        getColor: this.props.color,
        getPosition: d => d.geometry.coordinates,
        getSize: 16,
        getText: d => d.properties.name,
        getTextAnchor: 'middle',
        sizeScale: 1,
        getPixelOffset: [0, -20],
      }),
    ];
  }
}
