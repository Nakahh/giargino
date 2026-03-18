import { motion } from "framer-motion";
import { Flower } from "lucide-react";

interface PremiumFooterProps {
  brandName?: string;
  subtitle?: string;
  location?: string;
  area?: string;
  disclaimer?: string;
  backgroundColor?: string;
  accentColor?: string;
  lightColor?: string;
}

export function PremiumFooter({
  brandName = "GIARDINO — INVESTIMENTO PREMIUM",
  subtitle = "Modelo de Investimento Residencial Senior + Clube Life Style",
  location = "Mogi das Cruzes, São Paulo",
  area = "258.900 m²",
  disclaimer = "© 2024 — Documento de Apresentação de Investimento — Confidencial",
  backgroundColor = "#1F3B5E",
  accentColor = "#F4C430",
  lightColor = "#FFFFFF",
}: PremiumFooterProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="py-12 mt-20 text-center relative overflow-hidden"
      style={{ backgroundColor }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            ${accentColor},
            ${accentColor}10px,
            transparent 10px,
            transparent 20px
          )`,
        }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Brand with flower animation */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <Flower className="w-5 h-5" style={{ color: accentColor }} />
          </motion.div>
          <motion.p
            className="text-lg font-bold"
            style={{ color: accentColor }}
          >
            {brandName}
          </motion.p>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <Flower className="w-5 h-5" style={{ color: accentColor }} />
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mb-2"
          style={{ color: `${lightColor}cc` }}
        >
          {subtitle}
        </motion.p>

        {/* Location and area */}
        <motion.p
          variants={itemVariants}
          className="text-sm"
          style={{ color: `${lightColor}aa` }}
        >
          {location} | Área Total: {area}
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 my-6 justify-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              height: "1px",
              flex: 1,
              background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
            }}
          />
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          variants={itemVariants}
          className="text-xs"
          style={{ color: `${lightColor}88` }}
        >
          {disclaimer}
        </motion.p>

        {/* Animated bottom accent */}
        <motion.div
          className="mt-8 h-1 bg-gradient-to-r"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}
