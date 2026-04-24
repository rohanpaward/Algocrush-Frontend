import React, { useEffect, useState } from "react";
import { StepWrapper } from "../../../Components/StepWrapper";
import { SelectCard } from "../../../Components/SelectCard";
import { Pill } from "../../../Components/Pill";
import { Rocket, Users, BookOpen, Zap } from "lucide-react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchLookingFor, updateForm } from "../../../slice/onboarding-slice";

// API
import api from "../../../api/axiosInstance";
import { GET_LOOKING_FOR } from "../../../constants";
import * as yup from "yup";



// fallback icons (optional mapping)
const ICON_MAP = {
  ship: Rocket,
  cofounder: Users,
  learn: BookOpen,
  users: Zap,
};

const schema = yup.object({
  lookingfor: yup.number().required(),
});

export const IntentStep = ({ setStepValid }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.onboarding.formData);

  const [intents, setIntents] = useState([]);
  const [isValid, setIsValid] = useState(false);


  useEffect(() => {
    const validate = async () => {
      try {
        await schema.validate(data);
        setIsValid(true);
      } catch {
        setIsValid(false);
      }
    };
  
    validate();
  }, [data]);


  useEffect(() => {
  dispatch(fetchLookingFor());
}, [dispatch]);

  useEffect(() => {
    setStepValid(isValid);
  }, [isValid]);

  // =========================
  // FETCH INTENTS API
  // =========================
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
  
  const formatName = (name) => {
    return name
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <StepWrapper
      title="Your Goals"
      subtitle="What do you hope to achieve here?"
    >
      <div className="flex flex-col gap-8">

        {/* ================= INTENTS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {intents.map((intent) => {
            const Icon = ICON_MAP[intent.name] || Rocket;

            return (
              <SelectCard
                key={intent.id}
                title={formatName(intent.name)}
                desc={intent.description}
                icon={Icon}
                active={data.lookingfor === intent.id}                
                onClick={() =>
                  dispatch(updateForm({ lookingfor: intent.id }))
                }
                layout="vertical"
              />
            );
          })}
        </div>

      </div>
    </StepWrapper>
  );
};