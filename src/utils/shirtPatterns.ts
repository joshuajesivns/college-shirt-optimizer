import { LayoutStyle, ShirtCut } from '@/store/shirtStore';

export type PatternDecal = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
};

export const LAYOUT_PATTERNS: Record<LayoutStyle, PatternDecal[]> = {
  plain: [],

  'shoulder-stripe': [
    { position: [-0.18, 0.2, 0.1],  rotation: [0.3, -0.45, 0],           scale: [0.14, 0.038, 0.08] },
    { position: [0.18, 0.2, 0.1],   rotation: [0.3, 0.45, 0],            scale: [0.14, 0.038, 0.08] },
    { position: [-0.18, 0.2, -0.1], rotation: [-0.3, Math.PI + 0.45, 0], scale: [0.14, 0.038, 0.08] },
    { position: [0.18, 0.2, -0.1],  rotation: [-0.3, Math.PI - 0.45, 0], scale: [0.14, 0.038, 0.08] },
  ],

  'chest-stripe': [
    { position: [0, 0.08, 0.155], rotation: [0, 0, 0], scale: [0.44, 0.048, 0.07] },
  ],

  'double-chest-stripe': [
    { position: [0, 0.11, 0.155], rotation: [0, 0, 0], scale: [0.44, 0.022, 0.07] },
    { position: [0, 0.07, 0.155], rotation: [0, 0, 0], scale: [0.44, 0.022, 0.07] },
  ],

  'color-block-chest': [
    { position: [0, 0.14, 0.155], rotation: [0, 0, 0], scale: [0.44, 0.11, 0.07] },
  ],

  'side-panels': [
    { position: [-0.2, -0.04, 0.13],  rotation: [0, -0.35, 0], scale: [0.07, 0.44, 0.07] },
    { position: [0.2, -0.04, 0.13],   rotation: [0, 0.35, 0],  scale: [0.07, 0.44, 0.07] },
  ],

  'shoulder-panel': [
    { position: [-0.14, 0.21, 0.13], rotation: [0.2, -0.3, 0],  scale: [0.15, 0.09, 0.07] },
    { position: [0.14, 0.21, 0.13],  rotation: [0.2, 0.3, 0],   scale: [0.15, 0.09, 0.07] },
  ],

  yoke: [
    { position: [0, 0.22, 0.155],  rotation: [0, 0, 0],         scale: [0.44, 0.09, 0.07] },
    { position: [0, 0.22, -0.155], rotation: [0, Math.PI, 0],   scale: [0.44, 0.09, 0.07] },
  ],

  'diagonal-stripe': [
    { position: [0, 0.07, 0.155], rotation: [0, 0, 0.44], scale: [0.62, 0.048, 0.07] },
  ],

  asymmetrical: [
    { position: [-0.11, 0.0, 0.155], rotation: [0, 0, 0], scale: [0.21, 0.52, 0.07] },
  ],

  piping: [
    // collar edge
    { position: [0, 0.275, 0.14],   rotation: [0, 0, 0],        scale: [0.32, 0.009, 0.05] },
    // sleeve left seam
    { position: [-0.255, 0.03, 0.07], rotation: [0, -0.6, 0],   scale: [0.009, 0.28, 0.04] },
    // sleeve right seam
    { position: [0.255, 0.03, 0.07],  rotation: [0, 0.6, 0],    scale: [0.009, 0.28, 0.04] },
    // hem bottom
    { position: [0, -0.335, 0.14],  rotation: [0, 0, 0],        scale: [0.44, 0.009, 0.04] },
  ],

  chevron: [
    { position: [-0.08, 0.11, 0.155], rotation: [0, 0, -0.52], scale: [0.2, 0.038, 0.07] },
    { position: [0.08, 0.11, 0.155],  rotation: [0, 0, 0.52],  scale: [0.2, 0.038, 0.07] },
  ],

  gradient: [],

  'full-sublimation': [],

  'split-color': [
    { position: [0.115, -0.02, 0.155], rotation: [0, 0, 0], scale: [0.22, 0.55, 0.07] },
    { position: [0.115, -0.02, -0.155], rotation: [0, Math.PI, 0], scale: [0.22, 0.55, 0.07] },
  ],
};

export const RAGLAN_SLEEVES: PatternDecal[] = [
  // left sleeve
  { position: [-0.22, 0.06, 0.08],  rotation: [0, -0.5, 0],  scale: [0.1, 0.24, 0.07] },
  { position: [-0.22, 0.06, -0.08], rotation: [0, Math.PI + 0.5, 0], scale: [0.1, 0.24, 0.07] },
  // right sleeve
  { position: [0.22, 0.06, 0.08],   rotation: [0, 0.5, 0],   scale: [0.1, 0.24, 0.07] },
  { position: [0.22, 0.06, -0.08],  rotation: [0, Math.PI - 0.5, 0], scale: [0.1, 0.24, 0.07] },
];

export const BASEBALL_SLEEVES: PatternDecal[] = [
  { position: [-0.22, 0.06, 0.08],  rotation: [0, -0.45, 0],  scale: [0.13, 0.28, 0.08] },
  { position: [-0.22, 0.06, -0.08], rotation: [0, Math.PI + 0.45, 0], scale: [0.13, 0.28, 0.08] },
  { position: [0.22, 0.06, 0.08],   rotation: [0, 0.45, 0],   scale: [0.13, 0.28, 0.08] },
  { position: [0.22, 0.06, -0.08],  rotation: [0, Math.PI - 0.45, 0], scale: [0.13, 0.28, 0.08] },
];

export const COLLAR_VNECK: PatternDecal[] = [
  { position: [0, 0.26, 0.145], rotation: [-0.1, 0, 0.3],  scale: [0.09, 0.045, 0.04] },
  { position: [0, 0.26, 0.145], rotation: [-0.1, 0, -0.3], scale: [0.09, 0.045, 0.04] },
];

export const POLO_PLACKET: PatternDecal[] = [
  { position: [0, 0.18, 0.155], rotation: [0, 0, 0], scale: [0.04, 0.11, 0.04] },
];

export const HENLEY_PLACKET: PatternDecal[] = [
  { position: [0, 0.21, 0.155], rotation: [0, 0, 0], scale: [0.04, 0.07, 0.04] },
];

export function getCutDecals(cut: ShirtCut): PatternDecal[] {
  switch (cut) {
    case 'raglan':         return RAGLAN_SLEEVES;
    case 'baseball-raglan': return BASEBALL_SLEEVES;
    case 'vneck':          return COLLAR_VNECK;
    case 'polo':           return POLO_PLACKET;
    case 'henley':         return HENLEY_PLACKET;
    default:               return [];
  }
}

export type DecalPosition =
  | 'chest'
  | 'left-chest'
  | 'back'
  | 'left-shoulder'
  | 'right-shoulder'
  | 'sleeve-left'
  | 'sleeve-right';

export const PLACEMENT_COORDS: Record<
  string,
  { position: [number, number, number]; rotation: [number, number, number]; scale: number }
> = {
  chest:           { position: [0, 0.04, 0.155],    rotation: [0, 0, 0],              scale: 0.15 },
  'left-chest':    { position: [-0.08, 0.1, 0.155], rotation: [0, 0, 0],              scale: 0.08 },
  back:            { position: [0, 0.04, -0.155],   rotation: [0, Math.PI, 0],        scale: 0.15 },
  'left-shoulder': { position: [-0.17, 0.13, 0.06], rotation: [0, -Math.PI / 4, 0],  scale: 0.1 },
  'right-shoulder':{ position: [0.17, 0.13, 0.06],  rotation: [0, Math.PI / 4, 0],   scale: 0.1 },
  'sleeve-left':   { position: [-0.22, 0.02, 0.06], rotation: [0, -Math.PI / 3, 0],  scale: 0.08 },
  'sleeve-right':  { position: [0.22, 0.02, 0.06],  rotation: [0, Math.PI / 3, 0],   scale: 0.08 },
};
