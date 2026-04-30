import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2 } from "lucide-react"; // Imported Loader2
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { REGISTER_USER } from "../../../constants";
import { setUser } from "../../../slice/auth-slice";

export const ReviewStep = ({ setStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 1. Added loading state
  const [isLoading, setIsLoading] = useState(false);

  const data = useSelector((state) => state.onboarding.formData);
  const lookingForMapping = useSelector((state) => state.onboarding.lookingForOptions);
  const buildTypes = useSelector((state) => state.onboarding.buildtypesoption);

  const selectedIntent = lookingForMapping.find(
    (item) => item.id === data.lookingfor
  );

  const DOMAIN_MAP = useMemo(() => {
    return (buildTypes || []).reduce((acc, item) => {
      acc[String(item.id)] = item.name;
      return acc;
    }, {});
  }, [buildTypes]);

  // 2. Updated handleRegister to toggle loading state
  const handleRegister = async () => {
    if (isLoading) return; // Prevent double-clicks
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(REGISTER_USER, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res?.data?.statusCode === 200) {
        dispatch(setUser(res.data.data));
        navigate("/profile");
      }
    } catch (err) { 
      console.error(err); 
    } finally {
      setIsLoading(false); // Stop loading regardless of success/error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pb-24 pt-8 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[380px] bg-[#0A0A0F] border border-white/[0.08] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[82vh]"
      >
        
        {/* 1. HEADER (Dark Theme Adaptation) */}
        <div className="relative bg-[#161622] pt-6 pb-8 text-center rounded-t-[2rem] border-b border-white/[0.05]">
          <h1 className="text-xl font-[900] text-white tracking-tight">
            {data.name || "Rohan"}
          </h1>
          <p className="text-[13px] font-medium text-slate-400 mt-1">
            {data.roleName || "Backend Developer"}
          </p>

          {/* OVERLAPPING AVATAR (Left Aligned) */}
          <div className="absolute left-6 -bottom-7 z-10">
            <div className="w-14 h-14 rounded-full bg-[#1E1E2A] border-4 border-[#0A0A0F] flex items-center justify-center shadow-sm">
              <span className="text-xl font-black text-indigo-400">
                {data.name?.charAt(0) || "R"}
              </span>
            </div>
          </div>
        </div>

        {/* 2. SCROLLABLE BODY */}
        <div className="p-6 pt-10 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          
          {/* THE VIBE (Dark Theme Box) */}
          <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-4 flex gap-3 items-start shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
            <p className="text-[13px] font-medium text-slate-300 italic leading-snug">
              {data.vibeAnswer || "Start building"}
            </p>
          </div>

          {/* EXPERTISE CHIPS */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 mb-3">Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {data.buildTypeIds?.map((id) => {
                const domainName = DOMAIN_MAP[String(id)] || "Unknown";
                return (
                  <span key={id} className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-medium shadow-sm">
                    {domainName.charAt(0).toUpperCase() + domainName.slice(1)}
                  </span>
                );
              })}
            </div>
          </div>

          {/* STATUS & INTENT */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3.5">
              <p className="text-xs font-medium text-slate-500 mb-1.5">Status</p>
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 capitalize">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {data.collabStatus || "Active"}
              </div>
            </div>
            
            <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3.5">
              <p className="text-xs font-medium text-slate-500 mb-1.5">Looking for</p>
              <p className="text-sm font-bold text-slate-200 truncate">
                {selectedIntent ? selectedIntent.label : "Co-Founder"}
              </p>
            </div>
          </div>

          {/* HARDEST MOMENT */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 mb-3">Hardest Build Moment</h4>
            <div className="bg-orange-500/[0.03] border border-orange-500/10 rounded-2xl p-5">
              <p className="text-[11px] font-bold text-orange-500 mb-1.5 uppercase tracking-wide">The Challenge</p>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                "{data.projectChallenge || "Discovery algorithm to retrieve the users."}"
              </p>
              
              <p className="text-[11px] font-bold text-orange-500 mb-1.5 uppercase tracking-wide">The Solution</p>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {data.projectSolution || "By designing the algorithm to..."}
              </p>
            </div>
          </div>

          {/* CURRENTLY BUILDING */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 mb-3">Currently Building</h4>
            <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4">
              <p className="text-[13px] text-slate-400 leading-relaxed">
                {data.currentBuild || data.projectProblem || "Nothing specific right now — open to ideas."}
              </p>
            </div>
          </div>

        </div>

        {/* 3. STICKY CTA WITH LOADER */}
        <div className="p-5 bg-white/[0.01] border-t border-white/[0.04]">
          <button 
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-white text-black text-[13px] font-[900] hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Creating Profile...
              </>
            ) : (
              "Create Profile"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};