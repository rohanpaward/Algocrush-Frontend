import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence } from "framer-motion";
import { ShieldCheck, ChevronUp, ChevronDown, Globe, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

// --- MOCK DATA (Rahul & Priya) ---
const PROFILES = [
  {
    id: 1,
    name: "Rahul Krishnan",
    role: "Full-stack • PM",
    college: "BITS Pilani • 3rd year • CS",
    status: "Active",
    vibe: "Voice memo it and sleep — if it's good it'll survive morning",
    projectName: "AI scheduling tool for college clubs",
    projectDesc: "Looking for a designer before demo day.",
    githubUrl: "#",
    liveUrl: "#",
    canBuild: ["Web apps", "APIs & backends", "UI design", "AI integrations"],
    intent: "Cofounder",
    challenge: "Matching algo kept failing. Realised the problem wasn't the code — it was garbage input data.",
    solution: "Rebuilt the onboarding from scratch.",
    color: "from-purple-500 to-blue-500"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Designer • No-code",
    college: "NID Ahmedabad • 2nd year • UX Design",
    status: "Selective",
    vibe: "Make a rough Figma sketch right then — can't sleep till it's out of my head",
    projectName: "Campus Event App",
    projectDesc: "Nothing specific right now — open to ideas",
    githubUrl: "#",
    liveUrl: "#",
    canBuild: ["Product design", "Prototypes", "No-code apps", "Brand & visual"],
    intent: "Build partner",
    challenge: "Spent a week on a design no one understood. Did 5 user interviews in 2 days.",
    solution: "Scrapped everything and rebuilt in 3 hours.",
    color: "from-emerald-400 to-teal-500"
  }
];

// --- HELPER COMPONENTS ---
const StatusPill = ({ status }) => {
  const styles = {
    Active: "bg-green-600 text-white border-green-500",
    Selective: "bg-amber-500 text-black border-amber-400",
    Closed: "bg-red-600 text-white border-red-500"
  }[status] || "bg-gray-600 text-white";

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border ${styles}`}>
      {status}
    </span>
  );
};

const IntentPill = ({ intent }) => {
  const styles = {
    "Cofounder": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Hackathon": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Build partner": "bg-teal-500/10 text-teal-400 border-teal-500/20",
    "Open source": "bg-green-500/10 text-green-400 border-green-500/20"
  }[intent] || "bg-gray-500/10 text-gray-400 border-gray-500/20";

  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${styles}`}>
      {intent}
    </span>
  );
};

// --- PROFILE CARD COMPONENT ---
const ProfileCard = ({ profile, index, setCards, cards, isTop }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Animation Transforms
  const rotate = useTransform(x, [-200, 200], [-8, 8]);
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const passOpacity = useTransform(x, [-20, -100], [0, 1]);
  const glowRight = useTransform(x, [0, 100], ["rgba(34,197,94,0)", "rgba(34,197,94,0.15)"]);
  const glowLeft = useTransform(x, [0, -100], ["rgba(239,68,68,0)", "rgba(239,68,68,0.15)"]);

  const handleDragEnd = async (e, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      await controls.start({ x: 500, transition: { duration: 0.3 } });
      setCards(cards.filter(c => c.id !== profile.id));
    } else if (info.offset.x < -threshold) {
      await controls.start({ x: -500, transition: { duration: 0.3 } });
      setCards(cards.filter(c => c.id !== profile.id));
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  const handleAction = async (direction) => {
    const moveX = direction === 'like' ? 500 : -500;
    await controls.start({ x: moveX, transition: { duration: 0.4 } });
    setCards(cards.filter(c => c.id !== profile.id));
  };

  return (
    <motion.div
    className="absolute w-full h-[72vh] max-h-[580px] max-w-[360px] bg-[#111111] border border-[#2a2a2a] rounded-3xl flex flex-col overflow-hidden origin-bottom"
    style={{
      zIndex: 100 - index,
      // 🔥 Lifts the stack up from the bottom so it doesn't overlap the nav
      y: (index * 12) - 40, 
      scale: 1 - index * 0.04,
      x,
      rotate,
      boxShadow: `0 0 20px ${x.get() > 0 ? glowRight.get() : glowLeft.get()}`
    }}
    drag={isTop && !isExpanded ? "x" : false}
    dragConstraints={{ left: 0, right: 0 }}
    onDragEnd={handleDragEnd}
    animate={controls}
  >
      {/* LIKE / PASS STAMPS */}
      <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 z-50 pointer-events-none">
        <div className="border-4 border-green-500 text-green-500 text-4xl font-black px-4 py-1 rounded-xl transform -rotate-12 uppercase tracking-widest">Like</div>
      </motion.div>
      <motion.div style={{ opacity: passOpacity }} className="absolute top-8 right-8 z-50 pointer-events-none">
        <div className="border-4 border-red-500 text-red-500 text-4xl font-black px-4 py-1 rounded-xl transform rotate-12 uppercase tracking-widest">Pass</div>
      </motion.div>

      {/* --- PRIMARY VIEW (SCROLLABLE) --- */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 pb-20">
        
        {/* Identity Strip */}
        <div className="p-5 flex items-start gap-4 border-b border-[#2a2a2a]">
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${profile.color} flex items-center justify-center shrink-0`}>
            <span className="text-xl font-bold text-white">{profile.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h1 className="text-lg font-bold text-white truncate">{profile.name}</h1>
              <StatusPill status={profile.status} />
            </div>
            <p className="text-xs text-slate-400 mt-1">{profile.role}</p>
          </div>
        </div>

        {/* Vibe Section */}
        <div className="p-5 space-y-2">
          <p className="text-[10px] font-semibold text-slate-500 tracking-[0.1em] uppercase">Vibe</p>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
            <p className="text-sm italic text-slate-300 leading-relaxed font-serif">"{profile.vibe}"</p>
          </div>
        </div>

        {/* Building Now */}
        <div className="px-5 space-y-2">
          <p className="text-[10px] font-semibold text-slate-500 tracking-[0.1em] uppercase">Featured Build</p>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 space-y-2">
            <h2 className="font-bold text-white text-sm">{profile.projectName}</h2>
            <p className="text-xs text-slate-400">{profile.projectDesc}</p>
            <div className="flex gap-2 pt-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-black/40 border border-[#2a2a2a] rounded-full text-[10px] text-white"><FaGithub size={12}/> GitHub</span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-900/20 border border-green-500/20 rounded-full text-[10px] text-green-400"><Globe size={12}/> Live</span>
            </div>
          </div>
        </div>

        {/* Can Build */}
        <div className="p-5 space-y-2">
          <p className="text-[10px] font-semibold text-slate-500 tracking-[0.1em] uppercase">Can Build</p>
          <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar no-scrollbar">
            {profile.canBuild.map(tech => (
              <span key={tech} className="shrink-0 px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-xs text-white">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Looking For */}
        <div className="px-5 space-y-2 pb-6">
          <p className="text-[10px] font-semibold text-slate-500 tracking-[0.1em] uppercase">Looking For</p>
          <IntentPill intent={profile.intent} />
        </div>

        <div className="text-center pb-8 border-t border-[#2a2a2a] pt-4 mx-5">
          <p className="text-[10px] text-slate-500 tracking-wider">{profile.college}</p>
        </div>
      </div>

      {/* --- FIXED FOOTER ACTIONS --- */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#111111] via-[#111111] to-transparent p-5 pt-10 z-30">
        <button 
          onClick={() => setIsExpanded(true)}
          className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full p-1 text-slate-400 hover:text-white transition-colors z-40"
        >
          <ChevronUp size={20} />
        </button>

        <div className="flex gap-3">
          <button 
            onClick={() => handleAction('pass')}
            className="flex-1 py-3.5 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm font-bold rounded-xl active:scale-95 transition-transform"
          >
            Pass
          </button>
          <button 
            onClick={() => handleAction('like')}
            className="flex-1 py-3.5 bg-[#7c3aed] text-white text-sm font-bold rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.3)] active:scale-95 transition-transform"
          >
            Collab Request
          </button>
        </div>
      </div>

      {/* --- SECONDARY VIEW (EXPANDED BOTTOM SHEET) --- */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-[#111111] flex flex-col"
          >
            <div className="p-4 border-b border-[#2a2a2a] flex justify-between items-center bg-[#111111] shrink-0">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Profile Dive</span>
               <button onClick={() => setIsExpanded(false)} className="p-1 text-slate-400 hover:text-white bg-[#1a1a1a] rounded-full">
                 <ChevronDown size={20} />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar">
               {/* Deep Dive Project */}
               <section className="space-y-3">
                 <h3 className="text-[10px] font-semibold text-slate-500 tracking-[0.1em] uppercase">Project Details</h3>
                 <h2 className="text-xl font-bold text-white">{profile.projectName}</h2>
                 <p className="text-sm text-slate-300 leading-relaxed">{profile.projectDesc}</p>
                 
                 <div className="bg-[#1a1208] border border-amber-900/30 rounded-xl p-4 space-y-3 mt-4">
                    <p className="text-xs font-bold text-amber-500 uppercase">Hardest Build Moment</p>
                    <p className="text-sm text-amber-100/80 italic font-serif leading-relaxed">"{profile.challenge}"</p>
                 </div>
                 
                 <section className="space-y-3">
                 <h3 className="text-[10px] font-semibold text-slate-500 tracking-[0.1em] uppercase">How did you fix it</h3>
                 <div className="bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-xl p-5">
                    <p className="text-lg text-[#d8b4fe] italic font-serif leading-relaxed text-center px-4">"{profile.solution}"</p>
                 </div>
               </section>
               </section>

               {/* Vibe Deep Dive */}
               {/* <section className="space-y-3">
                 <h3 className="text-[10px] font-semibold text-slate-500 tracking-[0.1em] uppercase">3AM Idea Check</h3>
                 <div className="bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-xl p-5">
                    <p className="text-lg text-[#d8b4fe] italic font-serif leading-relaxed text-center px-4">"{profile.vibe}"</p>
                 </div>
               </section> */}

               {/* Links Row */}
               <section className="space-y-3 pb-8">
                 <h3 className="text-[10px] font-semibold text-slate-500 tracking-[0.1em] uppercase">External Links</h3>
                 <div className="flex gap-3">
                    <button className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-white hover:bg-[#2a2a2a] transition-colors"><FaGithub size={20} /></button>
                    <button className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-white hover:bg-[#2a2a2a] transition-colors"><ExternalLink size={20} /></button>
                 </div>
               </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- MAIN FEED CONTAINER ---
export const DiscoveryFeed = () => {
  const [cards, setCards] = useState(PROFILES);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden p-4 relative font-sans">
      <div className="relative w-full max-w-[380px] h-[85vh] max-h-[720px] flex items-center justify-center">
        {cards.length === 0 ? (
          <div className="text-slate-500 text-sm font-medium">No more builders in your area.</div>
        ) : (
          cards.map((profile, index) => (
            <ProfileCard 
              key={profile.id} 
              profile={profile} 
              index={index} 
              cards={cards} 
              setCards={setCards} 
              isTop={index === 0} 
            />
          )).reverse() // Reverse so the first item in array renders on top in the DOM
        )}
      </div>

      {/* Global styles for hiding scrollbars on webkit but allowing scroll */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default DiscoveryFeed;