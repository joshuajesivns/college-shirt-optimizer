import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  Environment,
  Center,
  ContactShadows,
  OrbitControls,
  Decal,
  useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { shirtStore, LogoLayer, TextLayer } from '@/store/shirtStore';
import { PLACEMENT_COORDS } from '@/utils/shirtPatterns';
import { generateShirtTexture, generateTextTexture } from '@/utils/textureUtils';

// ─── WebGL support check ─────────────────────────────────────────────────────
function isWebGLSupported(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(
      c.getContext('webgl2') ||
      c.getContext('webgl') ||
      c.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

// ─── Single logo decal (one useTexture per instance) ─────────────────────────
function LogoDecal({ layer }: { layer: LogoLayer }) {
  const texture = useTexture(layer.url);
  const coords = PLACEMENT_COORDS[layer.position];
  if (!coords) return null;
  return (
    <Decal
      position={coords.position}
      rotation={coords.rotation}
      scale={coords.scale}
      map={texture}
    />
  );
}

// ─── Single text decal ────────────────────────────────────────────────────────
function TextDecal({ layer }: { layer: TextLayer }) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let disposed = false;
    document.fonts.ready.then(() => {
      if (disposed) return;
      const tex = generateTextTexture(
        layer.content,
        layer.fontFamily,
        layer.fontSize,
        layer.color,
      );
      setTexture(tex);
    });
    return () => {
      disposed = true;
      setTexture((prev) => { prev?.dispose(); return null; });
    };
  }, [layer.content, layer.fontFamily, layer.fontSize, layer.color]);

  const coords = PLACEMENT_COORDS[layer.position];
  if (!texture || !coords) return null;

  const xScale =
    layer.fontSize === 'small' ? 0.13 : layer.fontSize === 'medium' ? 0.2 : 0.28;
  const yScale =
    layer.fontSize === 'small' ? 0.055 : layer.fontSize === 'medium' ? 0.08 : 0.11;

  return (
    <Decal
      position={coords.position}
      rotation={coords.rotation}
      scale={[xScale, yScale, 0.05]}
      map={texture}
    />
  );
}

// ─── Shirt mesh with dynamic texture-driven patterns ────────────────────────────
function ShirtModel() {
  const snap = useSnapshot(shirtStore);
  const baseUrl = import.meta.env.BASE_URL;
  const { nodes } = useGLTF(`${baseUrl}shirt_baked.glb`) as any;

  // Create a dynamic texture based on the current design
  const shirtTexture = useMemo(() => {
    return generateShirtTexture(
      snap.shirtCut,
      snap.layoutStyle,
      snap.color,
      snap.accentColor,
      snap.debugGrid
    );
  }, [snap.shirtCut, snap.layoutStyle, snap.color, snap.accentColor, snap.debugGrid]);

  // Dispose texture on unmount
  useEffect(() => () => shirtTexture.dispose(), [shirtTexture]);

  return (
    <group dispose={null}>
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.T_Shirt_male.geometry}
      >
        <meshStandardMaterial 
          map={shirtTexture} 
          roughness={0.88} 
          metalness={0.0} 
        />
        {/* Logos */}
        {snap.logos.map((logo) => (
          <LogoDecal key={logo.id} layer={logo} />
        ))}
        {/* Text layers */}
        {snap.texts.map((text) => (
          <TextDecal key={text.id} layer={text} />
        ))}
      </mesh>
    </group>
  );
}

// ─── Camera rig with optional auto-rotate ────────────────────────────────────
function CameraRig({ children }: { children: React.ReactNode }) {
  const snap = useSnapshot(shirtStore);
  const group = useRef<THREE.Group>(null);
  useFrame((_state, delta) => {
    if (snap.autoRotate && group.current) {
      group.current.rotation.y += delta * 0.4;
    }
  });
  return <group ref={group}>{children}</group>;
}

// ─── WebGL unavailable fallback ───────────────────────────────────────────────
function WebGLFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background">
      <div className="text-center max-w-sm px-6">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40">
            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <h2 className="text-white/90 font-medium text-lg mb-2">3D preview unavailable</h2>
        <p className="text-white/40 text-sm leading-relaxed mb-6">
          WebGL is not supported in this preview frame. Open the app in a full browser tab to use the 3D shirt designer.
        </p>
        <a
          href={window.location.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 text-white/80 text-sm transition-colors border border-white/10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Open in new tab
        </a>
      </div>
    </div>
  );
}

// ─── Main exported canvas ─────────────────────────────────────────────────────
export default function ShirtCanvas() {
  const webglSupported = true; // Bypass detection to allow standard browser behavior
  if (webglSupported === null) return null;
  if (!webglSupported) return <WebGLFallback />;

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 2.5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      className="w-full h-full"
    >
      {/* Three-point lighting for a solid, non-hollow appearance */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 5]}  intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 2, -2]} intensity={0.7} />
      <directionalLight position={[0, -3, 3]}  intensity={0.35} />

      <Environment preset="studio" />

      <CameraRig>
        <Center>
          <ShirtModel />
        </Center>
      </CameraRig>

      <ContactShadows position={[0, -0.8, 0]} opacity={0.6} scale={10} blur={2} far={1} />

      <OrbitControls
        enableZoom
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        makeDefault
      />
    </Canvas>
  );
}
