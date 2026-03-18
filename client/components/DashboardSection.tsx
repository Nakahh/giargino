import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DashboardSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function DashboardSection({
  id,
  children,
  className = "",
}: DashboardSectionProps) {
  return (
    <motion.div
      id={`tab-${id}`}
      data-section={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className={`min-h-screen py-12 px-4 md:px-6 ${className}`}
      style={{
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
      }}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </motion.div>
  );
}
