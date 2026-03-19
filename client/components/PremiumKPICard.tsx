import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useCurrency } from "@/hooks/use-currency";

interface PremiumKPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
  iconColor?: string;
  delay?: number;
}

export function PremiumKPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  bgColor = "from-blue-50 to-blue-100",
  iconColor = "text-blue-600",
  delay = 0,
}: PremiumKPICardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { formatCurrency } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.08,
        ease: "easeOut",
      }}
      className={`relative rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all overflow-hidden cursor-pointer group border border-opacity-20 border-gray-300`}
      style={{
        background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
        perspective: "1000px",
      }}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-100`}
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(244,196,48,0.05) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Animated corner accent */}
      <motion.div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
        style={{
          background: iconColor,
        }}
        animate={isHovered ? { scale: 1.3, opacity: 0.15 } : { scale: 1, opacity: 0.1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: delay * 0.08 + 0.2 }}
              className="text-xs md:text-sm font-bold text-gray-600 uppercase tracking-wider mb-2"
            >
              {title}
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay * 0.08 + 0.3 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight"
            >
              {typeof value === "number" ? formatCurrency(value) : value}
            </motion.h3>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: delay * 0.08 + 0.4 }}
                className="text-xs md:text-sm text-gray-600 font-medium"
              >
                {subtitle}
              </motion.p>
            )}

            {trend && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: delay * 0.08 + 0.5 }}
                className={`mt-4 text-sm font-bold flex items-center gap-1 ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {trend.isPositive ? "↗" : "↘"}
                </motion.span>
                {Math.abs(trend.value).toFixed(1)}%
              </motion.div>
            )}
          </div>

          {Icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              whileHover={{
                scale: 1.2,
                rotate: 10,
                transition: { duration: 0.3 },
              }}
              transition={{ delay: delay * 0.08 + 0.2 }}
              className={`flex-shrink-0 p-3 rounded-xl bg-white bg-opacity-50`}
            >
              <Icon className={`w-8 h-8 ${iconColor}`} strokeWidth={1.5} />
            </motion.div>
          )}
        </div>

        {/* Animated bottom accent line */}
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: delay * 0.08 + 0.6, duration: 0.6 }}
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
}
