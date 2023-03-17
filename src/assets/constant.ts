import { Accessor, Color } from '@deck.gl/core/typed';

export const MAP_TOKEN =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

export const MAP_DATA_COLOR: (number[] & Accessor<any, Color>)[] = [
  [242, 153, 77],
  [211, 9, 170],
  [17, 155, 100],
];
