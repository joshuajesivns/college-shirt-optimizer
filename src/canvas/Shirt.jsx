import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture, RenderTexture, Text, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('shirt_baked.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Smoothly damp the base color
  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.colors.body, 0.25, delta);
  });

  // Logo position calculation based on placement
  const getLogoPosition = () => {
    switch(snap.logoPlacement) {
      case 'left_sleeve': return [-0.18, 0.1, 0.05];
      case 'right_sleeve': return [0.18, 0.1, 0.05];
      default: return snap.logoPosition; // Chest
    }
  }

  const getLogoRotation = () => {
    switch(snap.logoPlacement) {
      case 'left_sleeve': return [0, -Math.PI / 2, 0];
      case 'right_sleeve': return [0, Math.PI / 2, 0];
      default: return snap.logoRotation;
    }
  }

  // Inject shader logic for sleeve coloring
  materials.lambert1.onBeforeCompile = (shader) => {
    materials.lambert1.userData.shader = shader;
    shader.uniforms.uSleeveColor = { value: new THREE.Color(snap.colors.sleeves) };
    shader.uniforms.uIsRaglan = { value: snap.style === 'raglan' ? 1.0 : 0.0 };
    
    shader.fragmentShader = `
      uniform vec3 uSleeveColor;
      uniform float uIsRaglan;
    ` + shader.fragmentShader;

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <map_fragment>',
      `
      #include <map_fragment>
      if (uIsRaglan > 0.5) {
        // Precise UV boundaries for sleeves in shirt_baked.glb
        bool isSleeve = (vMapUv.x < 0.26 || vMapUv.x > 0.74);
        bool isCollar = (vMapUv.y > 0.88);
        if (isSleeve || isCollar) {
          diffuseColor.rgb = uSleeveColor;
        }
      }
      `
    );
  };

  // Sync uniforms on every frame for real-time updates
  useFrame(() => {
    if (materials.lambert1.userData.shader) {
      materials.lambert1.userData.shader.uniforms.uSleeveColor.value.set(snap.colors.sleeves);
      materials.lambert1.userData.shader.uniforms.uIsRaglan.value = snap.style === 'raglan' ? 1.0 : 0.0;
    }
  });

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
            position={getLogoPosition()}
            rotation={getLogoRotation()}
            scale={snap.logoScale}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}

        <Decal
          position={snap.textPosition}
          rotation={snap.textRotation}
          scale={snap.textScale}
        >
          <RenderTexture attach="map">
            <PerspectiveCamera makeDefault manual aspect={1} position={[0, 0, 5]} />
            <color attach="background" args={[snap.colors.body]} />
            <Text
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
