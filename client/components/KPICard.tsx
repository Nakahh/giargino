import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface KPICardProps {
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
  premium?: boolean;
}

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  bgColor = "bg-gradient-to-br from-blue-50 to-blue-100",
  iconColor = "text-blue-600",
  premium = false,
}: KPICardProps) {
  return (
    <motion.div
      whileHover={premium ? { scale: 1.02, y: -4 } : { scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 transition-all relative overflow-hidden group",
        "border border-transparent",
        premium
          ? "glass-effect-premium shadow-xl"
          : "shadow-lg border-2 hover:shadow-xl hover:scale-105 " + bgColor
      )}
      style={
        !premium
          ? {
              backgroundImage:
                "linear-gradient(135deg, rgba(244,196,48,0.05) 0%, rgba(255,255,255,0) 100%)",
            }
          : {}
      }
    >
      {/* Decorative corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 opacity-5 sm:opacity-10 rounded-full"
        animate={premium ? { scale: [1, 1.2, 1] } : {}}
        transition={premium ? { duration: 4, repeat: Infinity } : {}}
        style={{ backgroundColor: "#F4C430", transform: "translate(50%, -50%)" }}
      />

      {/* Glow effect for premium */}
      {premium && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-xl" />
        </div>
      )}

      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1 min-w-0">
          <motion.p
            className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2 uppercase tracking-wide"
            animate={premium ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={premium ? { duration: 3, repeat: Infinity } : {}}
          >
            {title}
          </motion.p>
          <motion.h3
            className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight break-words"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {typeof value === "number" ? formatCurrency(value) : value}
          </motion.h3>
          {subtitle && (
            <p className="text-xs text-gray-500 font-medium">{subtitle}</p>
          )}
          {trend && (
            <motion.div
              className={cn(
                "text-xs sm:text-sm font-bold mt-2 sm:mt-3 flex items-center gap-1",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
              animate={premium ? { scale: [1, 1.05, 1] } : {}}
              transition={premium ? { duration: 2, repeat: Infinity } : {}}
            >
              {trend.isPositive ? "↗" : "↘"}{" "}
              {Math.abs(trend.value).toFixed(1)}%
            </motion.div>
          )}
        </div>
        {Icon && (
          <motion.div
            animate={premium ? { rotate: [0, 5, 0] } : {}}
            transition={premium ? { duration: 3, repeat: Infinity } : {}}
          >
            <Icon
              className={cn(
                "w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 flex-shrink-0 ml-2 sm:ml-4",
                iconColor
              )}
              strokeWidth={1.5}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
