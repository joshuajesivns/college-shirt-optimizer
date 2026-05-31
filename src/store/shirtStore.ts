import { proxy } from 'valtio';

export type ShirtCut =
  | 'crew'
  | 'raglan'
  | 'baseball-raglan'
  | 'vneck'
  | 'polo'
  | 'henley';

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
  | 'chevron'
  | 'gradient'
  | 'full-sublimation'
  | 'split-color';

export type DecalPosition =
  | 'chest'
  | 'left-chest'
  | 'back'
  | 'left-shoulder'
  | 'right-shoulder'
  | 'sleeve-left'
  | 'sleeve-right';

export type TextLayer = {
  id: string;
  content: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  color: string;
  position: DecalPosition;
};

export type LogoLayer = {
  id: string;
  url: string;
  position: DecalPosition;
};

export const shirtStore = proxy({
  color: '#111111',
  accentColor: '#ffffff',
  shirtCut: 'crew' as ShirtCut,
  layoutStyle: 'plain' as LayoutStyle,
  texts: [] as TextLayer[],
  logos: [] as LogoLayer[],
  activeTab: 'colors',
  autoRotate: true,
});
