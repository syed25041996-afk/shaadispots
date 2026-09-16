# ShaadiSpots 💍

**ShaadiSpots** is a responsive web application and directory for marriage halls, royal banquet venues, and heritage wedding spaces, featuring an interactive 3D spatial preview for every venue.

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
    │       ├── Hall3DViewer.tsx      # Code-split 3D canvas & layout
    │       ├── Hall3DModel.tsx       # GLTF loader with auto-fit bounding box
    │       ├── Hall3DProcedural.tsx  # Procedural hall derived from dimensions
    │       ├── CameraControls.tsx    # OrbitControls & First-person WASD
    │       ├── ViewerOverlay.tsx     # HUD overlay, mode switch & presets
    │       └── WebGLFallback.tsx     # Graceful fallback when WebGL disabled
    └── pages/
        ├── HomePage.tsx              # Home landing page
        ├── ListingsPage.tsx          # Venue directory with sidebar filters
        ├── HallDetailPage.tsx        # Venue details & enquiry page
        ├── Hall3DPage.tsx            # Fullscreen 3D spatial route (/halls/:id/3d)
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

## Switching to Firebase Firestore

When you are ready to connect to a live Firebase backend:
1. Initialize Firebase in `src/services/firebase.ts`.
2. Open `src/services/hallService.ts` and replace the simulated promises with:
   - `getAllHalls`: `getDocs(collection(db, 'halls'))`
   - `getHallById`: `getDoc(doc(db, 'halls', id))`
   - `createEnquiry`: `addDoc(collection(db, 'enquiries'), { hallId, ...payload, createdAt: serverTimestamp() })`
3. Because all components consume data through `useHalls()`, `useHall()`, and `createEnquiry()`, **zero UI components will require any modification**.

#   s h a a d i s p o t s 
 
 "# shaadispots" 
