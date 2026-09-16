import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import { CameraPreset, ViewMode } from './ViewerOverlay';
import { HallDimensions } from '../../types/hall';

interface CameraControlsProps {
  viewMode: ViewMode;
  currentPreset: CameraPreset;
  dimensions: HallDimensions;
}

export const CameraControls: React.FC<CameraControlsProps> = ({
  viewMode,
  currentPreset,
  dimensions,
}) => {
  const { camera } = useThree();
  const orbitRef = useRef<any>(null);
  const pointerLockRef = useRef<any>(null);

  // Target camera state for lerping to presets in Orbit mode
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 15, 30));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 2, 0));
  const isTransitioning = useRef<boolean>(false);

  // Keyboard keys for Walkthrough mode
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // Calculate preset camera coordinates based on hall dimensions
  const getPresetCoordinates = (preset: CameraPreset) => {
    const halfLength = dimensions.length / 2;
    const height = dimensions.height;

    switch (preset) {
      case 'entrance':
        return {
          position: new THREE.Vector3(0, 2.5, halfLength * 0.85),
          lookAt: new THREE.Vector3(0, 2, -halfLength * 0.6),
        };
      case 'stage':
        return {
          position: new THREE.Vector3(0, 2.5, -halfLength * 0.75),
          lookAt: new THREE.Vector3(0, 1.8, halfLength * 0.3),
        };
      case 'topDown':
        return {
          position: new THREE.Vector3(0, Math.max(height * 2.5, 24), 0.1),
          lookAt: new THREE.Vector3(0, 0, 0),
        };
      case 'table':
        return {
          position: new THREE.Vector3(-dimensions.width * 0.2, 1.4, 0),
          lookAt: new THREE.Vector3(0, 2, -halfLength * 0.7),
        };
      default:
        return {
          position: new THREE.Vector3(0, 15, halfLength * 1.1),
          lookAt: new THREE.Vector3(0, 2, 0),
        };
    }
  };

  // Trigger position transition when preset changes
  useEffect(() => {
    if (viewMode === 'orbit') {
      const coords = getPresetCoordinates(currentPreset);
      targetCamPos.current.copy(coords.position);
      targetLookAt.current.copy(coords.lookAt);
      isTransitioning.current = true;
    }
  }, [currentPreset, viewMode, dimensions]);

  // When switching to walkthrough mode, place camera at entrance eye level
  useEffect(() => {
    if (viewMode === 'walkthrough') {
      camera.position.set(0, 1.7, (dimensions.length / 2) * 0.75);
      camera.lookAt(0, 1.7, 0);
      isTransitioning.current = false;
    }
  }, [viewMode, camera, dimensions]);

  // Listen for WASD / Arrow keys for Walkthrough mode
  useEffect(() => {
    if (viewMode !== 'walkthrough') return;

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveState.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveState.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveState.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveState.current.right = true;
          break;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveState.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveState.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveState.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveState.current.right = false;
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [viewMode]);

  // Frame update: Smooth camera lerp in Orbit, or WASD movement in Walkthrough
  useFrame((_, delta) => {
    if (viewMode === 'orbit') {
      if (isTransitioning.current) {
        camera.position.lerp(targetCamPos.current, 0.08);

        if (orbitRef.current) {
          orbitRef.current.target.lerp(targetLookAt.current, 0.08);
          orbitRef.current.update();
        }

        if (camera.position.distanceTo(targetCamPos.current) < 0.1) {
          isTransitioning.current = false;
        }
      }
    } else if (viewMode === 'walkthrough') {
      // Enforce eye-level height
      camera.position.y = 1.7;

      const speed = 7.0 * delta;
      const frontVector = new THREE.Vector3();
      const sideVector = new THREE.Vector3();
      const direction = new THREE.Vector3();

      frontVector.set(
        0,
        0,
        Number(moveState.current.backward) - Number(moveState.current.forward)
      );
      sideVector.set(
        Number(moveState.current.right) - Number(moveState.current.left),
        0,
        0
      );

      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(speed)
        .applyEuler(new THREE.Euler(0, camera.rotation.y, 0));

      camera.position.add(direction);

      // Clamp movement within hall boundary walls
      const halfWidth = dimensions.width / 2 - 1.5;
      const halfLength = dimensions.length / 2 - 1.5;

      camera.position.x = Math.max(-halfWidth, Math.min(halfWidth, camera.position.x));
      camera.position.z = Math.max(-halfLength, Math.min(halfLength, camera.position.z));
    }
  });

  return (
    <>
      {viewMode === 'orbit' ? (
        <OrbitControls
          ref={orbitRef}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2 - 0.04} // NEVER allow camera below floor level
          minPolarAngle={0.05}
          minDistance={3}
          maxDistance={dimensions.length * 2.2}
        />
      ) : (
        <PointerLockControls ref={pointerLockRef} />
      )}
    </>
  );
};

