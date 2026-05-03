import React, { useEffect } from "react";
import { motion } from "framer-motion";

export const MatchOverlay = ({ currentUser, matchedProfile, onClose }) => {
  // Prevent scrolling on the body while the overlay is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose} // Tap anywhere on the screen to close
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-md cursor-pointer"
    >
      {/* --- THE TEXT REVEAL --- */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", bounce: 0.6 }}
        className="absolute top-1/3 z-20 pointer-events-none"
      >
        <h1 className="text-4xl md:text-5xl font-[900] text-white uppercase tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] text-center">
          Vibe Matched
        </h1>
      </motion.div>

      {/* --- THE AVATAR COLLISION --- */}
      <div className="relative flex items-center justify-center w-full max-w-[300px] h-[160px] z-10 pointer-events-none">
        
        {/* Current User Avatar (Flies in from Left) */}
        <motion.div
          initial={{ x: -200, opacity: 0, rotate: -20 }}
          animate={{ x: -40, opacity: 1, rotate: -5 }}
          transition={{ type: "spring", damping: 15, stiffness: 150, delay: 0.1 }}
          className="absolute z-20"
        >
          <div className="w-28 h-28 rounded-full border-4 border-[#0a0a0a] shadow-[0_0_40px_rgba(124,58,237,0.5)] overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
             {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="You" className="w-full h-full object-cover" />
             ) : (
                <span className="text-4xl font-black text-white">{currentUser?.username?.charAt(0) || "U"}</span>
             )}
          </div>
        </motion.div>

        {/* Matched Profile Avatar (Flies in from Right) */}
        <motion.div
          initial={{ x: 200, opacity: 0, rotate: 20 }}
          animate={{ x: 40, opacity: 1, rotate: 5 }}
          transition={{ type: "spring", damping: 15, stiffness: 150, delay: 0.1 }}
          className="absolute z-10"
        >
          <div className={`w-28 h-28 rounded-full border-4 border-[#0a0a0a] shadow-[0_0_40px_rgba(249,115,22,0.5)] overflow-hidden bg-gradient-to-br ${matchedProfile?.color || 'from-orange-400 to-red-500'} flex items-center justify-center`}>
             {matchedProfile?.avatar ? (
                <img src={matchedProfile.avatar} alt="Match" className="w-full h-full object-cover" />
             ) : (
                <span className="text-4xl font-black text-white">{matchedProfile?.username?.charAt(0) || "M"}</span>
             )}
          </div>
        </motion.div>

        {/* The Shockwave / Glow (Expands on impact) */}
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="absolute w-32 h-32 rounded-full bg-purple-500 blur-xl z-0"
        />
      </div>

      {/* --- TAP TO CONTINUE HINT --- */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-16 text-slate-400 text-xs tracking-widest uppercase animate-pulse pointer-events-none"
      >
        Tap anywhere to continue
      </motion.p>
    </motion.div>
  );
};