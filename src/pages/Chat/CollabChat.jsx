import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Code2, MoreVertical, Zap } from "lucide-react";
import { getConvoById } from "../../services/chat/chat-services";

export const CollabChat = ({ matchProfile, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    console.log(inputValue)

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await getConvoById({
                    roomId: matchProfile.room_id,
                });

                // depending on your backend response structure
                setMessages(res.data || res);
            } catch (e) {
                console.error("Error fetching messages:", e);
            }
        };

        fetchMessages();
    }, []);


    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage = {
            id: `msg-${Date.now()}`,
            type: "sent",
            text: inputValue,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputValue("");
    };

    // Fallback data if profile isn't passed for some reason
    const profile = matchProfile
    console.log(profile, 'this is profile')

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-[#0a0a0a] flex flex-col font-sans"
        >
            {/* --- HEADER --- */}
            <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a] bg-[#111111]/80 backdrop-blur-md pt-12 shrink-0">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors rounded-full active:bg-white/5"
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${profile.color} flex items-center justify-center shrink-0 border border-white/10`}>
                            {profile.avatar ? (
                                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover rounded-full" />
                            ) : (
                                <span className="text-sm font-bold text-white">{profile.name.charAt(0)}</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white tracking-tight">{profile.name}</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest">{profile.role}</span>
                        </div>
                    </div>
                </div>

                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* --- CHAT AREA --- */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">

                <div className="text-gray-300 text-center ">
                    Your vibe Matched On{" "}
                    {new Date(profile.matched_on).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}        </div>

                {messages.map((msg) => {
                    // SYSTEM MESSAGE
                    if (msg.type === "system") {
                        return (
                            <div key={msg.id} className="flex flex-col items-center justify-center my-6">
                                <div className="px-4 py-1.5 bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-full flex items-center gap-2">
                                    <Zap size={12} className="text-[#d8b4fe]" />
                                    <span className="text-[10px] font-bold text-[#d8b4fe] uppercase tracking-widest">{msg.text}</span>
                                </div>
                                <span className="text-[9px] text-slate-600 mt-2 font-medium">{msg.time}</span>
                            </div>
                        );
                    }

                    // RECEIVED MESSAGE
                    if (msg.type === "received") {
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={msg.id}
                                className="flex flex-col items-start max-w-[85%]"
                            >
                                <div className="bg-[#1a1a1a] border border-[#2a2a2a] text-slate-200 text-[14px] px-4 py-3 rounded-2xl rounded-tl-sm leading-relaxed">
                                    {msg.text}
                                </div>
                                <span className="text-[9px] text-slate-600 mt-1.5 font-medium ml-1">{msg.time}</span>
                            </motion.div>
                        );
                    }

                    // SENT MESSAGE
                    return (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, originX: 1, originY: 1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={msg.id}
                            className="flex flex-col items-end self-end ml-auto max-w-[85%]"
                        >
                            <div className="bg-[#7c3aed] text-white text-[14px] px-4 py-3 rounded-2xl rounded-tr-sm leading-relaxed shadow-[0_5px_15px_rgba(124,58,237,0.2)]">
                                {msg.text}
                            </div>
                            <span className="text-[9px] text-slate-500 mt-1.5 font-medium mr-1">{msg.time}</span>
                        </motion.div>
                    );
                })}
            </div>

            {/* --- INPUT AREA --- */}
            <div className="p-4 bg-[#111111] border-t border-[#2a2a2a] shrink-0 pb-8">
                <form
                    onSubmit={handleSend}
                    className="flex items-end gap-2 bg-[#1a1a1a] border border-[#2a2a2a] p-1.5 rounded-[20px] focus-within:border-[#7c3aed]/50 transition-colors"
                >
                    {/* Action Button (Code Snippet/Attachment) */}
                    <button
                        type="button"
                        className="p-2.5 text-slate-400 hover:text-[#d8b4fe] transition-colors rounded-full shrink-0"
                    >
                        <Code2 size={20} />
                    </button>

                    {/* Text Input */}
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Send a memo..."
                        className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none resize-none max-h-[120px] py-2.5 custom-scrollbar"
                        rows="1"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend(e);
                            }
                        }}
                    />

                    {/* Send Button */}
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="p-2.5 bg-[#7c3aed] text-white rounded-full shrink-0 disabled:opacity-50 disabled:bg-[#2a2a2a] disabled:text-slate-500 transition-all hover:scale-105 active:scale-95"
                    >
                        <Send size={18} className="ml-0.5" />
                    </button>
                </form>
            </div>

        </motion.div>
    );
};

export default CollabChat;