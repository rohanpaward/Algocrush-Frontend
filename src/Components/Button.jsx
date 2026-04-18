import { motion } from "framer-motion";

const hoverLift = { y: -2 };
const tapScale = { scale: 0.96 };



export default function Button({
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    onClick,
    children,
    className = "",
  }) {
    const base =
      "relative inline-flex items-center justify-center font-bold tracking-wide rounded-2xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d18] select-none overflow-hidden";
   
    const sizes = {
      sm: "px-4 py-2 text-sm gap-1.5",
      md: "px-6 py-3.5 text-sm gap-2",
      lg: "w-full py-4 text-base gap-2",
    };
   
    const variants = {
      primary:
        "bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-900/40 hover:from-violet-400 hover:to-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none",
      ghost:
        "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed",
      danger:
        "bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-900/40 hover:from-rose-400 hover:to-pink-500 disabled:opacity-40 disabled:cursor-not-allowed",
      success:
        "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-900/40 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 disabled:cursor-not-allowed",
    };
   
    return (
      <motion.button
        className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
        onClick={!disabled && !loading ? onClick : undefined}
        disabled={disabled || loading}
        whileHover={!disabled && !loading ? hoverLift : {}}
        whileTap={!disabled && !loading ? tapScale : {}}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Shimmer overlay on primary */}
        {variant === "primary" && !disabled && (
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
            initial={{ x: "-100%" }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
   
        {loading ? (
          <motion.span
            className="w-4 h-4 rounded-full border-2 border-current border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
          />
        ) : (
          <>
            {leftIcon && <span className="text-base leading-none">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="text-base leading-none">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }