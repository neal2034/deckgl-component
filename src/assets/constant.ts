import { Accessor, Color } from '@deck.gl/core/typed';

export const MAP_LAYER_DATA: {
  key: string;
  source: string;
  color: number[] & Accessor<any, Color>;
}[] = [
  {
    key: 'layer1',
    source: 'https://elgo.oss-cn-hangzhou.aliyuncs.com/points1.geojson',
    color: [242, 153, 77],
  },
  {
    key: 'layer2',
    source: 'https://elgo.oss-cn-hangzhou.aliyuncs.com/points2.geojson',
    color: [211, 9, 170],
  },
  {
    key: 'layer3',
    source: 'https://elgo.oss-cn-hangzhou.aliyuncs.com/points3.geojson',
    color: [17, 155, 100],
  },
];

export const MAP_TOKEN =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
