import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture, RenderTexture, Text, PerspectiveCamera } from '@react-three/drei';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Apply color smoothly
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.colors.body, 0.25, delta));

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal 
            position={snap.logoPosition}
            rotation={snap.logoRotation}
            scale={snap.logoScale}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}

        {/* Back Text Rendering */}
        <Decal
          position={snap.textPosition}
          rotation={snap.textRotation}
          scale={snap.textScale}
        >
          <RenderTexture attach="map">
            <PerspectiveCamera makeDefault manual aspect={1} position={[0, 0, 5]} />
            <color attach="background" args={[snap.colors.body]} />
            <Text
              font={snap.textFont === 'Inter' ? '/Inter-Bold.woff' : undefined}
              fontSize={1}
              color={snap.textColor}
              anchorX="center"
              anchorY="middle"
            >
              {snap.text}
            </Text>
          </RenderTexture>
        </Decal>
      </mesh>
    </group>
  )
}

export default Shirt
