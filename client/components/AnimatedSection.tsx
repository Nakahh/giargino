import { ReactNode } from "react";
import { motion } from "framer-motion";
import { sectionVariants } from "@/hooks/use-animations";

interface AnimatedSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
}

export function AnimatedSection({
  id,
  children,
  className = "",
  title,
  icon,
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={`tab-${id}`}
      initial="initial"
      whileInView="animate"
      viewport={{ once: false, amount: 0.1 }}
      variants={sectionVariants}
      className={`min-h-screen scroll-mt-20 py-8 md:py-12 px-4 md:px-6 ${className}`}
    >
      {/* Seção Snap Point */}
      <div className="max-w-7xl mx-auto">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 md:mb-12"
          >
            <div className="flex items-center gap-3 mb-2">
              {icon && <div className="text-3xl md:text-4xl">{icon}</div>}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                {title}
              </h2>
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
          </motion.div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
