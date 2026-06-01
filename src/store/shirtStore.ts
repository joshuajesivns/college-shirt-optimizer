import { proxy } from 'valtio';

export type ShirtCut =
  | 'crew'
  | 'raglan'
  | 'baseball-raglan'
  | 'ringer'
  | 'polo'
  | 'box-tee';

export type LayoutStyle =
  | 'plain'
  | 'shoulder-stripe'
  | 'chest-stripe'
  | 'double-chest-stripe'
  | 'color-block-chest'
  | 'side-panels'
  | 'shoulder-panel'
  | 'yoke'
  | 'diagonal-stripe'
  | 'asymmetrical'
  | 'piping'
  | 'chevron';

export type DecalPosition =
  | 'chest'
  | 'left-chest'
  | 'back'
  | 'left-sleeve'
  | 'right-sleeve';

export type TextLayer = {
  id: string;
  content: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  color: string;
  position: DecalPosition;
  x?: number; // 2D position
  y?: number;
};

export type LogoLayer = {
  id: string;
  url: string;
  position: DecalPosition;
  x?: number; // 2D position
  y?: number;
  scale?: number;
};

export const shirtStore = proxy({
  color: '#ffffff',
  accentColor: '#0B5D2A', // University Green
  collarColor: '#0B5D2A',
  cuffColor: '#0B5D2A',
  shirtCut: 'raglan' as ShirtCut,
  layoutStyle: 'plain' as LayoutStyle,
  view: 'front' as 'front' | 'back',
  texts: [] as TextLayer[],
  logos: [] as LogoLayer[],
  activeTab: 'style',
  autoRotate: false,
  debugGrid: false,
});
