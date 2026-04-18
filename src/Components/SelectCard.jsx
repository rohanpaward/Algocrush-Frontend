import { Check } from "lucide-react";

export const SelectCard = ({ active, title, desc, icon: Icon, onClick, layout = 'vertical' }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-xl border text-left transition-all duration-200 flex ${
        layout === 'horizontal' ? 'flex-row items-center gap-4' : 'flex-col gap-3 items-start'
      } ${
        active 
          ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.15)] relative' 
          : 'bg-[#12121A] border-slate-800 hover:border-slate-700 hover:bg-[#161622]'
      }`}
    >
      {active && layout === 'vertical' && (
        <div className="absolute top-3 right-3 text-purple-400">
          <Check size={16} />
        </div>
      )}
      <div className={`p-2 rounded-lg ${active ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800/50 text-slate-400'}`}>
        <Icon size={20} />
      </div>
      <div>
        <h4 className={`font-medium ${active ? 'text-white' : 'text-slate-200'}`}>{title}</h4>
        {desc && <p className="text-xs text-slate-500 mt-1">{desc}</p>}
      </div>
    </button>
  );
  