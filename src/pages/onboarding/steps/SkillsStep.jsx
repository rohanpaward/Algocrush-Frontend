import { StepWrapper } from "../../../Components/StepWrapper";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../slice/onboarding-slice";
import { Pill } from "../../../Components/Pill";
import { useState, useEffect } from "react";
import { GET_BUILD_TYPES } from "../../../constants";
import api from "../../../api/axiosInstance";
import * as yup from "yup";

const schema = yup.object({
  buildTypeIds: yup
    .array()
    .min(1, "Select at least one")
    .max(3, "Max 3 allowed")
    .required(),
});

export const SkillsStep = ({ setStepValid }) => {
  const [buildTypes, setBuildTypes] = useState([]); 
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.onboarding.formData);


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
    setStepValid(isValid);
  }, [isValid]);

  // FETCH build types

  useEffect(() => {
    const fetchBuildTypes = async () => {
      try {
        const res = await api.get(GET_BUILD_TYPES);
        setBuildTypes(res?.data || []);
      } catch (err) {
        console.error("Error fetching build types:", err);
      }
    };

    fetchBuildTypes();
  }, []);


  // Toggle build types (max 3)

  const toggleBuildType = (typeId) => {
    let updated = data.buildTypeIds || [];
  
    if (updated.includes(typeId)) {
      updated = updated.filter((id) => id !== typeId);
    } else {
      if (updated.length >= 3) return;
      updated = [...updated, typeId];
    }
  
    dispatch(updateForm({ buildTypeIds: updated }));
  };

  return (
    <StepWrapper
      title="Your Builder Profile"
      subtitle="What can you build?"
    >
      <div className="flex flex-col gap-8">

        <div className="flex flex-col gap-3">
          <label className="text-sm text-slate-300">
            What can you build? (max 3)
          </label>

          <div className="flex flex-wrap gap-2">
            {buildTypes.map((type) => (
              <Pill
                key={type.id}
                active={data.buildTypeIds?.includes(type.id)} 
                onClick={() => toggleBuildType(type.id)} 
                oncha
              >
                {type.label}
              </Pill>
            ))}
          </div>
        </div>

      </div>
    </StepWrapper>
  );
};