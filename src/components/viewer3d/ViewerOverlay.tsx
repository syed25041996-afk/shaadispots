import React from 'react';
import { Hall } from '../../types/hall';
import {
  Compass,
  Footprints,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Users,
  Eye,
  Crosshair,
  Sparkles,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

export type CameraPreset = 'entrance' | 'stage' | 'topDown' | 'table';
export type ViewMode = 'orbit' | 'walkthrough';

interface ViewerOverlayProps {
  hall: Hall;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  currentPreset: CameraPreset;
  onSelectPreset: (preset: CameraPreset) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isModelGlb: boolean;
}

export const ViewerOverlay: React.FC<ViewerOverlayProps> = ({
  hall,
  viewMode,
  onToggleViewMode,
  currentPreset,
  onSelectPreset,
  isFullscreen,
  onToggleFullscreen,
  isModelGlb,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Back Link & Venue Info */}
        <div className="pointer-events-auto flex items-center gap-3 bg-stone-950/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-gold-500/30 text-white shadow-wedding">
          <Link
            to={`/halls/${hall.id}`}
            className="p-1.5 rounded-xl bg-brand-900/80 hover:bg-brand-800 text-gold-300 hover:text-white transition"
            title="Back to Venue Details"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-base sm:text-lg text-cream-100 line-clamp-1">
                {hall.name}
              </h1>
              {isModelGlb ? (
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                  <Sparkles className="w-3 h-3" /> 3D GLB
                </span>
              ) : (
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Eye className="w-3 h-3" /> Procedural 3D
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-stone-300">
              <span>{hall.area}, {hall.city}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-gold-300">
                <Users className="w-3.5 h-3.5" />
                {hall.capacityMin} - {hall.capacityMax} guests
              </span>
            </div>
          </div>
        </div>

        {/* Right: Mode & Fullscreen Toggles */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Orbit vs Walkthrough Mode Switch */}
          <div className="flex items-center bg-stone-950/80 backdrop-blur-md p-1 rounded-2xl border border-stone-700 shadow-wedding">
            <button
              onClick={() => onToggleViewMode('orbit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                viewMode === 'orbit'
                  ? 'bg-brand-800 text-gold-300 shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Orbit</span>
            </button>
            <button
              onClick={() => onToggleViewMode('walkthrough')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                viewMode === 'walkthrough'
                  ? 'bg-brand-800 text-gold-300 shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              <span>Walkthrough</span>
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            className="p-2.5 rounded-2xl bg-stone-950/80 backdrop-blur-md hover:bg-stone-900 border border-stone-700 text-stone-200 hover:text-white transition shadow-wedding"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Center Notice for Walkthrough mode */}
      {viewMode === 'walkthrough' && (
        <div className="self-center pointer-events-none bg-stone-950/70 backdrop-blur-md px-4 py-2 rounded-xl border border-gold-500/30 text-center animate-fade-in">
          <p className="text-xs sm:text-sm font-medium text-gold-200 flex items-center justify-center gap-2">
            <Crosshair className="w-4 h-4 text-gold-400" />
            Click canvas to lock mouse look • Move with WASD / Arrow keys • Press ESC to exit look
          </p>
        </div>
      )}

      {/* Bottom Bar: Camera Presets & Control Instructions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Camera Presets (active primarily in Orbit mode) */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-stone-950/80 backdrop-blur-md p-1.5 rounded-2xl border border-stone-700/80 shadow-wedding">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400/90 px-2 hidden sm:inline">
            Camera:
          </span>
          <button
            onClick={() => onSelectPreset('entrance')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              currentPreset === 'entrance'
                ? 'bg-gold-500 text-stone-950 font-semibold shadow-gold-glow'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Entrance
          </button>
          <button
            onClick={() => onSelectPreset('stage')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              currentPreset === 'stage'
                ? 'bg-gold-500 text-stone-950 font-semibold shadow-gold-glow'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Stage View
          </button>
          <button
            onClick={() => onSelectPreset('topDown')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              currentPreset === 'topDown'
                ? 'bg-gold-500 text-stone-950 font-semibold shadow-gold-glow'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Top Down
          </button>
          <button
            onClick={() => onSelectPreset('table')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              currentPreset === 'table'
                ? 'bg-gold-500 text-stone-950 font-semibold shadow-gold-glow'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Table View
          </button>
        </div>

        {/* Interaction Legend & Specs */}
        <div className="pointer-events-auto flex items-center gap-2 bg-stone-950/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-stone-800 text-[11px] text-stone-300 shadow-wedding">
          <Info className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span>
            {viewMode === 'orbit'
              ? 'Left-drag: Rotate • Scroll: Zoom • Right-drag: Pan'
              : 'W/A/S/D: Walk • Mouse: Look Around • ESC: Release'}
          </span>
          <span className="hidden md:inline text-stone-500">|</span>
          <span className="hidden md:inline text-stone-400">
            {hall.dimensions.width}m × {hall.dimensions.length}m × {hall.dimensions.height}m
          </span>
        </div>
      </div>
    </div>
  );
};

