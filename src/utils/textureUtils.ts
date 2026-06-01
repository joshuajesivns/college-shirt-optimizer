import * as THREE from 'three';
import { ShirtCut, LayoutStyle } from '@/store/shirtStore';

/**
 * TECHNICAL GARMENT ENGINE
 * This function draws a technical blueprint of a shirt directly onto the 3D model's UV map.
 * Coordinates are based on technical 'seam' locations for shirt_baked.glb.
 */
export function generateShirtTexture(
  cut: ShirtCut,
  layout: LayoutStyle,
  baseColor: string,
  accentColor: string,
  debugGrid: boolean = false
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // 1. FABRIC BASE
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. DESIGN MAPPING (The 'Paint' Layer)
  ctx.fillStyle = accentColor;

  if (cut === 'raglan' || cut === 'baseball-raglan') {
    /** 
     * AUTHENTIC RAGLAN SEAMS
     * Seams run from the neck (U: ~450/570) to the armpits (U: ~300/720)
     */
    
    // LEFT RAGLAN SLEEVE
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(440, 0); // Start at neck
    ctx.bezierCurveTo(400, 300, 350, 600, 320, 1024); // Curve to armpit
    ctx.lineTo(0, 1024);
    ctx.closePath();
    ctx.fill();

    // RIGHT RAGLAN SLEEVE
    ctx.beginPath();
    ctx.moveTo(1024, 0);
    ctx.lineTo(584, 0); // Start at neck
    ctx.bezierCurveTo(624, 300, 674, 600, 704, 1024); // Curve to armpit
    ctx.lineTo(1024, 1024);
    ctx.closePath();
    ctx.fill();

    // RAGLAN COLLAR (The connecting ring)
    ctx.fillRect(0, 920, 1024, 104); 

  } else if (cut === 'vneck' || cut === 'polo' || layout === 'piping') {
    /**
     * RINGER / COLLAR ACCENTS
     * Specifically targets the top band which maps to the shirt's collar
     */
    ctx.fillRect(0, 920, 1024, 104);
    
    if (cut === 'polo') {
      // The button placket strip
      ctx.fillRect(495, 650, 34, 270); 
    }
  }

  // 3. ADDITIONAL LAYOUTS
  ctx.fillStyle = accentColor;
  if (layout === 'chest-stripe') {
    // Horizontal band across the chest
    ctx.fillRect(0, 740, 1024, 60); 
  } else if (layout === 'double-chest-stripe') {
    ctx.fillRect(0, 760, 1024, 25);
    ctx.fillRect(0, 710, 1024, 25);
  }

  // 4. CALIBRATION GRID (Overlay)
  if (debugGrid) {
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)';
    ctx.lineWidth = 1;
    ctx.font = '24px monospace';
    ctx.fillStyle = 'red';
    for (let i = 0; i <= 1024; i += 100) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1024, i); ctx.stroke();
      ctx.fillText(`V:${i}`, 10, i - 5);
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke();
      ctx.fillText(`U:${i}`, i + 5, 30);
    }
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
