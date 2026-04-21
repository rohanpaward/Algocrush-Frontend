import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../../Components/Input";
import { StepWrapper } from "../../../Components/StepWrapper";
import { TextArea } from "../../../Components/TextArea";

import { updateForm } from "../../../slice/onboarding-slice";
import * as yup from "yup";
import { useState, useEffect } from "react";

const schema = yup.object({
  projectName: yup.string().required(),
  projectGithubUrl: yup
    .string()
    .url("Invalid URL")
    .required(),

  ProjectLiveUrl: yup
    .string()
    .url("Invalid URL")
    .nullable()
    .notRequired(),

  projectProblem: yup.string().required(),
  projectChallenge: yup.string().required(),
  projectSolution: yup.string().required(),

  currentBuild: yup.string().nullable().notRequired(),
});

export const ProjectStep = ({ setStepValid }) => {
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

  return (
    <StepWrapper
      title="Proof of Work"
      subtitle="Show what you've actually built"
    >
      <div className="flex flex-col gap-8">

        {/* PROJECT NAME */}
        <Input
          label="Project Name *"
          placeholder="e.g. AlgoCrush"
          value={data.projectName || ""}
          onChange={(e) =>
            dispatch(updateForm({ projectName: e.target.value }))
          }
        />

        {/* LINKS */}
        <div className="flex flex-col gap-4">
          <Input
            label="GitHub URL *"
            placeholder="https://github.com/username/repo"
            value={data.projectGithubUrl || ""}
            onChange={(e) =>
              dispatch(updateForm({ projectGithubUrl: e.target.value }))
            }
          />

          <Input
            label="Live Demo (optional)"
            placeholder="https://yourapp.com"
            value={data.ProjectLiveUrl || ""}
            onChange={(e) =>
              dispatch(updateForm({ ProjectLiveUrl: e.target.value }))
            }
          />
        </div>

        {/* PROBLEM */}
        <TextArea
          label="What problem does this solve? *"
          placeholder="Students struggle to find hackathon teammates..."
          value={data.projectProblem || ""}
          onChange={(e) =>
            dispatch(updateForm({ projectProblem: e.target.value }))
          }
          maxLength={120}
        />

        {/* CHALLENGE + SOLUTION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* CHALLENGE */}
          <TextArea
            label="Biggest challenge you faced *"
            placeholder="Handling real-time sync across users..."
            value={data.projectChallenge || ""}
            onChange={(e) =>
              dispatch(updateForm({ projectChallenge: e.target.value }))
            }
            maxLength={120}
          />

          {/* SOLUTION */}
          <TextArea
            label="How did you solve it? *"
            placeholder="Used WebSockets + Redis pub/sub..."
            value={data.projectSolution || ""}
            onChange={(e) =>
              dispatch(updateForm({ projectSolution: e.target.value }))
            }
            maxLength={120}
          />

        </div>

        {/* CURRENT BUILD */}
        <Input
          label="What are you currently building?(optional)"
          placeholder="AI startup idea / Nothing right now"
          value={data.currentBuild || ""}
          onChange={(e) =>
            dispatch(updateForm({ currentBuild: e.target.value }))
          }
        />

      </div>
    </StepWrapper>
  );
};