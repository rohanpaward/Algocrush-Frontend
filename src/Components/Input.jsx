export const Input = ({ label, className = "", icon: Icon, ...props }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    {label && (
      <label className="text-sm font-medium text-slate-300">
        {label}
      </label>
    )}
    
    <div className="relative flex items-center">
      {/* 1. Render the icon if passed */}
      {Icon && (
        <div className="absolute left-4 text-slate-500 pointer-events-none">
          <Icon size={18} strokeWidth={1.5} />
        </div>
      )}

      <input
        className={`w-full bg-[#12121A] border border-slate-800 rounded-lg py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-[0_0_0_0_rgba(168,85,247,0)] focus:shadow-[0_0_15px_rgba(168,85,247,0.2)] 
          ${Icon ? "pl-12 pr-4" : "px-4"}`} 
        {...props}
      />
    </div>
  </div>
);