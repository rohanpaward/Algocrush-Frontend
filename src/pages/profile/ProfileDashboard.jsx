import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  ShieldCheck, 
  Edit2, 
  Zap, 
  Plus ,
  User, 
  Camera
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getMe } from '../../services/auth/auth-services';

export const ProfileDashboard = ({ onVerifyGithub }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Logic for the requested verification badge color
  const isVerified = user.isVerified || false;
  const completionRate = user.completionScore || 90;

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
    <div className="min-h-screen bg-[#09090B] text-slate-200 pb-24 font-sans">
      {/* Top Header */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-[480px] mx-auto">
        <button className="p-2 text-slate-400 hover:text-white transition-colors">
          <Zap size={22} className="fill-current" />
        </button>
        <h2 className="text-lg font-black tracking-tighter dark:text-white">AlgoCrush</h2>
        <button className="p-2 text-slate-400 hover:text-white transition-colors">
          <Settings size={22} />
        </button>
      </nav>

      <main className="px-6 max-w-[480px] mx-auto flex flex-col items-center">
        
        {/* 1. CENTRALIZED PROFILE CIRCLE (Based on Ref Image 5) */}
        <div className="relative mt-4 mb-8">
          {/* Progress Ring */}
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="74"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-slate-100 dark:text-white/5"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="74"
              stroke="url(#gradient)"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray="465"
              initial={{ strokeDashoffset: 465 }}
              animate={{ strokeDashoffset: 465 - (465 * completionRate) / 100 }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F43F5E" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
            </defs>
          </svg>

          {/* Avatar Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-[#09090B] bg-white dark:bg-white/5">
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-light text-black tracking-tighter uppercase dark:text-white">
                  {user.username?.charAt(0) || "R"}
                </div>
              )}
            </div>
          </div>

          {/* Completion Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#F43F5E] to-[#FB923C] px-3 py-1 rounded-full shadow-lg">
            <span className="text-[10px] font-black text-white uppercase tracking-tighter">
              {completionRate}% complete
            </span>
          </div>
        </div>

        {/* 2. IDENTITY TEXT & VERIFIED BADGE */}
        <div className="text-center mb-10 flex flex-col items-center gap-1">
  {/* USERNAME & BADGE */}
  <div className="flex items-center justify-center gap-2">
    <h1 className="text-3xl font-[950] tracking-tighter uppercase text-white dark:text-white">
      {user.username || "Rohan Pawar"}
    </h1>
    <ShieldCheck 
      size={22} 
      strokeWidth={3}
      className={isVerified ? "text-blue-500" : "text-slate-300 dark:text-slate-600"} 
    />
  </div>

  {/* ROLE NAME - Improved Typography */}
  <p className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-white dark:text-white">
    {user.role_name || "Fullstack Architect"}
  </p>
</div>

        {/* 3. PRIMARY ACTIONS (Circular Grid) */}
        <div className="grid grid-cols-3 gap-8 w-full max-w-sm px-4 mb-12">
          {/* Settings / Gear */}
          <div className="flex flex-col items-center gap-2">
            <button className="w-14 h-14 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 shadow-sm hover:scale-110 transition-transform">
              <Settings size={22} />
            </button>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Settings</span>
          </div>

          {/* Edit Profile (Center) */}
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => navigate("/profile/edit")}
              className="w-16 h-16 rounded-full bg-white dark:bg-white/10 border-2 border-slate-200 dark:border-white/20 flex items-center justify-center text-slate-800 dark:text-white shadow-xl hover:scale-110 transition-transform relative"
            >
              <Edit2 size={24} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-400 " />
            </button>
            <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-400 tracking-tighter">Edit Profile</span>
          </div>

          {/* Verify GitHub (Replacement for Add Media) */}
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={onVerifyGithub}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F43F5E] to-[#FB923C] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform relative"
            >
              <FaGithub size={22} />
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-slate-100">
                <Plus size={10} className="text-red-500 stroke-[4]" />
              </div>
            </button>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter tracking-tighter">Verify Github</span>
          </div>
        </div>

        {/* 4. BOOST FOOTER (Ref Image 5 Style) */}
        <div className="w-full flex flex-col items-center space-y-4 opacity-80">
          <div className="flex flex-col items-center">
            <Zap size={20} className="text-purple-500 mb-2 fill-current" />
            <h4 className="text-sm font-black dark:text-white">Identity Boost</h4>
            <p className="text-[11px] text-slate-500 text-center px-8">
              Be a top profile in your area for 30 minutes to get more matches.
            </p>
          </div>
          
          <button className="w-full max-w-[280px] py-4 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] font-black uppercase tracking-widest text-purple-500 dark:text-white shadow-md">
            My Boosts
          </button>
        </div>

      </main>

      {/* Persistent Bottom Nav remains same */}
    </div>
  );
};