import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Hall } from '../../types/hall';

/**
 * Placeholder texture URLs for the procedural wedding hall scene.
 * Trivial to replace with local or custom assets.
 */
export const textures = {
  floor: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1024&q=75', // Warm marble flooring
  walls: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1024&q=75', // Subtle cream wall plaster
  stageBackdrop: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1024&q=75', // Royal wedding stage backdrop
  // tablecloths: Solid cream material without texture for optimal performance
};

interface Hall3DProceduralProps {
  hall: Hall;
}

// Reusable single table with 6 chairs
const BanquetTable: React.FC<{ x: number; z: number }> = React.memo(({ x, z }) => {
  return (
    <group position={[x, 0, z]}>
      {/* Table Top & Drape (solid cream material) */}
      <mesh position={[0, 0.82, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.08, 20]} />
        <meshStandardMaterial color="#fdfbf7" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.41, 0]} receiveShadow>
        <cylinderGeometry args={[1.18, 1.28, 0.78, 20]} />
        <meshStandardMaterial color="#f8f4ec" roughness={0.5} />
      </mesh>

      {/* Gold Rim / Accent Band */}
      <mesh position={[0, 0.8, 0]}>
        <torusGeometry args={[1.21, 0.02, 6, 24]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Centerpiece: Brass Vase with Rose Arrangement */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.16, 0.32, 12]} />
        <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.25, 0]} castShadow>
        <sphereGeometry args={[0.26, 12, 12]} />
        <meshStandardMaterial color="#be123c" roughness={0.6} />
      </mesh>

      {/* 6 Velvet Chairs around table */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * Math.PI * 2) / 6;
        const chairX = Math.cos(angle) * 1.75;
        const chairZ = Math.sin(angle) * 1.75;
        return (
          <group
            key={i}
            position={[chairX, 0, chairZ]}
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            {/* Seat */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.44, 0.08, 0.44]} />
              <meshStandardMaterial color="#881337" roughness={0.4} />
            </mesh>
            {/* Backrest with gold frame */}
            <mesh position={[0, 0.76, 0.19]} castShadow>
              <boxGeometry args={[0.42, 0.54, 0.05]} />
              <meshStandardMaterial color="#881337" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.76, 0.2]}>
              <boxGeometry args={[0.46, 0.58, 0.02]} />
              <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Chair Legs */}
            {[-0.18, 0.18].map((lx) =>
              [-0.18, 0.18].map((lz) => (
                <mesh key={`${lx}-${lz}`} position={[lx, 0.22, lz]}>
                  <cylinderGeometry args={[0.02, 0.02, 0.44, 6]} />
                  <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
                </mesh>
              ))
            )}
          </group>
        );
      })}
    </group>
  );
});

// Chandelier model with soft warm light
const Chandelier: React.FC<{ x: number; y: number; z: number }> = ({ x, y, z }) => {
  return (
    <group position={[x, y, z]}>
      {/* Hanging Chain */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.6, 6]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Central Ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.08, 8, 24]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Crystal pendants ring */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[1.1, 0.4, 0.6, 16, 1, true]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.2}
          transparent
          opacity={0.75}
        />
      </mesh>
      {/* Glowing core sphere */}
      <mesh position={[0, -0.15, 0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial
          color="#fef08a"
          emissive="#fef08a"
          emissiveIntensity={1.8}
          roughness={0.1}
        />
      </mesh>
      {/* Soft warm point light */}
      <pointLight color="#fed7aa" intensity={1.5} distance={18} decay={2} />
    </group>
  );
};

export const Hall3DProcedural: React.FC<Hall3DProceduralProps> = ({ hall }) => {
  const { width, length, height } = hall.dimensions;
  const halfW = width / 2;
  const halfL = length / 2;

  // Load textures safely with memoized TextureLoader
  const loadedTextures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    const floorTex = loader.load(textures.floor);
    floorTex.wrapS = THREE.RepeatWrapping;
    floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(Math.max(4, Math.round(width / 4)), Math.max(6, Math.round(length / 4)));

    const wallTex = loader.load(textures.walls);
    wallTex.wrapS = THREE.RepeatWrapping;
    wallTex.wrapT = THREE.RepeatWrapping;
    wallTex.repeat.set(Math.max(3, Math.round(width / 6)), 2);

    const backdropTex = loader.load(textures.stageBackdrop);

    return { floorTex, wallTex, backdropTex };
  }, [width, length]);

  // Calculate grid of tables according to tableCount and hall dimensions
  const tablePositions = useMemo(() => {
    const positions: { x: number; z: number }[] = [];
    const count = Math.min(hall.tableCount, 48); // Cap for 3D performance

    // Keep aisle open in center (x = 0)
    // Tables spread across left and right sides
    const rows = Math.ceil(count / 4);
    const zStart = -halfL * 0.45;
    const zEnd = halfL * 0.65;
    const zStep = (zEnd - zStart) / Math.max(rows, 1);

    const xOffsets = [-halfW * 0.65, -halfW * 0.28, halfW * 0.28, halfW * 0.65];

    let placed = 0;
    for (let r = 0; r < rows && placed < count; r++) {
      const z = zStart + r * zStep;
      for (let c = 0; c < 4 && placed < count; c++) {
        const x = xOffsets[c];
        positions.push({ x, z });
        placed++;
      }
    }
    return positions;
  }, [hall.tableCount, halfW, halfL]);

  // Chandeliers positions along center and sides
  const chandeliers = useMemo(() => {
    const items = [];
    const chandelierCount = Math.max(3, Math.floor(length / 10));
    const step = (halfL * 1.3) / chandelierCount;
    for (let i = 0; i < chandelierCount; i++) {
      const z = -halfL * 0.5 + i * step;
      items.push({ x: 0, y: height - 1.2, z });
    }
    return items;
  }, [length, halfL, height]);

  return (
    <group name="ProceduralWeddingHall">
      {/* 1. FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial
          map={loadedTextures.floorTex}
          color="#f5efe6"
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>

      {/* Red Carpet Aisle running from entrance to stage */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, halfL * 0.1]} receiveShadow>
        <planeGeometry args={[3.2, length * 0.8]} />
        <meshStandardMaterial color="#881337" roughness={0.8} />
      </mesh>
      {/* Gold Border for Red Carpet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.65, 0.02, halfL * 0.1]}>
        <planeGeometry args={[0.08, length * 0.8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.65, 0.02, halfL * 0.1]}>
        <planeGeometry args={[0.08, length * 0.8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* 2. CEILING */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#faf5ef" roughness={0.7} />
      </mesh>

      {/* 3. WALLS */}
      {/* Back Wall (Behind Stage at -halfL) */}
      <mesh position={[0, height / 2, -halfL]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={loadedTextures.wallTex} color="#fdfbf7" roughness={0.6} />
      </mesh>

      {/* Front Wall (Entrance at +halfL) with doorway cutout */}
      <mesh position={[-halfW / 2 - 2, height / 2, halfL]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[halfW - 2, height]} />
        <meshStandardMaterial map={loadedTextures.wallTex} color="#fdfbf7" roughness={0.6} />
      </mesh>
      <mesh position={[halfW / 2 + 2, height / 2, halfL]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[halfW - 2, height]} />
        <meshStandardMaterial map={loadedTextures.wallTex} color="#fdfbf7" roughness={0.6} />
      </mesh>
      <mesh position={[0, height - 1, halfL]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[4, 2]} />
        <meshStandardMaterial map={loadedTextures.wallTex} color="#fdfbf7" roughness={0.6} />
      </mesh>

      {/* Left Wall at -halfW */}
      <mesh position={[-halfW, height / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial map={loadedTextures.wallTex} color="#fdfbf7" roughness={0.6} />
      </mesh>

      {/* Right Wall at +halfW (if hall.hasRooms, we add an open archway to adjacent dining room) */}
      {!hall.hasRooms ? (
        <mesh position={[halfW, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[length, height]} />
          <meshStandardMaterial map={loadedTextures.wallTex} color="#fdfbf7" roughness={0.6} />
        </mesh>
      ) : (
        /* Wall with opening to second dining room */
        <group position={[halfW, 0, 0]}>
          <mesh position={[0, height / 2, -halfL / 2 - 3]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[halfL - 3, height]} />
            <meshStandardMaterial map={loadedTextures.wallTex} color="#fdfbf7" roughness={0.6} />
          </mesh>
          <mesh position={[0, height / 2, halfL / 2 + 3]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[halfL - 3, height]} />
            <meshStandardMaterial map={loadedTextures.wallTex} color="#fdfbf7" roughness={0.6} />
          </mesh>
          <mesh position={[0, height - 1, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[6, 2]} />
            <meshStandardMaterial map={loadedTextures.wallTex} color="#fdfbf7" roughness={0.6} />
          </mesh>

          {/* Adjacent Dining Hall / Cocktail Room */}
          <group position={[8, 0, 0]}>
            {/* Dining Room Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
              <planeGeometry args={[16, 18]} />
              <meshStandardMaterial color="#ede4d8" roughness={0.3} />
            </mesh>
            {/* Dining Room Ceiling */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height * 0.9, 0]}>
              <planeGeometry args={[16, 18]} />
              <meshStandardMaterial color="#faf5ef" roughness={0.7} />
            </mesh>
            {/* Dining Room Outer Wall */}
            <mesh position={[8, (height * 0.9) / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[18, height * 0.9]} />
              <meshStandardMaterial color="#f5efe6" roughness={0.6} />
            </mesh>
            {/* Buffet Counter Table */}
            <mesh position={[6.5, 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.6, 1.0, 14]} />
              <meshStandardMaterial color="#78350f" roughness={0.3} />
            </mesh>
            {/* Warm soft light in dining room */}
            <pointLight position={[0, height * 0.7, 0]} color="#fde68a" intensity={1.2} distance={20} />
          </group>
        </group>
      )}

      {/* 4. GRAND WEDDING STAGE PLATFORM */}
      <group position={[0, 0, -halfL + 5]}>
        {/* Raised Stage Platform */}
        <mesh position={[0, 0.45, 0]} receiveShadow castShadow>
          <boxGeometry args={[width * 0.75, 0.9, 8]} />
          <meshStandardMaterial color="#78350f" roughness={0.3} />
        </mesh>
        {/* Stage carpet */}
        <mesh position={[0, 0.91, 0]}>
          <boxGeometry args={[width * 0.73, 0.02, 7.8]} />
          <meshStandardMaterial color="#9f1239" roughness={0.7} />
        </mesh>
        {/* Stage Gold Border Step */}
        <mesh position={[0, 0.45, 4.02]}>
          <boxGeometry args={[width * 0.75, 0.9, 0.05]} />
          <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Stage Floral Backdrop Wall with Photo Texture */}
        <mesh position={[0, 3.8, -3.6]} castShadow>
          <boxGeometry args={[width * 0.65, 5.0, 0.3]} />
          <meshStandardMaterial
            map={loadedTextures.backdropTex}
            color="#ffffff"
            roughness={0.4}
          />
        </mesh>

        {/* Ornate Gold Mandap Pillars on Stage */}
        {[-width * 0.28, -width * 0.1, width * 0.1, width * 0.28].map((px, idx) => (
          <group key={idx} position={[px, 0.9, -3.2]}>
            <mesh position={[0, 2.4, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.26, 4.8, 16]} />
              <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.25} />
            </mesh>
            {/* Top Capital */}
            <mesh position={[0, 4.8, 0]}>
              <boxGeometry args={[0.6, 0.2, 0.6]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
            </mesh>
          </group>
        ))}

        {/* Royal Throne Sofa on Stage */}
        <group position={[0, 0.9, -1.8]}>
          {/* Base */}
          <mesh position={[0, 0.35, 0]} castShadow>
            <boxGeometry args={[2.8, 0.6, 1.1]} />
            <meshStandardMaterial color="#d4af37" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Seat Cushion */}
          <mesh position={[0, 0.55, 0]}>
            <boxGeometry args={[2.6, 0.25, 1.0]} />
            <meshStandardMaterial color="#881337" roughness={0.5} />
          </mesh>
          {/* Ornate High Backrest */}
          <mesh position={[0, 1.25, -0.45]} castShadow>
            <boxGeometry args={[2.8, 1.3, 0.2]} />
            <meshStandardMaterial color="#881337" roughness={0.5} />
          </mesh>
          <mesh position={[0, 1.25, -0.44]}>
            <boxGeometry args={[2.9, 1.4, 0.05]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* Stage Warm Spotlight targeting the Throne */}
        <spotLight
          position={[0, height - 0.5, 3]}
          target-position={[0, 1.5, -1.8]}
          color="#fef08a"
          intensity={3.5}
          angle={0.65}
          penumbra={0.5}
          castShadow
        />
      </group>

      {/* 5. DECORATED ENTRANCE ARCHWAY */}
      <group position={[0, 0, halfL - 1.5]}>
        {/* Left Column */}
        <mesh position={[-2.2, 2.2, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.3, 4.4, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Right Column */}
        <mesh position={[2.2, 2.2, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.3, 4.4, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Arch Top Curve */}
        <mesh position={[0, 4.2, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[4.8, 0.45, 0.5]} />
          <meshStandardMaterial color="#881337" roughness={0.4} />
        </mesh>
        {/* Floral garland overlay */}
        <mesh position={[0, 4.1, 0.28]}>
          <boxGeometry args={[4.6, 0.25, 0.15]} />
          <meshStandardMaterial color="#e11d48" roughness={0.7} />
        </mesh>
      </group>

      {/* 6. BANQUET TABLES GRID */}
      {tablePositions.map((pos, idx) => (
        <BanquetTable key={`table-${idx}`} x={pos.x} z={pos.z} />
      ))}

      {/* 7. CHANDELIERS ALONG CEILING */}
      {chandeliers.map((c, idx) => (
        <Chandelier key={`chandelier-${idx}`} x={c.x} y={c.y} z={c.z} />
      ))}
    </group>
  );
};

