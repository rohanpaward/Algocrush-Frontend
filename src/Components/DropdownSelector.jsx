import { ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";
// ChevronDown

// --- Sub-Component: DropdownSelector ---
export const DropdownSelector = ({ label, value, options, onSelect, isOpen, setIsOpen, placeholder }) => {
    const containerRef = useRef(null);
  
    // Close when clicking outside
    useEffect(() => {
      const handler = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [setIsOpen]);
  
    return (
      <div className="relative space-y-3" ref={containerRef}>
        <label className="text-sm font-medium text-slate-300">
          {label}
        </label>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-[#12121A] border border-white/5 rounded-xl p-4 text-sm text-slate-300 cursor-pointer flex justify-between items-center hover:border-white/10 transition-all"
        >
          <span className={value ? "text-slate-200" : "text-slate-600"}>
            {value || placeholder}
          </span>
          <ChevronDown size={16} className={`text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
  
        {isOpen && (
          <div className="absolute z-20 w-full mt-2 border border-slate-800 rounded-xl bg-[#0F0F16] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="max-h-60 overflow-y-auto">
              {options.map((opt) => (
                <div
                  key={opt.value}
                  className="px-4 py-3 hover:bg-white/5 cursor-pointer text-sm text-slate-400 hover:text-white transition-colors border-b border-white/[0.02] last:border-0"
                  onClick={() => {
                    onSelect(opt);
                    setIsOpen(false);
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };