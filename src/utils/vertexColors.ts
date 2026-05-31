import * as THREE from 'three';
import { ShirtCut, LayoutStyle } from '@/store/shirtStore';

// ─── World-space thresholds tuned to the shirt_baked.glb geometry ────────────
const SLV  = 0.135;  // |x| > SLV  → sleeve region
const SHL  = 0.18;   // y  > SHL   → shoulder/upper area (below collar)
const CLRY = 0.245;  // y  > CLRY  → collar opening band
const CHT1 = 0.04;   // chest stripe bottom edge
const CHT2 = 0.14;   // chest stripe top edge
const CHT3 = 0.17;   // color-block top edge
const SIDE = 0.18;   // |x| > SIDE (but not sleeve) → side panels

// Diagonal stripe: ax + by > c
const DIAG_A = 1.2, DIAG_B = 1.0, DIAG_C = 0.13, DIAG_W = 0.05;

function isSleeve(ax: number): boolean { return ax > SLV; }

export function computeVertexColors(
  geometry: THREE.BufferGeometry,
  cut: ShirtCut,
  layout: LayoutStyle,
  baseHex: string,
  accentHex: string,
): void {
  const base   = new THREE.Color(baseHex);
  const accent = new THREE.Color(accentHex);

  const pos    = geometry.attributes.position as THREE.BufferAttribute;
  let colAttr  = geometry.attributes.color as THREE.BufferAttribute | undefined;

  // Create the color buffer if it doesn't exist yet
  if (!colAttr) {
    colAttr = new THREE.BufferAttribute(new Float32Array(pos.count * 3), 3);
    geometry.setAttribute('color', colAttr);
  }

  // temp vector to read world-space position via the buffer
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const x  = v.x;
    const y  = v.y;
    const ax = Math.abs(x);

    // Start every vertex at base color
    let r = base.r, g = base.g, b = base.b;

    // ── SHIRT CUT colouring (sleeves / collar overrides) ────────────────────
    const sleeve = isSleeve(ax);
    const collar = y > CLRY;

    switch (cut) {
      case 'raglan':
        if (sleeve || collar) { r = accent.r; g = accent.g; b = accent.b; }
        break;
      case 'baseball-raglan':
        // wider / longer sleeve coverage (3/4 sleeve look)
        if ((ax > 0.12) || collar) { r = accent.r; g = accent.g; b = accent.b; }
        break;
      case 'vneck':
        // V-neck: just a thin V-shaped collar band in accent
        if (collar && ax < 0.07) { r = accent.r; g = accent.g; b = accent.b; }
        break;
      case 'polo':
        // Polo placket strip down center-chest + collar
        if ((collar) || (ax < 0.025 && y > 0.14 && y < 0.26)) { r = accent.r; g = accent.g; b = accent.b; }
        break;
      case 'henley':
        // Short center placket + collar
        if ((collar) || (ax < 0.025 && y > 0.19 && y < 0.26)) { r = accent.r; g = accent.g; b = accent.b; }
        break;
      default:
        // crew: no sleeve/collar override
        break;
    }

    // ── LAYOUT STYLE patterns (applied over cut colouring) ──────────────────
    // For patterns that should NOT affect the sleeves (chest / body only)
    const bodyVertex = !sleeve;

    switch (layout) {
      case 'plain':
        break;

      case 'chest-stripe':
        if (bodyVertex && y > CHT1 && y < CHT2) {
          r = accent.r; g = accent.g; b = accent.b;
        }
        break;

      case 'double-chest-stripe': {
        const inStripe1 = y > CHT1     && y < CHT1 + 0.04;
        const inStripe2 = y > CHT1 + 0.07 && y < CHT1 + 0.11;
        if (bodyVertex && (inStripe1 || inStripe2)) {
          r = accent.r; g = accent.g; b = accent.b;
        }
        break;
      }

      case 'color-block-chest':
        if (bodyVertex && y > CHT1 && y < CHT3) {
          r = accent.r; g = accent.g; b = accent.b;
        }
        break;

      case 'shoulder-stripe':
        if (y > SHL && y < CLRY && ax > 0.04) {
          r = accent.r; g = accent.g; b = accent.b;
        }
        break;

      case 'shoulder-panel':
        if (y > SHL && ax > 0.04) {
          r = accent.r; g = accent.g; b = accent.b;
        }
        break;

      case 'yoke':
        if (y > SHL) {
          r = accent.r; g = accent.g; b = accent.b;
        }
        break;

      case 'side-panels':
        if (bodyVertex && ax > SIDE) {
          r = accent.r; g = accent.g; b = accent.b;
        }
        break;

      case 'diagonal-stripe': {
        const val = DIAG_A * x + DIAG_B * y;
        if (bodyVertex && val > DIAG_C - DIAG_W && val < DIAG_C + DIAG_W) {
          r = accent.r; g = accent.g; b = accent.b;
        }
        break;
      }

      case 'asymmetrical':
        if (x < -0.02) {
          r = accent.r; g = accent.g; b = accent.b;
        }
        break;

      case 'piping':
        // thin lines: collar edge, sleeve cuffs, hem
        if (y > CLRY - 0.01 && y < CLRY + 0.01) {
          r = accent.r; g = accent.g; b = accent.b;
        }
        if (sleeve && y < -0.05 && y > -0.1) {
          r = accent.r; g = accent.g; b = accent.b;
        }
        if (y < -0.30) {
          r = accent.r; g = accent.g; b = accent.b;
        }
        break;

      case 'chevron': {
        // Two diagonal lines forming a V centered on chest
        const leftArm  =  (DIAG_A * (-ax) + DIAG_B * y);
        const inChevron = leftArm > 0.09 && leftArm < 0.14 && bodyVertex && y > 0.04 && y < 0.2;
        if (inChevron) { r = accent.r; g = accent.g; b = accent.b; }
        break;
      }

      case 'gradient': {
        // Blend from base (bottom) to accent (top) by Y
        const t = THREE.MathUtils.clamp((y + 0.35) / 0.70, 0, 1);
        r = THREE.MathUtils.lerp(base.r, accent.r, t);
        g = THREE.MathUtils.lerp(base.g, accent.g, t);
        b = THREE.MathUtils.lerp(base.b, accent.b, t);
        break;
      }

      case 'full-sublimation': {
        // Alternating diagonal bands (sublimation-style)
        const wave = Math.sin((x * 8 + y * 6) * Math.PI);
        const t = wave * 0.5 + 0.5;
        r = THREE.MathUtils.lerp(base.r, accent.r, t);
        g = THREE.MathUtils.lerp(base.g, accent.g, t);
        b = THREE.MathUtils.lerp(base.b, accent.b, t);
        break;
      }

      case 'split-color':
        if (x > 0.0) {
          r = accent.r; g = accent.g; b = accent.b;
        }
        break;
    }

    colAttr.setXYZ(i, r, g, b);
  }

  colAttr.needsUpdate = true;
}
