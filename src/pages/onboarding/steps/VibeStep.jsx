import { useDispatch, useSelector } from "react-redux";
import { StepWrapper } from "../../../Components/StepWrapper";
import React, { useState, useEffect } from "react";
import { updateForm } from "../../../slice/onboarding-slice";
import * as yup from "yup";



const schema = yup.object({
  vibeAnswer: yup
    .string()
    .trim()
    .min(5, "Too short")
    .required(),
});

export const VibeStep = ({setStepValid}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.onboarding.formData);

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
    setStepValid(isValid);
  }, [isValid]);

  const handleChange = (e) => {
    const value = e.target.value.slice(0, 50);

    dispatch(
      updateForm({
        vibeAnswer: value,
      })
    );
  };
  return (
    <StepWrapper
      title="Your Vibe"
      subtitle="What's your move when you get a wild idea at 3am?"
    >
      <div className="flex flex-col gap-2">
        <textarea
          value={data.vibeAnswer || ""}
          onChange={handleChange}
          placeholder="Type your answer..."
          maxLength={50}
          rows={3}
          className="w-full p-4 rounded-xl bg-[#12121A] border border-slate-800 text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
        />
        <div className="text-xs text-slate-500 text-right">
          {(data.vibeAnswer || "").length}/50
        </div>
      </div>
    </StepWrapper>
  );
};