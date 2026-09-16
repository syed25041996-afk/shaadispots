import React, { useLayoutEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Hall } from '../../types/hall';

interface Hall3DModelProps {
  url: string;
  hall: Hall;
}

export const Hall3DModel: React.FC<Hall3DModelProps> = ({ url, hall }) => {
  const { scene } = useGLTF(url);
  const modelGroupRef = useRef<THREE.Group>(null);

  // AUTO-FIT: Center & Normalize scale based on Hall Dimensions
  useLayoutEffect(() => {
    if (!scene) return;

    // Clone scene to avoid mutating cached gltf
    const cloned = scene.clone();

    // Compute original bounding box
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Target max dimensions in the 3D viewport (derived from hall length/width)
    const targetLength = hall.dimensions.length || 40;
    const maxSourceDim = Math.max(size.x, size.y, size.z);

    // Compute normalization scale factor
    const scaleFactor = maxSourceDim > 0 ? targetLength / maxSourceDim : 1;

    if (modelGroupRef.current) {
      modelGroupRef.current.clear();

      // Adjust model so its center sits at (0, y=0, 0)
      cloned.position.x = -center.x * scaleFactor;
      cloned.position.y = -box.min.y * scaleFactor; // align bottom to ground (y=0)
      cloned.position.z = -center.z * scaleFactor;
      cloned.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // Enable shadows on meshes
      cloned.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      modelGroupRef.current.add(cloned);
    }
  }, [scene, hall.dimensions]);

  return (
    <group name="LoadedGLTFHall">
      {/* Container holding normalized & auto-centered GLB model */}
      <group ref={modelGroupRef} />

      {/* Surrounding Ambient Warmth & Polished Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[hall.dimensions.width * 2, hall.dimensions.length * 2]} />
        <meshStandardMaterial color="#f7f3ed" roughness={0.3} metalness={0.05} />
      </mesh>
    </group>
  );
};

