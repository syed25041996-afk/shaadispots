import React, { useState, useRef, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Hall } from '../../types/hall';
import { Hall3DModel } from './Hall3DModel';
import { Hall3DProcedural } from './Hall3DProcedural';
import { CameraControls } from './CameraControls';
import { ViewerOverlay, CameraPreset, ViewMode } from './ViewerOverlay';
import { WebGLFallback } from './WebGLFallback';
import { Loader2 } from 'lucide-react';

interface Hall3DViewerProps {
  hall: Hall;
}

// Inner Error Boundary to fall back from a broken .glb file to the procedural scene
class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Failed to load 3D GLB model; gracefully falling back to procedural hall:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 3D Canvas Loading Spinner
const CanvasLoader = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/85 z-20 text-white backdrop-blur-sm">
    <div className="w-16 h-16 rounded-full border-4 border-gold-500/20 border-t-gold-400 animate-spin flex items-center justify-center mb-4">
      <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
    </div>
    <p className="font-serif text-lg text-cream-100 font-medium">Preparing 3D Venue Walkthrough...</p>
    <p className="text-xs text-stone-400 mt-1">Generating lighting, tables, and stage layout</p>
  </div>
);

export const Hall3DViewer: React.FC<Hall3DViewerProps> = ({ hall }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('orbit');
  const [currentPreset, setCurrentPreset] = useState<CameraPreset>('entrance');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [webGLError, setWebGLError] = useState<boolean>(false);

  // Fullscreen toggle handler
  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  };

  // Listen for fullscreen change event (e.g. user pressed ESC key)
  React.useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  if (webGLError) {
    return <WebGLFallback hall={hall} />;
  }

  const hasModel = Boolean(hall.modelUrl);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-stone-950 select-none ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'h-full min-h-[550px] rounded-3xl border border-stone-800 shadow-wedding-lg'
      }`}
    >
      {/* HUD Controls & Info Overlay */}
      <ViewerOverlay
        hall={hall}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        currentPreset={currentPreset}
        onSelectPreset={setCurrentPreset}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        isModelGlb={hasModel}
      />

      {/* 3D Scene Canvas */}
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          className="canvas-container"
          shadows
          dpr={[1, 2]} // Performance cap at 2
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          camera={{
            fov: 52,
            near: 0.1,
            far: 400,
            position: [0, 14, (hall.dimensions.length / 2) * 1.05],
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color('#0c0a09'));
          }}
          onError={() => setWebGLError(true)}
        >
          {/* Lighting Environment */}
          <ambientLight intensity={0.7} color="#fff8f0" />
          <hemisphereLight
            args={['#fef3c7', '#451a03', 0.6]} // Warm ceiling & dark floor bounce
          />

          {/* Main Key Spotlight with Shadow */}
          <directionalLight
            position={[hall.dimensions.width * 0.3, hall.dimensions.height * 2.2, hall.dimensions.length * 0.3]}
            intensity={1.8}
            color="#fffbeb"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0001}
          />

          {/* Camera and Interaction Controls */}
          <CameraControls
            viewMode={viewMode}
            currentPreset={currentPreset}
            dimensions={hall.dimensions}
          />

          {/* Hall Scene: Model (with Procedural Fallback) OR Procedural */}
          {hasModel ? (
            <ModelErrorBoundary fallback={<Hall3DProcedural hall={hall} />}>
              <Suspense fallback={null}>
                <Hall3DModel url={hall.modelUrl!} hall={hall} />
              </Suspense>
            </ModelErrorBoundary>
          ) : (
            <Hall3DProcedural hall={hall} />
          )}
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Hall3DViewer;
