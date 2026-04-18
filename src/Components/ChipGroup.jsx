import { motion,AnimatePresence } from "framer-motion";

/**
 * ChipGroup — manages multi-select chips with optional limit
 * @param {string[]} options      list of labels to render
 * @param {string[]} selected     currently selected labels (controlled)
 * @param {function} onChange     called with updated string[]
 * @param {number}   max          max selectable (default unlimited)
 * @param {object}   emojiMap     { label: emoji } optional emoji per chip
 * @param {boolean}  showCounter  show "N selected / max" pill
 */
export default function ChipGroup({
    options = [],
    selected = [],
    onChange,
    max,
    emojiMap = {},
    showCounter = true,
  }) {
    const toggle = (label, nowSelected) => {
      if (nowSelected) {
        if (max && selected.length >= max) return;
        onChange?.([...selected, label]);
      } else {
        onChange?.(selected.filter((s) => s !== label));
      }
    };
   
    const atLimit = max ? selected.length >= max : false;
   
    return (
      <div className="flex flex-col gap-3">
        {showCounter && max && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center gap-1.5 bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full">
              <motion.span
                key={selected.length}
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {selected.length}
              </motion.span>
              <span className="text-violet-400">/ {max} selected</span>
            </div>
            {atLimit && (
              <motion.span
                className="text-xs text-amber-400 font-medium"
                variants={fadeUp}
                initial="hidden"
                animate="show"
              >
                Max reached
              </motion.span>
            )}
          </motion.div>
        )}
   
        <motion.div
          className="flex flex-wrap gap-2"
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.03 } },
            hidden: {},
          }}
        >
          {options.map((opt) => (
            <motion.div key={opt} variants={scaleIn}>
              <Chip
                label={opt}
                emoji={emojiMap[opt]}
                selected={selected.includes(opt)}
                disabled={atLimit && !selected.includes(opt)}
                onToggle={toggle}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
   