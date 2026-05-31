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
  logoDecal: 'threejs.png',
  fullDecal: 'threejs.png',
  
  // Placement settings
  logoPosition: [0, 0.04, 0.15],
  logoRotation: [0, 0, 0],
  logoScale: 0.15,
  logoPlacement: 'chest', // chest, left_sleeve, right_sleeve
  
  text: 'NSTP',
  textColor: '#ffffff',
  textFont: 'Inter',
  textPosition: [0, 0.04, -0.15],
  textRotation: [0, Math.PI, 0],
  textScale: 0.2,
});

export default state;
