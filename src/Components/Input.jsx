export const Input = ({ label, className = "", ...props }) => (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
      <input
        className="bg-[#12121A] border border-slate-800 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-[0_0_0_0_rgba(168,85,247,0)] focus:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        {...props}
      />
    </div>
  );