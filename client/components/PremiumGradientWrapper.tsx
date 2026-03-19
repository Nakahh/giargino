import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumGradientWrapperProps {
  children: ReactNode;
  className?: string;
  variant?: "glass" | "gradient" | "blur" | "glow";
  animated?: boolean;
  borderColor?: string;
}

export function PremiumGradientWrapper({
  children,
  className,
  variant = "glass",
  animated = true,
  borderColor,
}: PremiumGradientWrapperProps) {
  const variants = {
    glass: {
      background: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(16px)",
      border: `1px solid ${borderColor || "rgba(244, 196, 48, 0.2)"}`,
      boxShadow:
        "0 8px 32px 0 rgba(31, 59, 94, 0.1), inset 0 2px 4px 0 rgba(255, 255, 255, 0.5)",
    },
    gradient: {
      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%)",
      backdropFilter: "blur(8px)",
      border: `1px solid ${borderColor || "rgba(244, 196, 48, 0.15)"}`,
      boxShadow: "0 10px 40px rgba(31, 59, 94, 0.12)",
    },
    blur: {
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(12px)",
      border: `1px solid ${borderColor || "rgba(244, 196, 48, 0.25)"}`,
      boxShadow:
        "0 8px 24px rgba(31, 59, 94, 0.08), 0 0 1px rgba(244, 196, 48, 0.5)",
    },
    glow: {
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(14px)",
      border: `1px solid ${borderColor || "rgba(244, 196, 48, 0.3)"}`,
      boxShadow: `0 0 20px rgba(244, 196, 48, 0.3), 0 8px 32px rgba(31, 59, 94, 0.15)`,
    },
  };

  const selectedVariant = variants[variant];

  return (
    <motion.div
      className={cn(
        "rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden",
        "transition-all duration-300 group",
        className
      )}
      style={selectedVariant}
      initial={animated ? { opacity: 0, y: 20 } : undefined}
      whileInView={animated ? { opacity: 1, y: 0 } : undefined}
      viewport={animated ? { once: false, amount: 0.2 } : undefined}
      transition={animated ? { duration: 0.5 } : undefined}
    >
      {/* Animated background gradient overlay */}
      {animated && variant === "gradient" && (
        <motion.div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(45deg, transparent 25%, rgba(244, 196, 48, 0.1) 25%, rgba(244, 196, 48, 0.1) 50%, transparent 50%, transparent 75%, rgba(244, 196, 48, 0.1) 75%)",
            backgroundSize: "60px 60px",
          }}
          animate={animated ? { backgroundPosition: ["0px 0px", "60px 60px"] } : {}}
          transition={animated ? { duration: 20, repeat: Infinity, ease: "linear" } : {}}
        />
      )}

      {/* Glow effect for glow variant */}
      {animated && variant === "glow" && (
        <>
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </>
      )}

      {/* Shimmer effect on hover */}
      {animated && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
            transform: "translateX(-100%)",
          }}
          animate={animated ? { transform: ["translateX(-100%)", "translateX(100%)"] } : {}}
          transition={animated ? { duration: 3, repeat: Infinity } : {}}
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </motion.div>
  );
}
