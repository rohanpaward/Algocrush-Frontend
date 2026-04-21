import { BasicInfoStep } from "./steps/BasicInfo";
import { SkillsStep } from "./steps/SkillsStep";
import { ProjectStep } from "./steps/ProjectSetup";
import { IntentStep } from "./steps/Intent";
import { VibeStep } from "./steps/VibeStep";
import { ReviewStep } from "./steps/ReviewStep";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Zap,
  Check,
  User,
  Monitor,
  CheckCircle,
  Code,
  Shield,
  FileText,
} from "lucide-react";

import { StepActions } from "../../Components/StepActions";

const STEPS = [
  { id: 1, title: "Basic info", icon: User },
  { id: 2, title: "Skills", icon: Code },
  { id: 3, title: "Project", icon: Monitor },
  { id: 4, title: "Intent", icon: CheckCircle },
  { id: 5, title: "Vibe", icon: Shield },
  { id: 6, title: "Review", icon: FileText },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);

  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  const renderStep = () => {
    const props = { setStepValid: setIsStepValid };

    switch (currentStep) {
      case 1:
        return <BasicInfoStep key="step1" {...props} />;
      case 2:
        return <SkillsStep key="step2" {...props} />;
      case 3:
        return <ProjectStep key="step3" {...props} />;
      case 4:
        return <IntentStep key="step4" {...props} />;
      case 5:
        return <VibeStep key="step5" {...props} />;
      case 6:
        return <ReviewStep key="step6" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#0B0A10] text-slate-200 overflow-hidden">

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-800 bg-[#07060A]">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <Zap size={18} />
          <span className="ml-2 font-bold">AlgoCrush</span>
        </div>

        <nav className="flex-1 p-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center gap-3 p-2">
                <Icon size={16} />
                <span>{step.title}</span>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">

        {/* Progress */}
        <header className="h-20 flex items-center px-6 border-b border-slate-800">
          <div className="flex-1 max-w-md flex items-center gap-4">
            <div className="h-1 flex-1 bg-slate-800 rounded">
              <div
                className="h-full bg-purple-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-slate-500">
              {currentStep} / {STEPS.length}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-32">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        {/* Bottom Actions */}
        <StepActions
          currentStep={currentStep}
          setStep={setCurrentStep}
          isNextDisabled={!isStepValid}
        />

      </main>
    </div>
  );
}