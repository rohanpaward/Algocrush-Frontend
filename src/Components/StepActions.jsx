import { ChevronRight } from "lucide-react";

export const StepActions = ({ currentStep, setStep, isNextDisabled }) => (
  <div className="fixed bottom-0 left-0 right-0 md:left-64 p-6 bg-[#0B0A10]/80 backdrop-blur-md border-t border-slate-800/50 flex justify-end gap-4 z-10">
    
    {currentStep > 1 && (
      <button
        onClick={() => setStep(prev => prev - 1)}
        className="px-6 py-2.5 rounded-lg font-medium text-slate-300 hover:text-white transition-colors"
      >
        Back
      </button>
    )}

    {currentStep < 6 && (
      <button
        onClick={() => {
          if (isNextDisabled) return; // 🔥 safety
          setStep(prev => prev + 1);
        }}
        disabled={isNextDisabled}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
          isNextDisabled 
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
        }`}
      >
        Continue <ChevronRight size={18} />
      </button>
    )}

  </div>
);