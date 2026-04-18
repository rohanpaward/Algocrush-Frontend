import { motion,AnimatePresence } from "framer-motion";


// ─────────────────────────────────────────────
// 4. CARD
// ─────────────────────────────────────────────
/**
 * @param {string}  variant   "default" | "glass" | "glow" | "profile"
 * @param {boolean} hoverable adds lift on hover
 * @param {boolean} selected  highlighted border state
 * @param {node}    header    optional top slot (avatar row, icon, etc.)
 * @param {node}    footer    optional bottom slot (actions, badges, etc.)
 * @param {string}  badge     small badge text in top-right corner
 * @param {node}    children  card body content
 * @param {function} onClick
 */


const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

export default function Card({
    variant = "default",
    hoverable = false,
    selected = false,
    header,
    footer,
    badge,
    children,
    onClick,
    className = "",
  }) {
    const base =
      "relative rounded-3xl overflow-hidden transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500";
   
    const variants = {
      default: "bg-[#1a1a28] border border-white/8",
      glass: "bg-white/5 backdrop-blur-xl border border-white/10",
      glow: "bg-[#181826] border border-violet-500/30",
      profile:
        "bg-gradient-to-br from-[#1c1c2e] to-[#14141f] border border-white/10",
    };
   
    const selectedStyles = selected
      ? "border-violet-500 ring-2 ring-violet-500/30"
      : "";
   
    return (
      <motion.div
        className={`${base} ${variants[variant]} ${selectedStyles} ${
          hoverable || onClick ? "cursor-pointer" : ""
        } ${className}`}
        onClick={onClick}
        whileHover={hoverable || onClick ? { y: -3, scale: 1.01 } : {}}
        whileTap={onClick ? tapScale : {}}
        transition={{ type: "spring", stiffness: 340, damping: 26 }}
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        {/* Glow halo for 'glow' variant */}
        {variant === "glow" && (
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-violet-600/20 blur-2xl pointer-events-none" />
        )}
   
        {/* Badge */}
        {badge && (
          <motion.div
            className="absolute top-3 right-3 z-10 bg-violet-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, delay: 0.15 }}
          >
            {badge}
          </motion.div>
        )}
   
        {/* Selected checkmark */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key="check"
              className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
            >
              ✓
            </motion.div>
          )}
        </AnimatePresence>
   
        {/* Header slot */}
        {header && (
          <div className="px-5 pt-5 pb-0">{header}</div>
        )}
   
        {/* Body */}
        <div className="p-5">{children}</div>
   
        {/* Footer slot */}
        {footer && (
          <>
            <div className="mx-5 h-px bg-white/6" />
            <div className="px-5 py-4">{footer}</div>
          </>
        )}
      </motion.div>
    );
  }
   