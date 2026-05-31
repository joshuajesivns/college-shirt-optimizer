import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  colors: {
    body: '#EFBD4E',
    sleeves: '#EFBD4E',
    collar: '#353934',
  },
  style: 'plain', // plain, raglan, striped
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './vite.svg',
  fullDecal: './vite.svg',
  logoPosition: [0, 0.04, 0.15],
  logoRotation: [0, 0, 0],
  logoScale: 0.15,
  text: 'NSTP',
  textColor: '#ffffff',
  textFont: 'Inter', // Default font
  textPosition: [0, 0.04, -0.15],
  textRotation: [0, Math.PI, 0],
  textScale: 0.2,
  activeTab: 'logo', // logo or text
});

export default state;
