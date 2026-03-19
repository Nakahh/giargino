import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useState } from "react";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ProjectGalleryLightboxProps {
  images: GalleryImage[];
  initialIndex?: number;
  onClose: () => void;
  className?: string;
}

/**
 * Lightbox touch-friendly para visualização de imagens
 * Suporta navegação, download e modo fullscreen
 */
export function ProjectGalleryLightbox({
  images,
  initialIndex = 0,
  onClose,
  className = "",
}: ProjectGalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(0);

  const currentImage = images[currentIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        // Swipe left - next
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        // Swipe right - prev
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(currentImage.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentImage.alt}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`
          fixed inset-0 z-50
          bg-black/90 backdrop-blur-sm
          flex items-center justify-center
          ${className}
        `}
        onClick={onClose}
      >
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-full h-full md:w-4/5 md:h-4/5 flex flex-col"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm"
          >
            <X size={28} />
          </motion.button>

          {/* Image Container */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden">
            <motion.img
              key={currentIndex}
              src={currentImage.src}
              alt={currentImage.alt}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-full max-h-full object-contain"
              draggable={false}
            />

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm"
                >
                  <ChevronLeft size={32} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setCurrentIndex((prev) => (prev + 1) % images.length)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm"
                >
                  <ChevronRight size={32} />
                </motion.button>
              </>
            )}
          </div>

          {/* Info & Controls Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-md border-t border-white/10 p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                {currentImage.title && (
                  <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                    {currentImage.title}
                  </h3>
                )}
                {currentImage.description && (
                  <p className="text-gray-300 text-sm md:text-base">
                    {currentImage.description}
                  </p>
                )}
                {images.length > 1 && (
                  <p className="text-gray-400 text-xs md:text-sm mt-2">
                    {currentIndex + 1} / {images.length}
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadImage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <Download size={18} />
                <span className="text-sm font-medium">Download</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Keyboard hint */}
          <div className="absolute bottom-20 md:bottom-32 left-1/2 -translate-x-1/2 text-center text-gray-400 text-xs pointer-events-none">
            Use setas do teclado ou swipe para navegar
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
