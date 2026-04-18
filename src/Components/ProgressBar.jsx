export default function ProgressBar({ step, total }) {
    return (
      <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
        <div
          className="bg-purple-500 h-2 rounded-full transition-all"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    );
  }