import * as THREE from 'three';
import { ShirtCut, LayoutStyle } from '@/store/shirtStore';

export function generateShirtTexture(
  cut: ShirtCut,
  layout: LayoutStyle,
  baseColor: string,
  accentColor: string,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // 1. Fill base color (Main Body)
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. Apply Cut-specific coloring (Raglan, Polo, etc.)
  ctx.fillStyle = accentColor;

  if (cut === 'raglan' || cut === 'baseball-raglan') {
    // Fill sleeve islands (Approximate coordinates for shirt_baked.glb)
    ctx.fillRect(0, 0, 307, 700); 
    ctx.fillRect(717, 0, 307, 700);
    // Fill collar band
    ctx.fillRect(0, 870, 1024, 154); 
  } else if (cut === 'vneck' || cut === 'polo') {
    ctx.fillRect(0, 870, 1024, 154);
    if (cut === 'polo') {
        ctx.fillRect(490, 600, 44, 270);
    }
  }

  // 3. Apply Design Layout
  ctx.fillStyle = accentColor;
  if (layout === 'chest-stripe') {
    ctx.fillRect(300, 650, 424, 50);
  } else if (layout === 'double-chest-stripe') {
    ctx.fillRect(300, 680, 424, 20);
    ctx.fillRect(300, 640, 424, 20);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.flipY = false;
  return texture;
}

export function generateTextTexture(
  content: string,
  fontFamily: string,
  fontSize: 'small' | 'medium' | 'large',
  color: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 256);

  const pxSize = fontSize === 'small' ? 48 : fontSize === 'medium' ? 72 : 100;
  const safeFontFamily = `"${fontFamily}", sans-serif`;
  ctx.font = `bold ${pxSize}px ${safeFontFamily}`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(content, 256, 128);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}
