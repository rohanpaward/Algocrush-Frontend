export const TextArea = ({
  label,
  className = "",
  maxLength,
  value = "",
  ...props
}) => {
  const length = value?.length || 0;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      <div className="relative">
        <textarea
          className="bg-[#12121A] border border-slate-800 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-y min-h-[100px] w-full"
          value={value}
          maxLength={maxLength}
          {...props}
        />

        {/* Character Counter */}
        {maxLength && (
          <span
            className={`absolute bottom-2 right-3 text-xs ${
              length > maxLength * 0.8
                ? "text-red-400"
                : "text-slate-500"
            }`}
          >
            {length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};