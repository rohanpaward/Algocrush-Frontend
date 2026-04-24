import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../slice/auth-slice";
import { GET_BUILD_TYPES } from "../../../constants";
import api from "../../../api/axiosInstance";
import { ChevronDown, Cpu, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// IMPORT YOUR CHIP COMPONENT
import Chip from "../../../Components/Chip";

export const BuildTypesEditor = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const [buildTypes, setBuildTypes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 1. Fetch Build Types from API
  useEffect(() => {
    const fetchBuildTypes = async () => {
      try {
        const res = await api.get(GET_BUILD_TYPES);
        setBuildTypes(res?.data || []);
      } catch (err) {
        console.error("Error fetching build types:", err);
      }
    };
    fetchBuildTypes();
  }, []);

  // 2. Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Mapping IDs (Backend) to labels (Frontend)
  const selectedIds = user?.buildTypeIds || [];

  const toggleBuildType = (typeId) => {
    let updated;
    if (selectedIds.includes(typeId)) {
      updated = selectedIds.filter((id) => id !== typeId);
    } else {
      if (selectedIds.length >= 3) return; // Hard limit for "Professional" focus
      updated = [...selectedIds, typeId];
    }
    
    // Sync with Auth Slice
    dispatch(updateUser({ buildTypeIds: updated }));
  };

  return (
    <div className="space-y-4 relative mt-[-3rem]" ref={dropdownRef}>
      <label className="text-sm font-medium text-slate-300">
        Build Expertise
      </label>

      {/* CLICKABLE TRIGGER BOX */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className=" mt-1 min-h-[64px] w-full bg-[#12121A] border border-white/5 rounded-2xl p-3 flex flex-wrap gap-2 items-center cursor-pointer hover:border-white/10 transition-all shadow-inner"
      >
        <AnimatePresence mode="popLayout">
          {selectedIds.length > 0 ? (
            selectedIds.map((id) => {
              const type = buildTypes.find(t => t.id === id);
              return (
                <Chip
                  key={id}
                  label={type?.label || "..."}
                  selected={true}
                  onToggle={() => toggleBuildType(id)}
                />
              );
            })
          ) : (
            <span className="text-sm text-slate-600 pl-2">What kind of products do you build?</span>
          )}
        </AnimatePresence>

        <div className="ml-auto pr-2 text-slate-500">
          <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </div>

      {/* DROPDOWN OPTIONS PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute z-50 w-full mt-2 bg-[#0F0F16] border border-white/10 rounded-2xl shadow-2xl p-4 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
              {buildTypes.map((type) => {
                const isSelected = selectedIds.includes(type.id);
                const isDisabled = selectedIds.length >= 3 && !isSelected;

                return (
                  <button
                    key={type.id}
                    disabled={isDisabled}
                    onClick={() => toggleBuildType(type.id)}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left
                      ${isSelected 
                        ? "bg-violet-500/10 border-violet-500/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.1)]" 
                        : "bg-white/[0.02] border-white/[0.05] text-slate-400 hover:border-white/20 hover:text-slate-200"
                      }
                      ${isDisabled ? "opacity-20 cursor-not-allowed" : "cursor-pointer"}
                    `}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-tight">
                      {type.label}
                    </span>
                    {isSelected && <Check size={14} className="text-violet-400 shadow-sm" />}
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