import * as THREE from 'three';

export function generateSolidTexture(color: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export function generateGradientTexture(
  color1: string,
  color2: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 512);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export function generateSplitTexture(
  colorLeft: string,
  colorRight: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = colorLeft;
  ctx.fillRect(0, 0, 128, 256);
  ctx.fillStyle = colorRight;
  ctx.fillRect(128, 0, 128, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export function generateSubTexture(
  color1: string,
  color2: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, color1);
  grad.addColorStop(0.4, color2);
  grad.addColorStop(0.7, color1);
  grad.addColorStop(1, color2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);
  // subtle noise
  for (let i = 0; i < 1200; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = Math.random() * 2.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.15})`;
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
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
