import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail, Home } from "lucide-react";

interface MobileStickyFooterBarProps {
  onHomeClick?: () => void;
  onWhatsAppClick?: () => void;
  onCallClick?: () => void;
  onEmailClick?: () => void;
  className?: string;
}

/**
 * Sticky footer bar para mobile
 * Exibe ações principais (WhatsApp, Contato, etc)
 */
export function MobileStickyFooterBar({
  onHomeClick,
  onWhatsAppClick,
  onCallClick,
  onEmailClick,
  className = "",
}: MobileStickyFooterBarProps) {
  const actions = [
    {
      id: "home",
      icon: Home,
      label: "Home",
      onClick: onHomeClick,
      color: "#1F3B5E",
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      onClick: onWhatsAppClick,
      color: "#25D366",
    },
    {
      id: "phone",
      icon: Phone,
      label: "Ligar",
      onClick: onCallClick,
      color: "#0066CC",
    },
    {
      id: "email",
      icon: Mail,
      label: "Email",
      onClick: onEmailClick,
      color: "#FF6B6B",
    },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={`
        fixed bottom-0 left-0 right-0 
        md:hidden
        bg-white/95 backdrop-blur-md
        border-t border-gray-200
        z-40
        ${className}
      `}
    >
      <div className="flex justify-around items-center py-3 px-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={action.onClick}
              className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100"
              title={action.label}
            >
              <Icon size={24} color={action.color} strokeWidth={2} />
              <span className="text-xs font-medium text-gray-600">
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
