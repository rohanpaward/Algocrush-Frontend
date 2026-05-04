import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Users, Search, CheckCircle2, Heart } from "lucide-react";
import { getChatList } from "../../services/chat/chat-services";
import { useSelector } from "react-redux";
import socket from "../../socket";
import CollabChat from "./CollabChat";

// --- HELPER: Random Gradients for Avatars ---
const gradients = [
    "from-purple-500 to-indigo-500",
    "from-emerald-400 to-teal-500",
    "from-[#F43F5E] to-[#FB923C]",
    "from-blue-500 to-cyan-500",
    "from-pink-500 to-rose-500"
];
const getGradient = (id) => gradients[Number(id || 0) % gradients.length];

// --- MOCK NEW MATCHES (Keep static until you have an API for this) ---
const NEW_MATCHES = [
    { id: "likes", type: "likes", count: 12 },
    { id: 1, name: "Aarav", color: "from-blue-500 to-cyan-500" },
    { id: 2, name: "Neha", color: "from-orange-500 to-red-500" },
];

export const InboxList = ({ onOpenChat }) => {

    const { user } = useSelector((state) => state.auth);
    const userId = user?.id

    const [chatData, setChatData] = useState([])
    const [activeChat, setActiveChat] = useState(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await getChatList(userId);
                setChatData(res.data.data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchChats();
    }, []);

    // Format the time if it exists
    const formatTime = (dateString) => {
        if (!dateString) return "New";
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // socket 
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected:", socket.id);

            socket.emit("ping", "Hello from React");
        });

        socket.on("pong", (msg) => {
            console.log(msg);
        });

        return () => {
            socket.off("connect");
            socket.off("pong");
        };
    }, []);

    return (
        <div className="h-[100dvh] w-full bg-[#0a0a0a] flex items-start justify-center overflow-hidden font-sans">
            <div className="w-full max-w-[380px] h-full flex flex-col bg-[#111111] border-x border-[#2a2a2a] relative">
                <AnimatePresence>
                    {activeChat && (
                        <CollabChat
                            matchProfile={{
                                name: activeChat.other_username,
                                role: activeChat.other_role,
                                avatar: activeChat.other_photo,
                                room_id: activeChat.room_id,
                                matched_on:activeChat.created_at,
                                color: getGradient(activeChat.other_user_id)
                            }}

                            onBack={() => setActiveChat(null)}
                        />
                    )}
                </AnimatePresence>
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between px-5 pt-12 pb-4 shrink-0">
                    <h1 className="text-3xl font-[900] text-white tracking-tight">Chat</h1>
                    <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-full p-1.5 border border-[#2a2a2a]">
                        <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-full">
                            <Shield size={20} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-full">
                            <Users size={20} />
                        </button>
                    </div>
                </div>

                {/* --- SCROLLABLE CONTENT --- */}
                <div className="flex-1 overflow-y-auto custom-scrollbar pb-24">

                    {/* SEARCH BAR */}
                    <div className="px-5 mb-6">
                        <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-2.5">
                            <Search size={18} className="text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search collabs..."
                                className="bg-transparent border-none text-white text-[13px] w-full focus:outline-none placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    {/* --- NEW MATCHES SECTION --- */}
                    <div className="mb-8">
                        <h2 className="px-5 text-[13px] font-bold text-slate-300 tracking-wide mb-3">New Collabs</h2>

                        <div className="flex overflow-x-auto gap-3 px-5 pb-4 no-scrollbar">
                            {NEW_MATCHES.map((match) => {
                                if (match.type === "likes") {
                                    return (
                                        <motion.div
                                            key="likes"
                                            whileTap={{ scale: 0.95 }}
                                            className="relative shrink-0 w-20 h-28 rounded-xl bg-gradient-to-b from-[#7c3aed]/20 to-[#0a0a0a] border border-[#7c3aed]/50 flex flex-col items-center justify-center cursor-pointer overflow-hidden group"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-[#7c3aed] flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                                                <span className="text-white font-bold text-sm">{match.count}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-[#d8b4fe] tracking-widest uppercase">Requests</span>
                                            <div className="absolute -bottom-2 bg-[#111111] p-1 rounded-full border border-[#2a2a2a]">
                                                <Heart size={14} className="fill-[#7c3aed] text-[#7c3aed]" />
                                            </div>
                                        </motion.div>
                                    );
                                }

                                return (
                                    <motion.div
                                        key={match.id}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative shrink-0 w-20 h-28 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden cursor-pointer"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${match.color} opacity-40`} />
                                        <div className="absolute inset-0 backdrop-blur-[2px] flex items-end justify-center pb-3">
                                            <span className="text-white text-[11px] font-bold drop-shadow-md z-10">{match.name}</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- MESSAGES LIST --- */}
                    <div>
                        <h2 className="px-5 text-[13px] font-bold text-slate-300 tracking-wide mb-3">Messages</h2>

                        <div className="flex flex-col">
                            {chatData.length === 0 ? (
                                <div className="px-5 text-slate-500 text-sm mt-4">No messages yet. Get swiping!</div>
                            ) : (
                                chatData.map((chat) => {
                                    const unreadCount = parseInt(chat.unread_count, 10) || 0;
                                    const isRead = unreadCount === 0;
                                    const displayMessage = chat.last_message || "Matched! Say hi. 🚀"; // Fallback for new matches
                                    const username = chat.other_username?.trim() || "User";
                                    const avatarColor = getGradient(chat.other_user_id);

                                    return (
                                        <motion.div
                                            key={chat.room_id}
                                            whileTap={{ scale: 0.98, backgroundColor: "rgba(255,255,255,0.02)" }}
                                            onClick={() => {
                                                setActiveChat(chat); // This triggers the <CollabChat /> overlay
                                                if (onOpenChat) onOpenChat(chat); // Still notify the parent if needed
                                            }}
                                            className="flex items-center gap-4 px-5 py-3.5 cursor-pointer border-b border-[#2a2a2a]/50 hover:bg-[#1a1a1a]/50 transition-colors"
                                        >
                                            {/* Avatar Container */}
                                            <div className="relative shrink-0">
                                                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center border border-white/10 overflow-hidden`}>
                                                    {chat.other_photo ? (
                                                        <img src={chat.other_photo} alt={username} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-lg font-bold text-white">{username.charAt(0)}</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Message Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <span className="text-[15px] font-bold text-white truncate">{username}</span>

                                                    {/* Role Badge directly from API */}
                                                    {chat.other_role && (
                                                        <span className="ml-2 px-1.5 py-0.5 bg-white/10 text-slate-300 text-[8px] font-[900] uppercase tracking-widest rounded-sm border border-white/10">
                                                            {chat.other_role}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[13px] truncate ${!isRead ? 'text-white font-bold' : 'text-slate-400'}`}>
                                                        {/* Arrow icon if a message exists */}
                                                        {chat.last_message && <span className="text-slate-600 mr-1">↳</span>}
                                                        {displayMessage}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Time & Unread Count */}
                                            <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                                                <span className="text-[11px] font-medium text-slate-500">
                                                    {formatTime(chat.last_message_at)}
                                                </span>

                                                {!isRead && (
                                                    <div className="w-5 h-5 rounded-full bg-[#7c3aed] flex items-center justify-center">
                                                        <span className="text-[10px] font-bold text-white">{unreadCount}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                {/* Global style helper for scrollbars */}
                <style dangerouslySetInnerHTML={{
                    __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
            </div>
        </div>
    );
};