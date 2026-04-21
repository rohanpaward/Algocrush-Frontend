import React, { useEffect, useRef, useState } from "react";
import { Upload, Cpu, Code, Database, MonitorPlay } from "lucide-react";
import { StepWrapper } from "../../../Components/StepWrapper";
import { Input } from "../../../Components/Input";
import { SelectCard } from "../../../Components/SelectCard";
import { Pill } from "../../../Components/Pill";
import { getRoles } from "../../../services/onboarding/onboarding-service";
import * as yup from "yup";

// 🔥 REDUX
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../slice/onboarding-slice";

const COLLAB_OPTIONS = [
  { label: "Actively looking", value: "active" },
  { label: "Open if interesting", value: "selective" },
  { label: "Not right now", value: "closed" },
];

const STUDY_YEAR_OPTIONS = [
  { label: "1st Year", value: "year_1" },
  { label: "2nd Year", value: "year_2" },
  { label: "3rd Year", value: "year_3" },
  { label: "4th Year+", value: "year_4_plus" },
  { label: "Postgrad", value: "postgrad" },
  { label: "Graduate", value: "graduate" },
  { label: "Other", value: "other" },
];

const PRIMARY_ROLE_MAP = {
  "Frontend Developer": { id: "frontend", icon: MonitorPlay },
  "Backend Developer": { id: "backend", icon: Database },
  "Full Stack Developer": { id: "fullstack", icon: Code },
  "AI Engineer": { id: "ai", icon: Cpu },
};

const schema = yup.object({
  name: yup.string().required(),
  CollegeName: yup.string().required(),
  studyYear: yup.string().required(),
  roleId: yup.string().required(),
  collabStatus: yup.string().required(),
});

export const BasicInfoStep = ({ setStepValid }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.onboarding.formData);

  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const yearRef = useRef(null);

  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);

  const [isValid, setIsValid] = useState(false);

  // ✅ Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getRoles();
        setRoles(res.data || []);
      } catch (err) {
        console.error("Error fetching roles:", err);
      }
    };
    fetchRoles();
  }, []);

  // ✅ Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (yearRef.current && !yearRef.current.contains(e.target)) {
        setYearOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const primaryRoles = roles
    .filter((r) => PRIMARY_ROLE_MAP[r.name])
    .map((r) => ({
      id: PRIMARY_ROLE_MAP[r.name].id,
      label: r.name,
      icon: PRIMARY_ROLE_MAP[r.name].icon,
      originalId: r.id,
    }));

  const otherRoles = roles.filter((r) => !PRIMARY_ROLE_MAP[r.name]);

  const filteredRoles = otherRoles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      dispatch(updateForm({ avatar: url }));
    }
  };

  const selectedYear = STUDY_YEAR_OPTIONS.find(
    (y) => y.value === data.studyYear
  )?.label;

  // 🔥 VALIDATION LOGIC (simple + fast)
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
      title="Let's get to know you"
      subtitle="Set up your basic profile information."
    >
      <div className="flex flex-col gap-8">

        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div
            className="w-24 h-24 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center bg-[#12121A] relative overflow-hidden cursor-pointer hover:border-purple-500"
            onClick={() => fileInputRef.current?.click()}
          >
            {data.avatar ? (
              <img src={data.avatar} className="w-full h-full object-cover" />
            ) : (
              <Upload className="text-slate-500" />
            )}

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* Name */}
        <Input
          label="Display Name *"
          placeholder="Enter Your Name"
          value={data.name}
          onChange={(e) =>
            dispatch(updateForm({ name: e.target.value }))
          }
        />

        {/* College */}
        <Input
          label="College Name *"
          placeholder="Enter Your College Name"
          value={data.CollegeName}
          onChange={(e) =>
            dispatch(updateForm({ CollegeName: e.target.value }))
          }
        />

        {/* YEAR */}
        <div className="relative" ref={yearRef}>
          <div onClick={() => setYearOpen((prev) => !prev)}>
            <Input
              label="Enter Year *"
              placeholder="What Year Are You Studying In"
              value={selectedYear || ""}
              readOnly
            />
          </div>

          {yearOpen && (
            <div className="absolute z-10 w-full mt-2 border border-slate-800 rounded-lg bg-[#12121A]">
              <div className="max-h-40 overflow-y-auto">
                {STUDY_YEAR_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    className="px-4 py-2 hover:bg-slate-800 cursor-pointer"
                    onClick={() => {
                      dispatch(updateForm({ studyYear: opt.value }));
                      setYearOpen(false);
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Roles */}
        <div className="flex flex-col gap-3">
          <label className="text-sm text-slate-300">Primary Role *</label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {primaryRoles.map((role) => (
              <SelectCard
                key={role.id}
                title={role.label}
                icon={role.icon}
                active={data.roleId === role.originalId}
                onClick={() =>
                  dispatch(
                    updateForm({
                      roleId: role.originalId,
                      roleName: role.label,
                    })
                  )
                }
              />
            ))}
          </div>

          {/* Dropdown */}
          <div ref={dropdownRef} className="relative mt-3">
            <div
              className="px-4 py-3 border border-slate-800 rounded-lg cursor-pointer"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              {data.roleName || "Select other role..."}
            </div>

            {isDropdownOpen && (
              <div className="absolute w-full mt-2 border border-slate-800 rounded-lg bg-[#12121A]">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 border-b border-slate-800 bg-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {filteredRoles.map((role) => (
                  <div
                    key={role.id}
                    className="px-4 py-2 hover:bg-slate-800 cursor-pointer"
                    onClick={() => {
                      dispatch(
                        updateForm({
                          roleId: role.id,
                          roleName: role.name,
                        })
                      );
                      setIsDropdownOpen(false);
                    }}
                  >
                    {role.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Collab */}
        <div className="flex flex-col gap-3">
          <label className="text-sm text-slate-300">
            Are you open to collaborating right now? 
          </label>

          <div className="flex gap-2 flex-wrap">
            {COLLAB_OPTIONS.map((opt) => (
              <Pill
                key={opt.value}
                active={data.collabStatus === opt.value}
                onClick={() =>
                  dispatch(updateForm({ collabStatus: opt.value }))
                }
              >
                {opt.label}
              </Pill>
            ))}
          </div>
        </div>

      </div>
    </StepWrapper>
  );
};