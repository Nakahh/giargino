import { motion } from "framer-motion";
import { useRef, useState, ReactNode } from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ZoomSurfaceProps {
  children: ReactNode;
  minZoom?: number;
  maxZoom?: number;
  className?: string;
}

/**
 * Superfície com suporte a zoom e pan
 * Perfeito para imagens e conteúdo interativo
 */
export function ZoomSurface({
  children,
  minZoom = 1,
  maxZoom = 3,
  className = "",
}: ZoomSurfaceProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(minZoom, Math.min(maxZoom, zoom * delta));
    setZoom(newZoom);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const reset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg
        border border-gray-200
        bg-gray-50
        ${className}
      `}
      ref={containerRef}
      onWheel={(e) => handleWheel(e as unknown as WheelEvent)}
    >
      <motion.div
        className="origin-center cursor-grab active:cursor-grabbing"
        animate={{
          scale: zoom,
          x: pan.x,
          y: pan.y,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {children}
      </motion.div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2 bg-white rounded-lg shadow-lg p-2 z-10">
        <button
          onClick={() => setZoom(Math.max(minZoom, zoom * 0.9))}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Zoom out"
        >
          <ZoomOut size={18} className="text-gray-600" />
        </button>

        <div className="flex items-center px-2 text-sm font-medium text-gray-600">
          {Math.round(zoom * 100)}%
        </div>

        <button
          onClick={() => setZoom(Math.min(maxZoom, zoom * 1.1))}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Zoom in"
        >
          <ZoomIn size={18} className="text-gray-600" />
        </button>

        <div className="w-px bg-gray-200" />

        <button
          onClick={reset}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Reset"
        >
          <RotateCcw size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Zoom hint */}
      {zoom === 1 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 text-sm">
          Scroll para zoom
        </div>
      )}
    </div>
  );
}
