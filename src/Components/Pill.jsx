
export const Pill = ({ active, children, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
        active 
          ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.2)]' 
          : 'bg-[#12121A] text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200'
      }`}
    >
      {children}
    </button>
  );