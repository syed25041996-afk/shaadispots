import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
}
globalThis.FileReader = FileReader;

async function generateModels() {
  const THREE = await import('three');
  const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter.js');

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const modelsDir = path.resolve(__dirname, '../public/models');

  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
  }

  const exporter = new GLTFExporter();

  // Helper to build a table with chairs
  function createTableWithChairs(THREE, x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Table top
    const tableTop = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.2, 0.1, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
    );
    tableTop.position.y = 0.8;
    group.add(tableTop);

    // Table cloth drape
    const cloth = new THREE.Mesh(
      new THREE.CylinderGeometry(1.18, 1.3, 0.75, 16),
      new THREE.MeshStandardMaterial({ color: 0xfef9e7, roughness: 0.5 })
    );
    cloth.position.y = 0.38;
    group.add(cloth);

    // Floral centerpiece
    const vase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.15, 0.3, 8),
      new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 })
    );
    vase.position.y = 1.0;
    group.add(vase);

    const flowers = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.6 })
    );
    flowers.position.y = 1.25;
    group.add(flowers);

    // 6 Chairs around the table
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      const chairGroup = new THREE.Group();
      chairGroup.position.set(Math.cos(angle) * 1.8, 0, Math.sin(angle) * 1.8);
      chairGroup.rotation.y = -angle + Math.PI / 2;

      // Seat
      const seat = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 0.06, 0.45),
        new THREE.MeshStandardMaterial({ color: 0x881337 })
      );
      seat.position.y = 0.45;
      chairGroup.add(seat);

      // Backrest
      const back = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 0.5, 0.05),
        new THREE.MeshStandardMaterial({ color: 0x881337 })
      );
      back.position.set(0, 0.7, 0.2);
      chairGroup.add(back);

      group.add(chairGroup);
    }

    return group;
  }

  // 1. Banquet A: Grand Ballroom
  const sceneA = new THREE.Scene();
  sceneA.name = 'GrandBallroom';

  // Floor
  const floorA = new THREE.Mesh(
    new THREE.BoxGeometry(24, 0.2, 40),
    new THREE.MeshStandardMaterial({ color: 0xe8dfd8, roughness: 0.2, metalness: 0.1 })
  );
  floorA.position.y = -0.1;
  sceneA.add(floorA);

  // Red Carpet aisle
  const carpetA = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.02, 32),
    new THREE.MeshStandardMaterial({ color: 0x9f1239, roughness: 0.8 })
  );
  carpetA.position.set(0, 0.01, 2);
  sceneA.add(carpetA);

  // Wedding Stage
  const stageA = new THREE.Mesh(
    new THREE.BoxGeometry(16, 0.8, 7),
    new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.4, roughness: 0.4 })
  );
  stageA.position.set(0, 0.4, -15);
  sceneA.add(stageA);

  // Stage Backdrop Arch
  const backdropA = new THREE.Mesh(
    new THREE.BoxGeometry(14, 5, 0.4),
    new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.5 })
  );
  backdropA.position.set(0, 3.3, -18);
  sceneA.add(backdropA);

  // Ornate Gold Floral Frame
  const frameA = new THREE.Mesh(
    new THREE.TorusGeometry(3.5, 0.2, 8, 24),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 })
  );
  frameA.position.set(0, 3.8, -17.7);
  sceneA.add(frameA);

  // Stage royal sofa
  const sofaA = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 0.8, 0.9),
    new THREE.MeshStandardMaterial({ color: 0xfde68a, roughness: 0.4 })
  );
  sofaA.position.set(0, 1.2, -15.5);
  sceneA.add(sofaA);

  // Add tables on both sides of aisle
  for (let z = -8; z <= 12; z += 6) {
    sceneA.add(createTableWithChairs(THREE, -6, z));
    sceneA.add(createTableWithChairs(THREE, 6, z));
  }

  // 2. Banquet B: Contemporary Convention Hall
  const sceneB = new THREE.Scene();
  sceneB.name = 'ContemporaryHall';

  // Floor
  const floorB = new THREE.Mesh(
    new THREE.BoxGeometry(26, 0.2, 42),
    new THREE.MeshStandardMaterial({ color: 0xded5cb, roughness: 0.3 })
  );
  floorB.position.y = -0.1;
  sceneB.add(floorB);

  // Stage
  const stageB = new THREE.Mesh(
    new THREE.BoxGeometry(18, 0.9, 8),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 })
  );
  stageB.position.set(0, 0.45, -16);
  sceneB.add(stageB);

  // LED Screen Backdrop
  const ledScreen = new THREE.Mesh(
    new THREE.BoxGeometry(14, 5.5, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.1, metalness: 0.2 })
  );
  ledScreen.position.set(0, 3.65, -19);
  sceneB.add(ledScreen);

  // Stage Columns
  for (let x of [-7.5, 7.5]) {
    const column = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 6, 12),
      new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.7, roughness: 0.3 })
    );
    column.position.set(x, 3, -17);
    sceneB.add(column);
  }

  // Modern banquet tables arrangement
  for (let z = -9; z <= 13; z += 5.5) {
    for (let x of [-7, 0, 7]) {
      if (x === 0 && z < 0) continue; // Keep center aisle partially open
      sceneB.add(createTableWithChairs(THREE, x, z));
    }
  }

  // 3. Room Generic: Intimate Heritage Ballroom
  const sceneC = new THREE.Scene();
  sceneC.name = 'HeritageRoom';

  // Floor (Teak wood finish)
  const floorC = new THREE.Mesh(
    new THREE.BoxGeometry(18, 0.2, 28),
    new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.4 })
  );
  floorC.position.y = -0.1;
  sceneC.add(floorC);

  // Heritage Arch Stage
  const stageC = new THREE.Mesh(
    new THREE.BoxGeometry(12, 0.6, 5),
    new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.5 })
  );
  stageC.position.set(0, 0.3, -10);
  sceneC.add(stageC);

  // Backdrop
  const backdropC = new THREE.Mesh(
    new THREE.BoxGeometry(10, 4, 0.3),
    new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.6 })
  );
  backdropC.position.set(0, 2.6, -12);
  sceneC.add(backdropC);

  // 6 Intimate dining tables
  for (let z = -4; z <= 8; z += 5) {
    sceneC.add(createTableWithChairs(THREE, -4.5, z));
    sceneC.add(createTableWithChairs(THREE, 4.5, z));
  }

  // Export scenes to GLB files
  const scenesToExport = [
    { scene: sceneA, filename: 'banquet-a.glb' },
    { scene: sceneB, filename: 'banquet-b.glb' },
    { scene: sceneC, filename: 'room-generic.glb' },
  ];

  for (const item of scenesToExport) {
    const glbBuffer = await new Promise((resolve, reject) => {
      exporter.parse(
        item.scene,
        (res) => resolve(res),
        (err) => reject(err),
        { binary: true }
      );
    });

    const destPath = path.join(modelsDir, item.filename);
    fs.writeFileSync(destPath, Buffer.from(glbBuffer));
    console.log(`Generated: ${item.filename} (${glbBuffer.byteLength} bytes)`);
  }

  console.log('All 3D models successfully generated in public/models/');
}

generateModels().catch(console.error);

