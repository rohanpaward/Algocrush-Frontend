import React, { useState, useEffect } from "react";
import { Rocket, Target, Users, Zap, Briefcase } from "lucide-react";
import { DropdownSelector } from "../../../Components/DropdownSelector";
import api from "../../../api/axiosInstance";
import { GET_LOOKING_FOR } from "../../../constants";

// Map icons to names from your API
const ICON_MAP = {
  "Co-founder": Users,
  "Collaborator": Zap,
  "Hiring": Briefcase,
  "Finding Work": Target,
  "Just Exploring": Rocket,
};

export const IntentSection = ({ data, onUpdate, activeDropdown, setActiveDropdown }) => {
  const [intents, setIntents] = useState([]);

  useEffect(() => {
    const fetchIntents = async () => {
      try {
        const res = await api.get(GET_LOOKING_FOR);
        setIntents(res?.data || []);
      } catch (err) {
        console.error("Error fetching intents:", err);
      }
    };
    fetchIntents();
  }, []);

  // Format options for the DropdownSelector
  const intentOptions = intents.map((intent) => ({
    label: intent.name, // or formatName(intent.name) if you have that utility
    value: intent.id,
  }));

  // Find the label of the currently selected intent
  const currentIntentLabel = intents.find(
    (i) => String(i.id) === String(data.looking_for_id)
  )?.name;

  return (
    <div className="space-y-6 mt-[-3rem] border-t border-white/[0.03]">


      <DropdownSelector
        label="What are you looking for? *"
        placeholder="Select your current goal"
        value={currentIntentLabel}
        options={intentOptions}
        isOpen={activeDropdown === 'intent'}
        setIsOpen={(val) => setActiveDropdown(val ? 'intent' : null)}
        onSelect={(opt) => onUpdate({ looking_for_id: opt.value })}
      />
      
    </div>
  );
};