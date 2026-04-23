import React, { useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Chip from "./Chip";

export const MultiSelectDropdown = ({ 
  label, 
  selectedIds = [], 
  options = [], 
  onToggle, 
  isOpen, 
  setIsOpen, 
  placeholder = "Select options...",
  maxSelection = 3 
}) => {
  const containerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setIsOpen]);

  return (
    <div className="relative space-y-2" ref={containerRef}>
      {/* SYNCED LABEL */}
      <label className="text-[10px] font-[900] text-slate-500 uppercase tracking-[0.2em] px-1">
        {label} {maxSelection && `(Max ${maxSelection})`}
      </label>

      {/* TRIGGER / CHIP CONTAINER */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`min-h-[60px] w-full bg-[#12121A] border border-slate-800 rounded-xl p-3 flex flex-wrap gap-2 items-center cursor-pointer transition-all hover:border-slate-700 ${
          isOpen ? "ring-2 ring-purple-500/50 border-purple-500" : ""
        }`}
      >
        <AnimatePresence mode="popLayout">
          {selectedIds.length > 0 ? (
            selectedIds.map((id) => {
              const option = options.find(opt => opt.value === id);
              return (
                <Chip
                  key={id}
                  label={option?.label || "..."}
                  selected={true}
                  onToggle={() => onToggle(id)}
                />
              );
            })
          ) : (
            <span className="text-sm font-medium text-slate-700 pl-2 tracking-tight">
              {placeholder}
            </span>
          )}
        </AnimatePresence>

        <div className="ml-auto pr-1 text-slate-600">
          <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </div>

      {/* DROPDOWN PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="absolute z-50 w-full mt-2 bg-[#0F0F16] border border-slate-800 rounded-xl shadow-2xl p-3 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {options.map((opt) => {
                const isSelected = selectedIds.includes(opt.value);
                const isDisabled = selectedIds.length >= maxSelection && !isSelected;

                return (
                  <button
                    key={opt.value}
                    disabled={isDisabled}
                    onClick={() => onToggle(opt.value)}
                    className={`
                      flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all text-left
                      ${isSelected 
                        ? "bg-purple-500/10 border-purple-500/50 text-white" 
                        : "bg-white/[0.02] border-transparent text-slate-500 hover:bg-white/5 hover:text-slate-300"
                      }
                      ${isDisabled ? "opacity-20 cursor-not-allowed" : "cursor-pointer"}
                    `}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-tight">
                      {opt.label}
                    </span>
                    {isSelected && <Check size={12} className="text-purple-400" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};