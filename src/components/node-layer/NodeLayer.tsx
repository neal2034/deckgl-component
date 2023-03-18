import React from 'react';
import {
  Accessor,
  Color,
  CompositeLayer,
  Layer,
  LayerContext,
  LayerData,
  LayersList,
} from '@deck.gl/core/typed';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers/typed';
import { v4 as uuidv4 } from 'uuid';
type NodeLayerProps = {
  id: string;
  data: string | Promise<LayerData<any>>;
  color?: Accessor<any, Color>;
};

export default class NodeLayer extends CompositeLayer<NodeLayerProps> {
  initializeState(context: LayerContext) {
    super.initializeState(context);
    this.setState({
      textLayerId: uuidv4(),
      scatterPlotLayerId: uuidv4(),
      visible: true,
      data: this.props.data,
    });
  }

  toggle() {
    this.setState({ visible: !this.state.visible });
  }

  isVisible() {
    return this.state ? this.state.visible : true;
  }
  renderLayers(): Layer | LayersList | null {
    return [
      new ScatterplotLayer({
        id: this.state.scatterPlotLayerId,
        data: this.state.data,
        dataTransform: (d: any) => d.features,
        pickable: true,
        opacity: 0.2,
        stroked: true,
        filled: true,
        radiusScale: 26,
        radiusMinPixels: 1,
        radiusMaxPixels: 100,
        lineWidthMinPixels: 1,
        getPosition: d => d.geometry.coordinates,
        getRadius: 12,
        getFillColor: this.props.color || [255, 128, 0],
        getLineColor: this.props.color || [255, 128, 0],
        visible: this.state.visible,
      }),
      new TextLayer({
        id: this.state.textLayerId,
        visible: this.state.visible,
        data: this.state.data,
        dataTransform: (d: any) => d.features,
        characterSet: 'auto',
        getAlignmentBaseline: 'center',
        getAngle: 0,
        getColor: [0, 0, 0],
        getPosition: d => d.geometry.coordinates,
        getSize: 16,
        getText: d => d.properties.name,
        getTextAnchor: 'middle',
        sizeScale: 1,
        pickable: true,
      }),
    ];
  }
}
