import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../../Components/Input";
import { Pill } from "../../../Components/Pill";
import { StepWrapper } from "../../../Components/StepWrapper";
import { TextArea } from "../../../Components/TextArea";

// 🔥 Redux
import { updateForm } from "../../../slice/onboarding-slice";

// const PROJECT_TYPES = [
//   "Web App",
//   "Mobile App",
//   "CLI Tool",
//   "Library/Package",
//   "API",
//   "Game",
// ];

export const ProjectStep = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.onboarding.formData);

  return (
    <StepWrapper
      title="Current Product"
      subtitle="What are you building right now?"
    >
      <div className="flex flex-col gap-6">

        {/* Project Name */}
        <Input
          label="Project Name"
          placeholder="e.g. AlgoCrush"
          value={data.projectName || ""}
          onChange={(e) =>
            dispatch(updateForm({ projectName: e.target.value }))
          }
        />

        {/* Description */}
        <TextArea
          label="Description"
          placeholder="Briefly describe what it does..."
          value={data.projectDesc || ""}
          onChange={(e) =>
            dispatch(updateForm({ projectDesc: e.target.value }))
          }
        />

        {/* Project Type */}
        {/* <div className="flex flex-col gap-3">
          <label className="text-sm text-slate-300">Project Type</label>

          <div className="flex flex-wrap gap-2">
            {PROJECT_TYPES.map((type) => (
              <Pill
                key={type}
                active={data.projectType === type}
                onClick={() =>
                  dispatch(updateForm({ projectType: type }))
                }
              >
                {type}
              </Pill>
            ))}
          </div>
        </div> */}

        {/* GitHub URL */}
        <Input
          label="Product link"
          placeholder="https://github.com/username/repo"
          value={data.githubUrl || ""}
          onChange={(e) =>
            dispatch(updateForm({ githubUrl: e.target.value }))
          }
        />
      </div>
    </StepWrapper>
  );  
};