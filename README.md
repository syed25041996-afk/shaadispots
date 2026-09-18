# ShaadiSpots 💍

> **ShaadiSpots** is a responsive web application and directory for marriage halls, royal banquet venues, and heritage wedding spaces, featuring an interactive 3D spatial preview for every venue.

Built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **React Router**, **TanStack Query**, and **Three.js / React Three Fiber (`@react-three/fiber` & `@react-three/drei`)**.

---

## Features

- **🏛️ Venue Directory**: Discover 14+ realistic banquet halls and wedding palaces with photos, capacities, pricing, verified amenities, and reviews.
- **🧭 Interactive 3D Spatial Walkthrough**:
  - **Auto-Fit Engine**: Real `.glb` models are automatically centered, scaled, and grounded via bounding box normalization.
  - **Procedural 3D Hall Generation**: Venues without a `.glb` scan dynamically generate an accurate 3D hall derived from physical dimensions, guest capacity, and banquet table count.
  - **Orbit Mode**: Free-look orbital camera with polar angle constraints (preventing camera from clipping below floor).
  - **First-Person Walkthrough Mode**: Seamless WASD navigation and mouse-look via `PointerLockControls`.
  - **Camera Presets**: Instant smooth transitions to "Entrance", "Stage View", "Top Down", and "Table View".
  - **Code-Split**: Loaded via `React.lazy` and wrapped in `Suspense` with an inner `ErrorBoundary` that automatically falls back to the procedural viewer if a 3D asset fails.
- **⚡ Strict Service Architecture**: All data access flows through `src/services/hallService.ts` (`getAllHalls`, `getHallById`, `createEnquiry`), returning Promises with simulated network latency. Ready for a drop-in replacement with Firebase Firestore without touching any UI component.
- **🔍 Filter & Sort Controls**: Real-time filtering by text search, area locality, capacity range slider, maximum price, pure-veg toggle, rooms availability, amenities checklists, and sorting.
- **📩 Sticky Enquiry Desk**: Full event enquiry form with date picker and guest count, delivering instant toast confirmation notifications.
- **📱 Mobile-First & Accessible**: Fully responsive layout with mobile hamburger navigation, accessible forms, semantic HTML, and custom wedding palette (royal maroon, gold, champagne, and cream).

---

## File Structure

```text
wedding-halls-website/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── scripts/
│   └── generateModels.js             # Generates valid sample .glb models
├── public/
│   ├── favicon.svg
│   └── models/
│       ├── banquet-a.glb             # Grand Ballroom sample 3D model
│       ├── banquet-b.glb             # Contemporary Convention Hall model
│       └── room-generic.glb          # Heritage Dining Hall model
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── hall.ts                   # Hall, Dimensions, Enquiry & Filter types
    ├── data/
    │   └── halls.ts                  # 14 realistic dummy venues in Bengaluru (Bangalore)
    ├── services/
    │   └── hallService.ts            # Single async service layer
    ├── context/
    │   └── ToastContext.tsx          # Feedback toast notification system
    ├── hooks/
    │   ├── useHalls.ts               # TanStack Query hook with caching
    │   └── useHall.ts                # TanStack Query hook for single venue
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.tsx            # Sticky header & mobile drawer
    │   │   ├── Footer.tsx            # City areas, links & concierge info
    │   │   ├── Skeleton.tsx          # Card & detail skeleton loaders
    │   │   └── Badge.tsx             # Category & status pill badges
    │   ├── halls/
    │   │   ├── HallCard.tsx          # Venue card with 3D button & info
    │   │   ├── HallFilters.tsx       # Search, area, price & capacity filters
    │   │   ├── HallGallery.tsx       # Thumbnails & full-screen lightbox
    │   │   ├── HallSpecs.tsx         # Physical dimensions & specs grid
    │   │   ├── HallReviews.tsx       # Rating breakdown & map placeholder
    │   │   └── EnquiryForm.tsx       # Sticky booking form calling service
    │   ├── home/
    │   │   ├── HeroSearch.tsx        # Hero with background & search bar
    │   │   ├── FeaturedCarousel.tsx  # Horizontal featured venues carousel
    │   │   ├── QuickFilterChips.tsx  # Quick area filter buttons
    │   │   └── StatsStrip.tsx        # 120+ venues, 15k couples stats
    │   └── viewer3d/
    │       ├── Hall3DViewer.tsx      # Main canvas: Physics, Environment, SoftShadows, PostProcessing
    │       ├── Hall3DModel.tsx       # GLTF loader with auto-fit bounding box
    │       ├── Hall3DProcedural.tsx  # Procedural hall with polished marble floor & warm lighting
    │       ├── CameraControls.tsx    # OrbitControls & preset transitions
    │       ├── ViewerOverlay.tsx     # HUD overlay, people counter, talking badge & controls
    │       ├── WebGLFallback.tsx     # Graceful fallback when WebGL is disabled
    │       ├── character/
    │       │   ├── CharacterRig.tsx      # Modular character abstraction (procedural vs gltf)
    │       │   ├── ProceduralAvatar.tsx   # Articulated humanoid primitive rig & procedural anims
    │       │   ├── PlayerController.tsx   # Rapier KinematicCharacterController, jump & seating
    │       │   ├── ThirdPersonCamera.tsx  # Collision raycasting, mouse orbit & 1st/3rd toggle
    │       │   ├── types.ts               # Animation states, archetypes & input types
    │       │   └── materialPalette.ts     # Shared material cache for 60fps with 40+ NPCs
    │       ├── seating/
    │       │   ├── SeatingManager.ts      # Procedural seat anchors, occupancy & exit spots
    │       │   └── SeatPrompt.tsx         # Floating 3D interaction indicators ("Press E to sit")
    │       ├── npc/
    │       │   ├── NPCGuest.tsx           # Autonomous NPC entity (state machine, LOD & freeze)
    │       │   ├── NPCManager.tsx         # Population spawner (30-55 NPCs) & shadow LOD
    │       │   └── npcBehavior.ts         # Seeding, state transitions & obstacle avoidance
    │       ├── conversation/
    │       │   ├── DialogueOverlay.tsx    # 2D HTML dialogue panel with typewriter effect
    │       │   └── useDialogue.ts         # Dialogue progression & table auto-chat
    │       ├── controls/
    │       │   ├── VirtualJoystick.tsx    # Mobile virtual touch joystick & action buttons
    │       │   └── useInputControls.ts    # Unified keyboard and touch input listener
    │       └── physics/
    │           └── HallColliders.tsx      # Rapier rigidbodies for floor, walls, stage & tables
    └── pages/
        ├── HomePage.tsx              # Home landing page
        ├── ListingsPage.tsx          # Venue directory with sidebar filters
        ├── HallDetailPage.tsx        # Venue details & enquiry page
        ├── Hall3DPage.tsx            # Fullscreen 3D spatial route with progress loader
        ├── AboutPage.tsx             # About story & 3D digital twin philosophy
        ├── ContactPage.tsx           # Concierge desk, partner listing & FAQs
        └── NotFoundPage.tsx          # 404 page
```

---

## Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended, verified on Node v20/v24)
- npm or yarn

### 1. Installation
```bash
cd "d:/Ollama projects/wedding halls website"
npm install
```

### 2. Generate 3D Sample Models (Already built in `/public/models/`)
To re-generate the sample `.glb` models at any time:
```bash
node scripts/generateModels.js
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## Swapping in real 3D models

To replace the dummy models with real architectural scans or LiDAR digital twins of your venues:

1. **Upload your `.glb` file**: Upload a Draco-compressed `.glb` file to **Firebase Storage** (or your preferred CDN / public bucket).
2. **Assign `modelUrl` on the Hall**: In `src/data/halls.ts` (or your Firestore document):
   ```ts
   {
     id: 'hall-1',
     name: 'The Grand Emerald Palace',
     modelUrl: 'https://firebasestorage.googleapis.com/v0/b/.../grand-emerald.glb',
     dimensions: { width: 28, length: 50, height: 7.5 },
     tableCount: 36,
     // ... other fields
   }
   ```
3. **Automatic Normalization**: The viewer's auto-fit system (`Hall3DModel.tsx`) will compute the model's bounding box (`THREE.Box3`), scale it to fit the viewport dimensions, and ground it at `y = 0` automatically — **no code changes required**.
4. **File Size Recommendations**:
   - Keep uncompressed `.glb` files under **~5MB** each for fast initial mobile downloads.
   - For high-polygon scans (>100k polygons), compress using **Draco** geometry compression via tools like `gltf-pipeline` or Blender (`File > Export > glTF 2.0 > Enable Draco Compression`).
5. **Draco Decoder Setup**: If using Draco-compressed models, copy the Draco decoder files (`draco_wasm_wrapper.js`, `draco_decoder.wasm`) into your `/public/draco/` folder so `useGLTF` can decode them in a background Web Worker.
6. **Graceful Fallback**: If a URL is ever invalid, deleted, or blocked by network CORS, the built-in `ModelErrorBoundary` automatically catches the error and seamlessly renders the procedural 3D hall with accurate dimensions and table counts instead of showing a blank screen.

---

## 🎮 Interactive 3D Walkthrough Controls

The 3D Venue Simulator features a third-person physics-driven character controller, procedural animations, seating anchors, autonomous NPC guests, and dialogue systems.

### Desktop Controls
| Action | Key / Input | Notes |
| :--- | :--- | :--- |
| **Move** | `W` `A` `S` `D` or Arrow Keys | Character smoothly lerps rotation to travel direction |
| **Run** | `Shift` (hold) | Faster speed (7.2 m/s), dynamic forward lean & extended leg stride |
| **Jump** | `Space` | Vertical impulse with ground-check raycast |
| **Interact / Sit** | `E` | Sits at nearest empty chair or initiates conversation with an NPC |
| **Stand Up** | `W` or `Space` | Smoothly tweens character back to standing spot behind chair |
| **Swivel in Chair** | `A` / `D` | Rotates character ±60° while seated |
| **Dialogue Advance** | `Space` or Click | Advances typewriter dialogue line letter-by-letter |
| **Dialogue Close** | `ESC` | Ends dialogue and restores third-person camera |
| **Camera Orbit** | Left Mouse Drag | Orbits camera around character when not pointer-locked |
| **Mouse Look (FPS)** | Crosshair Icon or Canvas Click | Locks pointer for direct mouse look; `ESC` to release |
| **1st / 3rd Person View** | `V` or Camera Icon | Toggles between over-the-shoulder third person and eye-level first person |
| **Camera Collision** | *Automatic* | Physics raycast pulls camera forward to prevent clipping through walls |

### Mobile Touch Controls
- **Virtual Joystick (Left Thumb)**: Smooth 360° analog thumbstick for walking and steering.
- **Action Buttons (Right Thumb)**:
  - **Action Button**: Contextual button to sit down at chairs or talk to NPCs.
  - **Jump / Stand Button**: Performs jumps while walking, or stands up when seated.
- **Camera Orbit**: Drag with one finger on the upper canvas area to look around.

---

## 📦 Required NPM Packages

To install the physics and post-processing modules used for the 3D walkthrough:

```bash
npm i @react-three/rapier@1.5.0 @react-three/postprocessing@2.16.3 postprocessing
```

> **Note**: `@react-three/rapier@1.5.0` and `@react-three/postprocessing@2.16.3` are matched to React 18 and `@react-three/fiber@8.x`.

---

## 🕺 Swapping in Mixamo Humanoid Characters

The character system is strictly decoupled into a mesh representation layer (`CharacterRig.tsx`) and a physics/state layer (`PlayerController.tsx`, `NPCGuest.tsx`). To replace the procedural primitive rig with photorealistic Mixamo 3D models:

1. **Download from Mixamo**:
   - Pick any humanoid avatar on [Mixamo](https://www.mixamo.com/).
   - Download the model in **T-Pose** (FBX/glTF).
   - Download the standard animation clips (without skin):
     - `Idle` (name clip: `idle`)
     - `Walking` (in-place, name clip: `walk`)
     - `Running` (in-place, name clip: `run`)
     - `Jumping` (name clip: `jump`)
     - `Sitting` (name clip: `sit`)
     - `Talking` (name clip: `talk`)

2. **Pack into GLB**:
   - In Blender, import the avatar and add each action into the NLA editor.
   - Export as a Draco-compressed `.glb` to `/public/models/avatars/guest-mixamo.glb`.

3. **Activate the GLTF Rig**:
   In `src/components/viewer3d/character/CharacterRig.tsx`:
   ```tsx
   <CharacterRig
     rig="gltf"
     gltfModelUrl="/models/avatars/guest-mixamo.glb"
     animState={animState}
     castShadow={castShadow}
   />
   ```
   The existing `animState` machine (`idle`, `walk`, `run`, `jump`, `sit`, `talk`) maps directly to the GLTF animation actions via `useAnimations()`, requiring zero changes to movement physics, Rapier colliders, seating tweening, or dialogue interactions.

---

## Switching to Firebase Firestore

When you are ready to connect to a live Firebase backend:
1. Initialize Firebase in `src/services/firebase.ts`.
2. Open `src/services/hallService.ts` and replace the simulated promises with:
   - `getAllHalls`: `getDocs(collection(db, 'halls'))`
   - `getHallById`: `getDoc(doc(db, 'halls', id))`
   - `createEnquiry`: `addDoc(collection(db, 'enquiries'), { hallId, ...payload, createdAt: serverTimestamp() })`
3. Because all components consume data through `useHalls()`, `useHall()`, and `createEnquiry()`, **zero UI components will require any modification**.

#   s h a a d i s p o t s  
 "# shaadispots"
