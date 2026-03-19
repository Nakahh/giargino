import { motion } from "framer-motion";
import { Flower, Leaf } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface PremiumHeaderProps {
  title?: string;
  subtitle?: string;
  description?: string;
  logoUrl?: string;
  backgroundColor?: string;
  accentColor?: string;
  lightColor?: string;
  children?: React.ReactNode;
  compact?: boolean;
  showLanguageSwitcher?: boolean;
}

export function PremiumHeader({
  title = "GIARDINO",
  subtitle = "RESIDENCIAL SÊNIOR",
  description = "Modelo de Investimento Premium",
  logoUrl = "",
  backgroundColor = "#2C3E50",
  accentColor = "#F4C430",
  lightColor = "#FFFFFF",
  children,
  compact = false,
  showLanguageSwitcher = true,
}: PremiumHeaderProps) {
  const bgGradient = `linear-gradient(135deg, ${backgroundColor} 0%, #1F3B5E 100%)`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6 shadow-xl md:shadow-2xl"
      style={{ background: bgGradient }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Título e Descrição - Topo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6"
        >
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1"
              style={{ color: accentColor }}
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm md:text-base font-semibold"
              style={{ color: lightColor }}
            >
              {subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xs md:text-sm font-light mt-1"
              style={{ color: `${lightColor}cc` }}
            >
              {description}
            </motion.p>
          </div>

          {/* Custom children and language switcher (ex: PDF export button) */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-2 md:gap-3 flex-wrap justify-center md:justify-end items-center"
          >
            {showLanguageSwitcher && <LanguageSwitcher />}
            {children}
          </motion.div>
        </motion.div>

        {!compact && (
          <>
            {/* Logo - Centralizada com Fundo Branco (apenas se logoUrl existe) */}
            {logoUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center mb-0 py-8 md:py-12 px-6 md:px-12 rounded-xl"
                style={{ backgroundColor: lightColor }}
              >
                <motion.img
                  src={logoUrl}
                  alt="GIARDINO Logo"
                  className="h-28 md:h-40 w-auto object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )}

            {/* Divider com efeito */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-t-2 pt-6"
              style={{ borderColor: `${accentColor}60` }}
            >
              {/* Decorative divider with leaf */}
              <div className="flex items-center justify-center mb-4 gap-2">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  style={{ height: "2px", flex: 1, backgroundColor: `${accentColor}40` }}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  <Flower
                    className="w-5 h-5"
                    style={{ color: accentColor }}
                  />
                </motion.div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  style={{ height: "2px", flex: 1, backgroundColor: `${accentColor}40` }}
                />
              </div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-2xl font-light mb-2 text-center"
                style={{ color: lightColor }}
              >
                Modelo de Investimento Premium
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-base mb-3 text-center"
                style={{ color: `${lightColor}dd` }}
              >
                Residencial Senior + Clube Life Style + Loteamento + Centro Comercial
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center justify-center gap-2"
              >
                <Leaf
                  className="w-4 h-4"
                  style={{ color: accentColor }}
                />
                <p
                  className="text-sm font-semibold"
                  style={{ color: `${lightColor}ee` }}
                >
                  Localização: Mogi das Cruzes, São Paulo — Área: 258.900 m²
                </p>
                <Leaf
                  className="w-4 h-4"
                  style={{ color: accentColor }}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
