import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Plus, X } from "lucide-react";
import { useState } from "react";

interface FABAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
  bgColor?: string;
}

interface FloatingActionButtonsProps {
  actions?: FABAction[];
  onMainClick?: () => void;
  className?: string;
}

/**
 * Floating Action Buttons (FABs) para ações rápidas
 * Expandível com múltiplas ações
 */
export function FloatingActionButtons({
  actions = [],
  onMainClick,
  className = "",
}: FloatingActionButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultActions: FABAction[] = [
    {
      id: "whatsapp",
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
      onClick: () => {
        window.open("https://wa.me", "_blank");
        setIsOpen(false);
      },
      color: "#25D366",
      bgColor: "bg-green-500",
    },
  ];

  const finalActions = actions.length > 0 ? actions : defaultActions;

  const mainVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0, rotate: 180 },
  };

  const itemVariants = {
    initial: { opacity: 0, scale: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
    exit: { opacity: 0, scale: 0, y: 20 },
  };

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className={`fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 ${className}`}>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* FAB Actions */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-3">
            {finalActions.map((action, i) => (
              <motion.button
                key={action.id}
                custom={i}
                variants={itemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-full
                  bg-white shadow-lg hover:shadow-xl
                  transition-all duration-200
                `}
                title={action.label}
              >
                <span className="text-sm font-medium text-gray-700">
                  {action.label}
                </span>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: action.color || "#1F3B5E" }}
                >
                  {action.icon}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        variants={mainVariants}
        initial="initial"
        animate="animate"
        onClick={() => {
          setIsOpen(!isOpen);
          onMainClick?.();
        }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <Plus size={24} />}
        </motion.div>
      </motion.button>
    </div>
  );
}
