import { Accessor, Color } from '@deck.gl/core/typed';

export const MAP_TOKEN =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

export const MAP_DATA_COLOR: (number[] & Accessor<any, Color>)[] = [
  [0, 176, 114],
  [114, 100, 172],
  [211, 9, 170],
];
