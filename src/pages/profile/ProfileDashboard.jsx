import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  ShieldCheck, 
  Edit2, 
  // Github, 
  Zap, 
  Target, 
  CheckCircle, 
  Check, 
  User, 
  ExternalLink,
  Plus,
  MessageCircle,
  Eye,
  ArrowRight
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // 1. Import the hook
import { getMe } from '../../services/auth/auth-services';


// --- Custom Components ---

const GlassPanel = ({ children, className = "" }) => (
  <div className={`bg-[#111118]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] ${className}`}>
    {children}
  </div>
);

const MetricCard = ({ label, value, icon: Icon, color }) => (
  <GlassPanel className="flex-1 p-5 flex flex-col items-center justify-center text-center group hover:border-white/10 transition-all">
    <div className={`p-2 rounded-xl mb-2 ${color} bg-opacity-10`}>
      <Icon size={18} className={color.replace('bg-', 'text-')} />
    </div>
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    <span className="text-xl font-black text-white mt-1">{value}</span>
  </GlassPanel>
);

export const ProfileDashboard = ({ onEditProfile, onEditPreferences, onVerifyGithub }) => {
  // Logic derived from your vision and references
  const [user, setUser] = useState({})
  const completionRate = user.completionScore || 76; //
  const isVerified = user.isVerified || false;
  const navigate = useNavigate(); // 2. Initialize the hook

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.user || res.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchUser();
  }, []); 

  return (
    <div className="min-h-screen bg-[#09090B] text-slate-200 pb-24">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-8 max-w-[480px] mx-auto">
        <h2 className="text-xl font-black tracking-tighter text-white">AlgoCrush<span className="text-purple-500">.</span></h2>
        <button 
          onClick={onEditPreferences}
          className="p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all"
        >
          <Settings size={20} className="text-slate-400" />
        </button>
      </nav>

      <main className="px-6 max-w-[480px] mx-auto space-y-6">
        
        {/* 1. Profile Header Section */}
        <section className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-purple-600 to-blue-600 p-1">
              <div className="w-full h-full rounded-[2.3rem] bg-[#09090B] flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-light text-white">R</span>
                )}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#09090B] border-4 border-[#09090B]">
               <div className="w-full h-full rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            </div>
          </div>
          
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            {user.username || "Rohan Pawar"} 
            {isVerified && <ShieldCheck size={22} className="text-blue-500" />}
          </h1>
          
          <button 
            onClick={()=>navigate("/profile/edit")}
            className="mt-4 px-8 py-3 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <Edit2 size={14} /> Edit Profile
          </button>
        </section>

        {/* 2. Progress & Completion */}
        <GlassPanel className="p-6">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-[10px] font-bold text-purple-500 uppercase tracking-widest mb-1">Identity Strength</p>
              <h3 className="text-sm font-bold text-white">Complete your profile to be seen</h3>
            </div>
            <span className="text-lg font-black text-white">{completionRate}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
            />
          </div>
        </GlassPanel>

        {/* 3. Fast Actions / Bento Grid */}
        <div className="grid grid-cols-2 gap-4">
           <MetricCard label="Super Likes" value="0" icon={Target} color="bg-blue-500" />
           <MetricCard label="Karma" value="94" icon={Zap} color="bg-orange-500" />
        </div>

        {/* 4. Verification & Consistency */}
        <div className="space-y-3">
          {!isVerified && (
            <button 
              onClick={onVerifyGithub}
              className="w-full p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-blue-500/30 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
                  <FaGithub size={22} />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white">Get Verified</h4>
                  <p className="text-[11px] text-slate-500">Connect GitHub to build trust</p>
                </div>
              </div>
              <Plus size={20} className="text-slate-700" />
            </button>
          )}

          <button className="w-full p-5 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-500/10 rounded-2xl text-pink-400">
                <Zap size={22} />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-white">Consistency Challenge</h4>
                <p className="text-[11px] text-slate-500">3 day streak — 3 days until reward</p>
              </div>
            </div>
            <ArrowRight size={20} className="text-slate-700" />
          </button>
        </div>

        {/* 5. Forge Gold / Monetization */}
        <GlassPanel className="p-8 bg-gradient-to-br from-yellow-500/10 via-[#111118] to-[#111118] border-yellow-500/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-white italic tracking-tighter">FORGE<span className="text-yellow-500 uppercase not-italic ml-1">Gold</span></h3>
            <button className="px-5 py-2 bg-yellow-500 text-black font-black text-[10px] rounded-full uppercase">Upgrade</button>
          </div>
          
          <div className="space-y-4">
             {[
               { label: "See Who Likes You", free: false, gold: true },
               { label: "Top Weekly Picks", free: false, gold: true },
               { label: "Daily Super Pings", free: false, gold: true }
             ].map((perk, i) => (
               <div key={i} className="flex items-center justify-between text-xs border-b border-white/5 pb-2 last:border-0">
                  <span className="text-slate-400 font-medium">{perk.label}</span>
                  <div className="flex gap-6">
                    <span className="text-slate-700"><Check size={14} /></span>
                    <span className="text-yellow-500"><CheckCircle size={14} /></span>
                  </div>
               </div>
             ))}
          </div>
        </GlassPanel>

      </main>

      {/* 6. Persistent Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#09090B] via-[#09090B] to-transparent pointer-events-none">
        <div className="max-w-[420px] mx-auto bg-[#16161D]/80 backdrop-blur-2xl border border-white/10 h-20 rounded-full px-8 flex items-center justify-between pointer-events-auto shadow-2xl">
           <button className="text-slate-600 hover:text-white transition-colors"><Zap size={24}/></button>
           <button className="text-slate-600 hover:text-white transition-colors"><Target size={24}/></button>
           <button className="text-slate-600 hover:text-white transition-colors relative">
             <MessageCircle size={24}/>
             <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-black text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#16161D]">3</span>
           </button>
           <button className="text-white scale-110"><User size={24}/></button>
        </div>
      </div>
    </div>
  );
};