import React, { useState } from "react";
import { Check, Camera } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Input } from "../../Components/Input";
import { Pill } from "../../Components/Pill";
import { TextArea } from "../../Components/TextArea";


// Use your existing components: Input, TextArea, Pill

export const EditProfile = () => {
  const [data, setData] = useState({
    name: "Rohan Pawar",
    collegeName: "UC Berkeley",
    year: "Junior",
    primaryRole: "Fullstack Architect",
    openForCollab: true,
    buildTypeIds: [1, 2],
    projectName: "The Forge",
    projectGithubUrl: "",
    ProjectLiveUrl: "",
    projectProblem: "",
    projectChallenge: "",
    projectSolution: "",
    currentBuild: "",
    vibeAnswer: ""
  });

  const buildTypes = [
    { id: 1, label: "SaaS" }, { id: 2, label: "AI/ML" }, 
    { id: 3, label: "Web3" }, { id: 4, label: "Mobile" }
  ];

  const updateForm = (updates) => setData(prev => ({ ...prev, ...updates }));

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 pb-32">
      
      {/* HEADER */}
      <nav className="fixed top-0 inset-x-0 h-16 bg-[#050505]/80 backdrop-blur-md border-b border-white/[0.05] z-50">
        <div className="max-w-2xl mx-auto h-full flex items-center justify-between px-6">
          <span className="text-[10px] font-black tracking-widest uppercase">Edit Profile</span>
          <button className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tight flex items-center gap-2">
            Save <Check size={14} strokeWidth={3} />
          </button>
        </div>
      </nav>

      {/* SCROLLABLE FORM */}
      <main className="pt-28 px-6 max-w-xl mx-auto flex flex-col gap-10">
        
        {/* PROFILE PICTURE */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-[#111] border border-white/10 flex items-center justify-center overflow-hidden">
               {/* Replace with actual img tag if needed */}
               <span className="text-2xl font-light text-slate-500">RP</span>
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={20} className="text-white" />
            </div>
          </div>
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-4">Change Photo</p>
        </div>

        {/* BASIC INFO */}
        <Input 
          label="Display Name *" 
          placeholder="Enter Name" 
          value={data.name} 
          onChange={(e) => updateForm({ name: e.target.value })} 
        />
        
        <Input 
          label="College Name" 
          placeholder="University Name" 
          value={data.collegeName} 
          onChange={(e) => updateForm({ collegeName: e.target.value })} 
        />

        <div className="grid grid-cols-2 gap-6">
          <Input 
            label="Year" 
            placeholder="e.g. Junior" 
            value={data.year} 
            onChange={(e) => updateForm({ year: e.target.value })} 
          />
          <Input 
            label="Primary Role" 
            placeholder="e.g. Developer" 
            value={data.primaryRole} 
            onChange={(e) => updateForm({ primaryRole: e.target.value })} 
          />
        </div>

        <div className="space-y-3">
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Open for Collaboration?</p>
          <div className="flex gap-2">
            <Pill active={data.openForCollab} onClick={() => updateForm({ openForCollab: true })}>Yes</Pill>
            <Pill active={!data.openForCollab} onClick={() => updateForm({ openForCollab: false })}>No</Pill>
          </div>
        </div>

        {/* BUILD TYPES */}
        <div className="space-y-3">
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Build Types</p>
          <div className="flex flex-wrap gap-2">
            {buildTypes.map((type) => (
              <Pill
                key={type.id}
                active={data.buildTypeIds?.includes(type.id)}
                onClick={() => {
                  const active = data.buildTypeIds.includes(type.id);
                  updateForm({ buildTypeIds: active ? data.buildTypeIds.filter(i => i !== type.id) : [...data.buildTypeIds, type.id] });
                }}
              >
                {type.label}
              </Pill>
            ))}
          </div>
        </div>

        {/* PROJECT INFO */}
        <Input 
          label="Project Name *" 
          placeholder="e.g. AlgoCrush" 
          value={data.projectName} 
          onChange={(e) => updateForm({ projectName: e.target.value })} 
        />

        <Input 
          label="GitHub URL *" 
          placeholder="https://github.com/..." 
          value={data.projectGithubUrl} 
          onChange={(e) => updateForm({ projectGithubUrl: e.target.value })} 
        />

        <Input 
          label="Live Demo URL" 
          placeholder="https://..." 
          value={data.ProjectLiveUrl} 
          onChange={(e) => updateForm({ ProjectLiveUrl: e.target.value })} 
        />

        <TextArea 
          label="The Problem *" 
          placeholder="What does this solve?" 
          value={data.projectProblem} 
          onChange={(e) => updateForm({ projectProblem: e.target.value })} 
          maxLength={120} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextArea 
            label="The Challenge *" 
            placeholder="Hardest part..." 
            value={data.projectChallenge} 
            onChange={(e) => updateForm({ projectChallenge: e.target.value })} 
          />
          <TextArea 
            label="The Solve *" 
            placeholder="How you did it..." 
            value={data.projectSolution} 
            onChange={(e) => updateForm({ projectSolution: e.target.value })} 
          />
        </div>

        <Input 
          label="Current Build" 
          placeholder="What are you hacking now?" 
          value={data.currentBuild} 
          onChange={(e) => updateForm({ currentBuild: e.target.value })} 
        />

        {/* VIBE ANSWER */}
        <div className="space-y-2">
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">The 3AM Vibe</p>
          <textarea
            value={data.vibeAnswer}
            onChange={(e) => updateForm({ vibeAnswer: e.target.value })}
            placeholder="Your late night founder energy..."
            maxLength={50}
            rows={3}
            className="w-full p-4 rounded-xl bg-[#111] border border-white/10 text-slate-300 placeholder:text-slate-700 focus:outline-none focus:border-white/20 resize-none text-sm"
          />
          <div className="text-[10px] text-slate-600 text-right">
            {data.vibeAnswer.length}/50
          </div>
        </div>

      </main>
    </div>
  );
};

export default EditProfile;