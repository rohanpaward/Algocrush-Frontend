import { BasicInfoStep } from "./steps/BasicInfo";
import { SkillsStep } from "./steps/SkillsStep";
import { ProjectStep } from "./steps/ProjectSetup";
import { IntentStep } from "./steps/Intent";
import { VibeStep } from "./steps/VibeStep";
import { ReviewStep } from "./steps/ReviewStep";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap,Check ,  User,Monitor, CheckCircle, Code, Shield, FileText, Sparkles
} from 'lucide-react';
import { StepActions } from "../../Components/StepActions";


const STEPS = [
  { id: 1, title: 'Basic info', icon: User, description: 'Step 1' },
  { id: 2, title: 'Skills', icon: Code, description: 'Step 2' },
  { id: 3, title: 'Project', icon: Monitor, description: 'Step 3' },
  { id: 4, title: 'Intent', icon: CheckCircle, description: 'Step 4' },
  { id: 5, title: 'Vibe', icon: Shield, description: 'Step 5' },
  { id: 6, title: 'Review', icon: FileText, description: 'Step 6' },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    avatar: null,
    name: '',
    role: '',
    builderType: '',
    skills: [],
    experience: '',
    projectName: '',
    projectDesc: '',
    projectType: '',
    githubUrl: '',
    intentGoal: '',
    timeline: '',
    workStyle: '',
    timeOfDay: ''
  });

  // Calculate Progress
  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  // Render current step component
  const renderStep = () => {
    const props = { data: formData, update: setFormData };
    switch (currentStep) {
      case 1: return <BasicInfoStep key="step1" {...props} />;
      case 2: return <SkillsStep key="step2" {...props} />;
      case 3: return <ProjectStep key="step3" {...props} />;
      case 4: return <IntentStep key="step4" {...props} />;
      case 5: return <VibeStep key="step5" {...props} />;
      case 6: return <ReviewStep key="step6" data={formData} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#0B0A10] text-slate-200 font-sans overflow-hidden selection:bg-purple-500/30">
      
      {/* Sidebar Navigation (Hidden on small mobile, visible md+) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-800/60 bg-[#07060A] shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
              <Zap size={18} />
            </div>
            <span className="font-bold text-white tracking-wide">AlgoCrush</span>
          </div>
        </div>
        
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          {STEPS.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const Icon = step.icon;
            
            return (
              <div 
                key={step.id} 
                className="relative flex items-start gap-4 p-3 rounded-lg transition-colors cursor-default group"
              >
                {/* Connecting Line */}
                {index < STEPS.length - 1 && (
                  <div className={`absolute left-[1.35rem] top-10 w-[2px] h-8 -z-10 ${isCompleted ? 'bg-purple-500' : 'bg-slate-800'}`} />
                )}

                <div className={`relative z-10 w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isActive 
                    ? 'border-purple-500 bg-purple-500/10 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]' 
                    : isCompleted
                      ? 'border-purple-500 bg-purple-500 text-white'
                      : 'border-slate-700 bg-[#0B0A10] text-slate-500 group-hover:border-slate-600'
                }`}>
                  {isCompleted ? <Check size={16} /> : <Icon size={16} />}
                </div>
                
                <div className="pt-1">
                  <p className={`font-medium text-sm transition-colors ${isActive ? 'text-white' : isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
                    {step.title}
                  </p>
                  <p className={`text-xs mt-0.5 ${isActive ? 'text-purple-400' : 'text-slate-600'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-full">
        
        {/* Top Header & Progress */}
        <header className="h-20 border-b border-slate-800/60 flex items-center justify-between px-6 lg:px-10 shrink-0 bg-[#0B0A10]/50 backdrop-blur-sm z-20">
          <div className="flex-1 max-w-md flex items-center gap-4">
            <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
              {currentStep} of {STEPS.length}
            </span>
          </div>
          
          {currentStep < 6 && (
            <button 
              onClick={() => setCurrentStep(6)}
              className="text-sm font-medium text-slate-400 hover:text-white px-4 py-2 rounded-lg border border-slate-800 hover:border-slate-600 transition-colors hidden sm:block"
            >
              Skip to review
            </button>
          )}
        </header>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="min-h-full p-6 md:p-10 lg:p-14 pb-32">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <StepActions
          currentStep={currentStep} 
          setStep={setCurrentStep} 
          isNextDisabled={false} // Add validation logic here if needed
        />
        
      </main>
    </div>
  );
}