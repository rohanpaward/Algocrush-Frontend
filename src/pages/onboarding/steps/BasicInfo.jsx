import React, { useEffect, useRef, useState } from "react";
import { Upload, Cpu, Code, Database, MonitorPlay } from "lucide-react";
import { StepWrapper } from "../../../Components/StepWrapper";
import { Input } from "../../../Components/Input";
import { SelectCard } from "../../../Components/SelectCard";
import { Pill } from "../../../Components/Pill";
import { getRoles } from "../../../services/onboarding/onboarding-service";

// 🔥 REDUX
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../slice/onboarding-slice";

const BUILDER_TYPES = [
  "Hobbyist",
  "Indie Hacker",
  "Freelancer",
  "Student",
  "Professional",
];

// 🔥 Mapping API roles → Primary UI roles
const PRIMARY_ROLE_MAP = {
  "Frontend Developer": { id: "frontend", icon: MonitorPlay },
  "Backend Developer": { id: "backend", icon: Database },
  "Full Stack Developer": { id: "fullstack", icon: Code },
  "AI Engineer": { id: "ai", icon: Cpu },
};

export const BasicInfoStep = () => {
  const dispatch = useDispatch();

  // 🔥 Get data from Redux (single source of truth)
  const data = useSelector((state) => state.onboarding.formData);

  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ✅ Fetch roles (simple way without thunk)
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

  // ✅ Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Split roles → primary + others
  const primaryRoles = roles
    .filter((r) => PRIMARY_ROLE_MAP[r.name])
    .map((r) => ({
      id: PRIMARY_ROLE_MAP[r.name].id,
      label: r.name,
      icon: PRIMARY_ROLE_MAP[r.name].icon,
      originalId: r.id,
    }));

  const otherRoles = roles.filter((r) => !PRIMARY_ROLE_MAP[r.name]);

  // ✅ Search filter
  const filteredRoles = otherRoles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Avatar upload → store in Redux
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);

      dispatch(
        updateForm({
          avatar: url,
        })
      );
    }
  };


  return (
    <StepWrapper
      title="Let's get to know you"
      subtitle="Set up your basic profile information."
    >
      <div className="flex flex-col gap-8">
        {/* Avatar Upload */}
        <div className="flex items-center gap-6">
          <div
            className="w-24 h-24 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center bg-[#12121A] relative overflow-hidden group cursor-pointer hover:border-purple-500"
            onClick={() => fileInputRef.current?.click()}
          >
            {data.avatar ? (
              <img
                src={data.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
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
          label="Display Name"
          placeholder="e.g. John Doe"
          value={data.name}
          onChange={(e) =>
            dispatch(updateForm({ name: e.target.value }))
          }
        />

        {/* Roles */}
        <div className="flex flex-col gap-3">
          <label className="text-sm text-slate-300">Primary Role</label>

          {/* Primary Roles */}
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
            {/* Trigger */}
            <div
              className="px-4 py-3 border border-slate-800 rounded-lg cursor-pointer"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              {data.roleName || "Select other role..."}
            </div>

            {/* Dropdown Content */}
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

        {/* Builder Type */}
        <div className="flex flex-col gap-3">
          <label className="text-sm text-slate-300">
            What kind of builder are you?
          </label>

          <div className="flex gap-2 flex-wrap">
            {BUILDER_TYPES.map((type) => (
              <Pill
                key={type}
                active={data.builderType === type}
                onClick={() =>
                  dispatch(updateForm({ builderType: type }))
                }
              >
                {type}
              </Pill>
            ))}
          </div>
        </div>
      </div>
    </StepWrapper>
  );
};