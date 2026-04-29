import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  ShieldCheck, 
  Edit2, 
  Zap, 
  Plus,  
} from "lucide-react"; // Note: verify your FaGithub import source
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { getMe } from '../../services/auth/auth-services';
import { useSelector } from 'react-redux';

export const ProfileDashboard = ({ onVerifyGithub }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth); //  use Redux

  const isVerified = user.isVerified || false;
  const completionRate = user.completionScore || 90;

  return (
    <div className="min-h-screen bg-[#09090B] text-slate-200 pb-24 font-sans selection:bg-purple-500/30">
      
      {/* Top Header */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-[480px] mx-auto">
        <button className="p-2 text-slate-500 hover:text-white transition-colors">
          <Zap size={22} className="fill-current" />
        </button>
        <h2 className="text-lg font-black tracking-tighter text-white">AlgoCrush</h2>
        <button className="p-2 text-slate-500 hover:text-white transition-colors">
          <Settings size={22} />
        </button>
      </nav>

      <main className="px-6 max-w-[480px] mx-auto flex flex-col items-center">
        
        {/* 1. CENTRALIZED PROFILE CIRCLE */}
        <div className="relative mt-4 mb-8">
          {/* Progress Ring */}
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="74"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="6"
              fill="transparent"
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
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#09090B] bg-white/5">
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-[900] text-white tracking-tighter uppercase">
                  {user.username?.charAt(0) || "R"}
                </div>
              )}
            </div>
          </div>

          {/* Completion Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#F43F5E] to-[#FB923C] px-3 py-1 rounded-full shadow-[0_4_20px_rgba(244,63,94,0.3)]">
            <span className="text-[10px] font-black text-white uppercase tracking-tighter">
              {completionRate}% complete
            </span>
          </div>
        </div>

        {/* 2. IDENTITY TEXT */}
        <div className="text-center mb-10 flex flex-col items-center gap-1">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-[950] tracking-tighter uppercase text-white">
              {user.username || "Rohan Pawar"}
            </h1>
            <ShieldCheck 
              size={22} 
              strokeWidth={3}
              className={isVerified ? "text-blue-500" : "text-white/20"} 
            />
          </div>
          <p className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-slate-400">
            {user.role_name || "Fullstack Architect"}
          </p>
        </div>

        {/* 3. PRIMARY ACTIONS */}
        <div className="grid grid-cols-3 gap-8 w-full max-w-sm px-4 mb-12">
          <div className="flex flex-col items-center gap-2">
            <button className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:scale-110 transition-all">
              <Settings size={22} />
            </button>
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">Settings</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => navigate("/profile/edit")}
              className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all relative"
            >
              <Edit2 size={24} />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#09090B]" />
            </button>
            <span className="text-[10px] font-black uppercase text-white tracking-tighter">Edit Profile</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={onVerifyGithub}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F43F5E] to-[#FB923C] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all relative"
            >
              <FaGithub size={22} />
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">
                <Plus size={10} className="text-red-500 stroke-[4]" />
              </div>
            </button>
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">Verify Github</span>
          </div>
        </div>

        {/* 4. BOOST FOOTER */}
        <div className="w-full flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center">
            <Zap size={20} className="text-purple-500 mb-2 fill-current shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
            <h4 className="text-sm font-black text-white">Identity Boost</h4>
            <p className="text-[11px] text-slate-500 text-center px-8 leading-relaxed">
              Be a top profile in your area for 30 minutes to get more matches.
            </p>
          </div>
          
          <button className="w-full max-w-[280px] py-4 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-colors">
            My Boosts
          </button>
        </div>

      </main>
    </div>
  );
};