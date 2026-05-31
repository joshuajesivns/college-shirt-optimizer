import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture, RenderTexture, Text, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Setup Shader for Raglan coloring (Body vs Sleeves)
  // Based on the UV map of shirt_baked.glb:
  // Body is roughly in the center/bottom UVs.
  // Sleeves are typically separate islands.
  // We'll use a simple UV bounding box approach if they aren't separate meshes.
  // Since shirt_baked.glb is ONE mesh, we use a shader to color parts.
  
  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.colors.body, 0.25, delta);
  });

  // Inject shader logic for sleeve coloring if 'raglan' style is active
  materials.lambert1.onBeforeCompile = (shader) => {
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
        // Approximate UV regions for sleeves in shirt_baked.glb
        // Right Sleeve: X > 0.7 or specific regions
        // Left Sleeve: X < 0.3 or specific regions
        // Note: These are heuristic for shirt_baked.glb
        if (vMapUv.x < 0.28 || vMapUv.x > 0.72 || vMapUv.y > 0.85) {
          diffuseColor.rgb = uSleeveColor;
        }
      }
      `
    );
  };

  // Sync uniforms on every frame
  useFrame(() => {
    if (materials.lambert1.userData.shader) {
      materials.lambert1.userData.shader.uniforms.uSleeveColor.value.set(snap.colors.sleeves);
      materials.lambert1.userData.shader.uniforms.uIsRaglan.value = snap.style === 'raglan' ? 1.0 : 0.0;
    }
  });

  // Re-inject if shader was lost or style changed
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
        if (vMapUv.x < 0.28 || vMapUv.x > 0.72 || vMapUv.y > 0.65) {
          diffuseColor.rgb = uSleeveColor;
        }
      }
      `
    );
  };

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

        <Decal
          position={snap.textPosition}
          rotation={snap.textRotation}
          scale={snap.textScale}
        >
          <RenderTexture attach="map">
            <PerspectiveCamera makeDefault manual aspect={1} position={[0, 0, 5]} />
            <color attach="background" args={[snap.style === 'raglan' ? snap.colors.body : snap.colors.body]} />
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
