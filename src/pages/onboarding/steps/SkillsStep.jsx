import { X } from "lucide-react";
import { StepWrapper } from "../../../Components/StepWrapper";
import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchDomains, updateForm } from "../../../slice/onboarding-slice";

import api from "../../../api/axiosInstance";
import { GET_DOMAINS, GET_SKILLS_BY_DOMAIN } from "../../../constants";

const EXP_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export const SkillsStep = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.onboarding.formData);

  // const [domains, setDomains] = useState([]);
  const domains = useSelector((state) => state.onboarding.domains);
  const [skills, setSkills] = useState([]);

  const [domainOpen, setDomainOpen] = useState(false);
  const [skillOpen, setSkillOpen] = useState(false);

  const [domainSearch, setDomainSearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");

  const domainRef = useRef(null);
  const skillRef = useRef(null);

  useEffect(() => {
    dispatch(fetchDomains()); // goes to Redux
  }, []);

  // ================= FETCH SKILLS =================
  useEffect(() => {
    const fetchSkills = async () => {
      if (!data.domainIds?.length) return;

      try {
        const ids = data.domainIds.join(",");
        const res = await api.get(
          `${GET_SKILLS_BY_DOMAIN}?domainId=${ids}`
        );
        setSkills(res.data.rows || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSkills();
  }, [data.domainIds]);

  // ================= CLOSE DROPDOWN =================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (domainRef.current && !domainRef.current.contains(e.target)) {
        setDomainOpen(false);
      }
      if (skillRef.current && !skillRef.current.contains(e.target)) {
        setSkillOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ================= DOMAIN TOGGLE =================
  const toggleDomain = (domain) => {
    let updated = data.domainIds || [];

    if (updated.includes(domain.id)) {
      updated = updated.filter((id) => id !== domain.id);
    } else {
      if (updated.length >= 3) return;
      updated = [...updated, domain.id];
    }

    dispatch(updateForm({ domainIds: updated }));
  };

  // ================= SKILL TOGGLE =================
  const toggleSkill = (skill) => {
    let updated = data.skillIds || [];

    if (updated.includes(skill.id)) {
      updated = updated.filter((id) => id !== skill.id);
    } else {
      updated = [...updated, skill.id];
    }

    dispatch(updateForm({ skillIds: updated }));
  };

  // ================= FILTER =================
  const filteredDomains = domains.filter((d) =>
    d.name.toLowerCase().includes(domainSearch.toLowerCase())
  );

  const filteredSkills = skills.filter((s) =>
    s.name.toLowerCase().includes(skillSearch.toLowerCase())
  );

  return (
    <StepWrapper title="Your Toolkit" subtitle="Select domains and skills">
      <div className="flex flex-col gap-8">

        {/* EXPERIENCE */}
        <div>
          <label className="text-sm text-slate-300">Experience</label>
          <select
            className="w-full bg-[#12121A] border border-slate-800 px-4 py-3 rounded-lg text-white"
            value={data.experience || ""}
            onChange={(e) =>
              dispatch(updateForm({ experience: e.target.value }))
            }
          >
            <option value="">Select...</option>
            {EXP_LEVELS.map((lvl) => (
              <option key={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        {/* ================= DOMAIN DROPDOWN ================= */}
        <div ref={domainRef} className="relative">
          <label className="text-sm text-slate-300">Domains (max 3)</label>

          {/* Trigger */}
          <div
            className="mt-2 px-4 py-3 border border-slate-800 rounded-lg cursor-pointer flex flex-wrap gap-2"
            onClick={() => setDomainOpen((prev) => !prev)}
          >
            {data.domainIds?.length ? (
              data.domainIds.map((id) => {
                const d = domains.find((x) => x.id === id);
                return (
                  <div
                    key={id}
                    className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded flex items-center gap-1 text-sm"
                  >
                    {d?.name}
                    <X
                      size={14}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDomain(d);
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <span className="text-slate-500">Select domains...</span>
            )}
          </div>

          {/* Dropdown */}
          {domainOpen && (
            <div className="absolute z-10 w-full mt-2 border border-slate-800 rounded-lg bg-[#12121A]">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 border-b border-slate-800 bg-transparent text-white"
                value={domainSearch}
                onChange={(e) => setDomainSearch(e.target.value)}
              />

              <div className="max-h-40 overflow-y-auto">
                {filteredDomains.map((d) => (
                  <div
                    key={d.id}
                    className="px-4 py-2 hover:bg-slate-800 cursor-pointer"
                    onClick={() => toggleDomain(d)}
                  >
                    {d.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= SKILL DROPDOWN ================= */}
        <div ref={skillRef} className="relative">
          <label className="text-sm text-slate-300">Skills</label>

          {/* Trigger */}
          <div
            className="mt-2 px-4 py-3 border border-slate-800 rounded-lg cursor-pointer flex flex-wrap gap-2"
            onClick={() => setSkillOpen((prev) => !prev)}
          >
            {data.skillIds?.length ? (
              data.skillIds.map((id) => {
                const s = skills.find((x) => x.id === id);
                return (
                  <div
                    key={id}
                    className="bg-green-600/20 text-green-300 px-2 py-1 rounded flex items-center gap-1 text-sm"
                  >
                    {s?.name}
                    <X
                      size={14}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSkill(s);
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <span className="text-slate-500">Select skills...</span>
            )}
          </div>

          {/* Dropdown */}
          {skillOpen && (
            <div className="absolute z-10 w-full mt-2 border border-slate-800 rounded-lg bg-[#12121A]">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 border-b border-slate-800 bg-transparent text-white"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
              />

              <div className="max-h-40 overflow-y-auto">
                {filteredSkills.map((s) => (
                  <div
                    key={s.id}
                    className="px-4 py-2 hover:bg-slate-800 cursor-pointer"
                    onClick={() => toggleSkill(s)}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </StepWrapper>
  );
};