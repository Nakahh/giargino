import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PremiumGalleryProps {
  images?: string[];
  title?: string;
  description?: string;
}

const defaultImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
];

export function PremiumGallery({
  images = defaultImages,
  title = "Galeria do Projeto",
  description = "Conheça os espaços premium do GIARDINO",
}: PremiumGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
      filter: "blur(10px)",
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
      filter: "blur(10px)",
      scale: 0.95,
    }),
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const end = e.clientX;
    const diff = touchStart - end;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2"
        >
          {title}
        </motion.h2>
      )}
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-8"
        >
          {description}
        </motion.p>
      )}

      <div className="relative rounded-lg sm:rounded-2xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 shadow-lg sm:shadow-2xl group">
        <motion.div
          ref={containerRef}
          className="relative h-48 sm:h-64 md:h-96 lg:h-[500px] w-full"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              alt={`Slide ${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Navigation buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-white text-gray-900 transition-all backdrop-blur-md shadow-lg hover:shadow-xl group-hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-white text-gray-900 transition-all backdrop-blur-md shadow-lg hover:shadow-xl group-hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </motion.button>

          {/* Slide indicators */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`rounded-full transition-all backdrop-blur-sm ${
                  index === currentIndex
                    ? "h-2 sm:h-2.5 w-6 sm:w-8 bg-white shadow-lg"
                    : "h-2 sm:h-2.5 w-2 sm:w-2.5 bg-white/60 hover:bg-white/80"
                }`}
                whileHover={{ scale: 1.2 }}
                animate={index === currentIndex ? { scale: [1, 1.1, 1] } : {}}
                transition={index === currentIndex ? { duration: 0.6 } : {}}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Image counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 bg-black/70 text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg"
          >
            {currentIndex + 1} / {images.length}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint for mobile */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-2 sm:mt-4 text-xs sm:text-sm text-gray-600 md:hidden font-medium"
      >
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center gap-1"
        >
          Deslize para navegar
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            →
          </motion.span>
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
