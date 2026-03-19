import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface PullToRefreshIndicatorProps {
  pullProgress: number; // 0 to 1
  isRefreshing: boolean;
  className?: string;
}

/**
 * Indicador visual para pull-to-refresh
 * Mostra progresso do pull e estado de refresh
 */
export function PullToRefreshIndicator({
  pullProgress,
  isRefreshing,
  className = "",
}: PullToRefreshIndicatorProps) {
  const isReady = pullProgress >= 1;

  return (
    <motion.div
      className={`
        flex items-center justify-center
        absolute top-0 left-0 right-0
        h-16 pointer-events-none
        ${className}
      `}
      style={{
        transform: `translateY(${pullProgress * 40}px)`,
      }}
    >
      <motion.div
        className="flex flex-col items-center gap-2"
        animate={{
          scale: isRefreshing ? 1 : pullProgress,
          opacity: pullProgress > 0 ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            rotate: isRefreshing ? 360 : pullProgress * 180,
          }}
          transition={{
            rotate: isRefreshing ? {
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            } : {
              duration: 0.2,
            },
          }}
          className="p-2 rounded-full bg-blue-100"
        >
          <RefreshCw size={24} className="text-blue-600" />
        </motion.div>

        <motion.span
          className="text-xs font-semibold text-gray-600"
          animate={{
            opacity: pullProgress > 0.5 ? 1 : 0,
          }}
        >
          {isRefreshing ? "Atualizando..." : isReady ? "Solte para atualizar" : "Puxe para atualizar"}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
