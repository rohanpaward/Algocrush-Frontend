export default function OnboardingLayout({ children }) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] text-white relative overflow-hidden">
  
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.15),transparent_40%)]" />
  
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
  
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    );
  }