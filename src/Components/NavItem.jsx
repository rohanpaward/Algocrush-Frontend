import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, MessageCircle, User } from "lucide-react";

const NavItem = ({ icon: Icon, isActive, onClick, badge }) => (
  <button 
    onClick={onClick}
    className={`relative transition-all duration-300 p-2 rounded-xl ${
      isActive ? 'text-white scale-110' : 'text-slate-600 hover:text-slate-300'
    }`}
  >
    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
    
    {badge && (
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-black text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#16161D]">
        {badge}
      </span>
    )}
    
    {isActive && (
      <motion.div 
        layoutId="activeGlow"
        className="absolute inset-0 bg-white/10 blur-xl rounded-full -z-10"
      />
    )}
  </button>
);

export const GlobalNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'feed', icon: Zap },
    { id: 'discovery', icon: Target },
    { id: 'messages', icon: MessageCircle, badge: 3 },
    { id: 'profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#09090B] via-[#09090B] to-transparent pointer-events-none z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-[420px] mx-auto bg-[#16161D]/80 backdrop-blur-2xl border border-white/10 h-20 rounded-full px-8 flex items-center justify-between pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            isActive={activeTab === item.id}
            badge={item.badge}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </motion.div>
    </div>
  );
};