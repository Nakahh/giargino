import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/hooks/use-currency";

interface AnimatedKPICardProps {
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

export function AnimatedKPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  bgColor = "bg-gradient-to-br from-blue-50 to-blue-100",
  iconColor = "text-blue-600",
  delay = 0,
}: AnimatedKPICardProps) {
  const { formatCurrency } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px rgba(31, 59, 94, 0.15)",
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 0.4,
        delay: delay * 0.1,
        ease: "easeOut",
      }}
      className={cn(
        "rounded-xl p-6 shadow-lg border-2 border-transparent overflow-hidden cursor-pointer group",
        bgColor
      )}
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(244,196,48,0.05) 0%, rgba(255,255,255,0) 100%)",
      }}
    >
      {/* Decorative corner accent with animation */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full"
        style={{
          backgroundColor: "#F4C430",
          transform: "translate(50%, -50%)",
        }}
        whileHover={{
          scale: 1.2,
          opacity: 0.15,
          transition: { duration: 0.3 },
        }}
      />

      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(135deg, rgba(31, 59, 94, 0.05) 0%, rgba(79, 172, 254, 0.05) 100%)",
        }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: delay * 0.1 + 0.2 }}
            className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide"
          >
            {title}
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay * 0.1 + 0.3 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight break-words"
          >
            {typeof value === "number" ? formatCurrency(value) : value}
          </motion.h3>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: delay * 0.1 + 0.4 }}
              className="text-xs text-gray-500 font-medium"
            >
              {subtitle}
            </motion.p>
          )}

          {trend && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: delay * 0.1 + 0.5 }}
              className={cn(
                "text-sm font-bold mt-3 flex items-center gap-1",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
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
              scale: 1.15,
              rotate: 10,
              transition: { duration: 0.3 },
            }}
            transition={{ delay: delay * 0.1 + 0.2 }}
            className="ml-4 flex-shrink-0"
          >
            <Icon className={cn("w-12 h-12", iconColor)} strokeWidth={1.5} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
