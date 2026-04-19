import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  Rocket,
  RotateCcw,
  MessageSquare,
} from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { REGISTER_USER } from "../../../constants";

// Domain + Intent mapping (since Redux stores IDs)

const INTENT_MAP = {
  1: "Co-Founder",
  2: "Side Project",
  3: "Freelance",
  4: "Learning",
  5: "Open Source",
  6: "Hackathons",
  7: "Networking",
};

export const ReviewStep = ({ setStep }) => {
  // Get Redux data
  const data = useSelector((state) => state.onboarding.formData);
  const domainList = useSelector((state) => state.onboarding.domains);

  const DOMAIN_MAP = useMemo(() => {
    return domainList.reduce((acc, domain) => {
      acc[domain.id] = domain.name;
      return acc;
    }, {});
  }, [domainList]);
  
  console.log(DOMAIN_MAP,'this is the domain map')

  // Basic info
  const name = data.name || "Alex Chen";
  const role = data.roleName || "Cloud Native Engineer";
  const firstLetter = name.charAt(0).toUpperCase();

  //  Project
  const projectName = data.projectName || "Nexus Protocol";
  const projectDesc =
    data.projectDesc || "Matching serious builders fast.";

  //  Domains (IDs → names, max 3)
  const selectedDomains =
  data.domainIds?.map((id) => DOMAIN_MAP[id])?.filter(Boolean) || [];

  console.log(selectedDomains,'this is the selected domain')

  //  Intent
  const intent =
    INTENT_MAP[data.lookingfor] || "Collaboration";


    const handleRegister = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const res = await axios.post(
          `${REGISTER_USER}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
    
        console.log("Success:", res.data);
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
      }
    };

  return (
    <div className="flex flex-col items-center justify-center pb-20 pt-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] bg-[#0A0A0F] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-8 pb-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl font-black text-white shadow-lg">
                {firstLetter}
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0A0A0F]" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {name}
                <ShieldCheck size={18} className="text-blue-500" />
              </h3>
              <p className="text-xs text-slate-500 uppercase">
                {role}
              </p>
            </div>
          </div>

          {/* Domains */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {selectedDomains.length ? (
              selectedDomains.slice(0, 3).map((domain) => (
                <span
                  key={domain}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-slate-400 uppercase"
                >
                  {domain}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-600">
                No domains selected
              </span>
            )}
          </div>

          {/* Project */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-2">
              <Target size={14} className="text-purple-500" />
              <span className="text-[10px] text-slate-600 uppercase">
                Active Build
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#111118] border border-white/5">
              <h4 className="text-sm font-bold text-white">
                {projectName}
              </h4>
              <p className="text-xs text-slate-500 italic">
                "{projectDesc}"
              </p>
            </div>
          </div>

          {/* Intent */}
          <div className="py-3 px-4 bg-purple-500/5 border border-purple-500/10 rounded-xl flex justify-between">
            <span className="text-[10px] text-slate-500 uppercase">
              Looking for
            </span>
            <span className="text-xs font-bold text-purple-400 uppercase">
              {intent}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex items-center gap-5 mt-12">
        <button
          onClick={() => setStep(1)}
          className="w-14 h-14 rounded-full bg-[#0A0A0F] border border-white/5 flex items-center justify-center text-slate-500 hover:text-white"
        >
          <RotateCcw size={22} />
        </button>

        <button onClick= { handleRegister }className="h-16 px-10 rounded-full bg-white text-black font-bold flex items-center gap-3">
          Enter Algocrush <Rocket size={20} />
        </button>

        <button className="w-14 h-14 rounded-full bg-[#0A0A0F] border border-white/5 flex items-center justify-center text-slate-500 hover:text-white">
          <MessageSquare size={22} />
        </button>
      </div>
    </div>
  );
};