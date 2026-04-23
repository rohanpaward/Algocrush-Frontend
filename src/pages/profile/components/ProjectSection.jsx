import React from "react";
import { BrainCircuit, Globe, Rocket } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Input } from "../../../Components/Input";
import { TextArea } from "../../../Components/TextArea";

export const ProjectSection = ({ data, onUpdate }) => (
  <div className="space-y-10 border-t mt-[-3rem] border-white/[0.03]">
    {/* SECTION HEADER */}
    
    {/* PROJECT NAME */}
    <Input 
      label="Project Name *" 
      placeholder="e.g. AlgoCrush"
      value={data.project_name || ""} 
      onChange={(e) => onUpdate({ project_name: e.target.value })} 
    />
    
    {/* LINKS GROUP */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Input 
        label="GitHub Repository *" 
        icon={FaGithub} 
        placeholder="https://github.com/..."
        value={data.project_github_url || ""} 
        onChange={(e) => onUpdate({ project_github_url: e.target.value })} 
      />
      <Input 
        label="Live Deployment" 
        icon={Globe} 
        placeholder="https://..."
        value={data.project_live_url || ""} 
        onChange={(e) => onUpdate({ project_live_url: e.target.value })} 
      />
    </div>

    {/* PROBLEM STATEMENT */}
    <TextArea 
      label="What problem does this solve? *" 
      placeholder="Students struggle to find hackathon teammates..."
      value={data.project_problem || ""} 
      onChange={(e) => onUpdate({ project_problem: e.target.value })} 
      maxLength={120}
    />

    {/* CHALLENGE + SOLUTION GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <TextArea 
        label="Biggest challenge you faced *" 
        placeholder="Handling real-time sync across users..."
        value={data.project_challenge || ""} 
        onChange={(e) => onUpdate({ project_challenge: e.target.value })} 
        maxLength={120}
      />
      <TextArea 
        label="How did you solve it? *" 
        placeholder="Used WebSockets + Redis pub/sub..."
        value={data.project_solution || ""} 
        onChange={(e) => onUpdate({ project_solution: e.target.value })} 
        maxLength={120}
      />
    </div>

    {/* CURRENT BUILD */}
    <Input 
      label="What are you currently building? (optional)" 
    //   icon={Rocket}
      placeholder="AI startup idea / Nothing right now"
      value={data.current_build || ""} 
      onChange={(e) => onUpdate({ current_build: e.target.value })} 
    />
  </div>
);