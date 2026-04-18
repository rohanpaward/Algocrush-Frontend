import { motion,AnimatePresence } from "framer-motion";

const tapScale = { scale: 0.96 };

// ─────────────────────────────────────────────


// 3. CHIP  (single) + CHIP GROUP (multi-select)
// ─────────────────────────────────────────────
/**
 * Chip — a single selectable tag/pill
 * @param {string}   label
 * @param {boolean}  selected
 * @param {boolean}  disabled    shown at reduced opacity, not clickable
 * @param {function} onToggle    called with (label, newState)
 * @param {string}   emoji       optional emoji prefix
 */
export default function Chip({ label, selected = false, disabled = false, onToggle, emoji }) {
    return (
      <motion.button
        className={[
          "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
          selected
            ? "bg-violet-500 border-violet-400 text-white shadow-md shadow-violet-900/40"
            : "bg-white/5 border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200",
          disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "cursor-pointer",
        ].join(" ")}
        onClick={() => !disabled && onToggle?.(label, !selected)}
        whileTap={!disabled ? tapScale : {}}
        whileHover={!disabled ? { scale: 1.04 } : {}}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
        layout
      >
        {emoji && <span>{emoji}</span>}
        <span>{label}</span>
        <AnimatePresence>
          {selected && (
            <motion.span
              key="check"
              className="text-violet-200 ml-0.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              ✓
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }
   