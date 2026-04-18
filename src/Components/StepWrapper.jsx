import { motion } from "framer-motion";

export const StepWrapper = ({ title, subtitle, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8 w-full max-w-2xl mx-auto pb-24"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        {subtitle && <p className="text-slate-400">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  );