export const TextArea = ({ label, className = "", ...props }) => (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
      <textarea
        className="bg-[#12121A] border border-slate-800 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-y min-h-[100px]"
        {...props}
      />
    </div>
  );
  