import React from "react";
import { Zap } from "lucide-react";
import { TextArea } from "../../../Components/TextArea";
export const VibeSection = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6 border-t border-white/[0.03] pt-10">
      {/* SECTION HEADER */}
     

      <div className="mt-[-5rem]">
        <TextArea
          label="What's your move when you get a wild idea at 3am? *"
          placeholder="Sketch the schema, ship the MVP before sunrise..."
          value={data.vibe_answer || ""}
          onChange={(e) => onUpdate({ vibe_answer: e.target.value })}
          maxLength={50}
        />
      </div>
    </div>
  );
};