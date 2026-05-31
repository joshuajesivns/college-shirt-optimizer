import * as THREE from 'three';
import { ShirtCut, LayoutStyle } from '@/store/shirtStore';

/**
 * Technical Coordinate Mapping for 'shirt_baked.glb'
 * Refined for diagonal seams and realistic garment construction.
 */
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

  // 1. Base Layer (Main Body)
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. Technical Cut Layers
  ctx.fillStyle = accentColor;

  if (cut === 'raglan' || cut === 'baseball-raglan') {
    // DRAW RAGLAN SLEEVES (Diagonal paths meeting at the collar)
    
    // Left Sleeve Island + Shoulder Area
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(310, 0);
    ctx.lineTo(400, 850); // Diagonal seam to neck
    ctx.lineTo(310, 850); 
    ctx.lineTo(0, 700);
    ctx.closePath();
    ctx.fill();

    // Right Sleeve Island + Shoulder Area
    ctx.beginPath();
    ctx.moveTo(1024, 0);
    ctx.lineTo(714, 0);
    ctx.lineTo(624, 850); // Diagonal seam to neck
    ctx.lineTo(714, 850);
    ctx.lineTo(1024, 700);
    ctx.closePath();
    ctx.fill();

    // Collar Band (Matches sleeves in Raglan style)
    ctx.fillRect(0, 860, 1024, 164); 

  } else if (cut === 'vneck' || cut === 'polo') {
    // Sharp collar definition
    ctx.fillRect(0, 860, 1024, 164);
    if (cut === 'polo') {
        ctx.fillRect(485, 580, 54, 280); // Technical placket
    }
  }

  // 3. Ringer / Accent Details
  // (Always color the cuffs and collar if they are technically 'accented')
  if (layout === 'piping') {
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 860, 1024, 20); // Top of collar
    ctx.fillRect(0, 0, 1024, 15);   // Bottom Hem
  }

  // 4. Design Patterns
  ctx.fillStyle = accentColor;
  if (layout === 'chest-stripe') {
    ctx.fillRect(320, 640, 384, 60);
  } else if (layout === 'double-chest-stripe') {
    ctx.fillRect(320, 680, 384, 20);
    ctx.fillRect(320, 630, 384, 20);
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
