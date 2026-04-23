import React from "react";
import { motion } from "framer-motion";
import { Camera, Pencil } from "lucide-react";

const tapScale = { scale: 0.95 };

/**
 * ProfileAvatar Component
 * @param {string}   avatar     - URL of the current profile photo
 * @param {string}   username   - Used for fallback initial
 * @param {function} onUpload   - Handler for file input change
 * @param {Object}   fileRef    - React ref for the hidden file input
 */
export const ProfileAvatar = ({ avatar, username, onUpload, fileRef }) => {
  return (
    <div className="flex flex-col items-center gap-6 mb-12">
      <div 
        className="relative group cursor-pointer" 
        onClick={() => fileRef.current?.click()}
      >
        {/* Outer Gradient Ring (Animated Border) */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-[3px] shadow-2xl shadow-purple-950/20 transition-transform duration-500 group-hover:scale-105">
          
          {/* Inner Container */}
          <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center overflow-hidden border-[3px] border-[#050505]">
            {avatar ? (
              <img 
                src={avatar} 
                alt="Profile" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <Camera className="text-slate-700 group-hover:text-white transition-colors" size={24} />
                <span className="text-4xl font-[900] text-white tracking-tighter uppercase">
                  {username?.charAt(0) || "R"}
                </span>
              </div>
            )}
            
            {/* Dark Overlay on Hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
               <Camera size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* Floating Pencil Edit Button */}
        <motion.div 
          className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-white dark:bg-[#16161D] border-2 border-white dark:border-[#050505] flex items-center justify-center text-slate-900 dark:text-white shadow-xl"
          whileTap={tapScale}
          whileHover={{ scale: 1.1 }}
        >
          <Pencil size={16} strokeWidth={2.5} />
          
          {/* Status Indicator Dot */}
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#16161D]" />
        </motion.div>
      </div>

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileRef} 
        className="hidden" 
        accept="image/*" 
        onChange={onUpload} 
      />
      
      {/* Label */}
      <div className="text-center">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
          Identity Visual
        </p>
      </div>
    </div>
  );
};