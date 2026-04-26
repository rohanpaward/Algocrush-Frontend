import React, { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react"; // Added X icon
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Added for navigation
import { updateUser } from "../../slice/auth-slice";
import { getRoles } from "../../services/onboarding/onboarding-service";

// MODULAR COMPONENTS
import { ProfileAvatar } from "../../Components/ProfileAvatar";
import { BasicInfoFields } from "./components/BasicInfoFields";
import { ProjectSection } from "./components/ProjectSection";
import { BuildTypesEditor } from "./components/BuildTypesEditor";
import { IntentSection } from "./components/IntentSection";
import { VibeSection } from "./components/VibeSection";


import api from "../../api/axiosInstance";
import { UPDATE_USER } from "../../constants";
import { updateUserService } from "../../services/profile/profile-service";

export const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const data = useSelector((state) => state.auth.user);
  const fileInputRef = useRef(null);

  const [roles, setRoles] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data && !initialData) {
      setInitialData(data);
    }
  }, [data]);

  console.log(data, 'data')

  const isChanged = JSON.stringify(initialData) !== JSON.stringify(data);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getRoles();
        setRoles(res.data || []);
      } catch (err) { console.error(err); }
    };
    fetchRoles();
  }, []);

  const onUpdate = (payload) => dispatch(updateUser(payload));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpdate({ profile_photo_url: url });
    }
  };

  // Add your API save logic here
  const handleSave = async () => {
    try {
      setIsSaving(true);

      const payload = {
        ...data,
        id: data.id, // make sure id is present
      };

      const res = await updateUserService(payload); // 👈 your API call

      console.log("Saved:", res);

      // optional: navigate after success
      // navigate("/profile");

    } catch (e) {
      console.error("Save failed:", e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 pb-40">

      {/* 1. REFINED HEADER WITH CANCEL & SAVE */}
      <nav className="fixed top-0 inset-x-0 h-20 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.05] z-50">
        <div className="max-w-2xl mx-auto h-full flex items-center justify-between px-8">

          {/* Left Side: Cancel */}
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
              <X size={16} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Cancel</span>
          </button>

          {/* Center: Brand */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-black tracking-[0.4em] text-purple-500 uppercase">AlgoCrush</span>
            <h2 className="text-[11px] font-bold text-white uppercase tracking-[0.1em]">Edit Profile</h2>
          </div>

          {/* Right Side: Save Changes */}
          <button
            onClick={handleSave}
            disabled={!isChanged || isSaving}
            className={`bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]
  ${!isChanged || isSaving
                ? "opacity-40 cursor-not-allowed"
                : "hover:scale-105 active:scale-95"
              }`}
          >
            {isSaving ? (
              <>
                Saving
                <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              <>
                Save <span className="hidden sm:inline">Changes</span>
                <Check size={14} strokeWidth={3} />
              </>
            )}
          </button>

        </div>
      </nav>

      <main className="pt-32 px-8 max-w-2xl mx-auto space-y-20">

        <ProfileAvatar
          avatar={data.profile_photo_url}
          username={data.username}
          fileRef={fileInputRef}
          onUpload={handleImageUpload}
        />

        <BasicInfoFields
          data={data}
          onUpdate={onUpdate}
          roles={roles}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />

        <BuildTypesEditor
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />

        <IntentSection
          data={data}
          onUpdate={onUpdate}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />

        <ProjectSection
          data={data}
          onUpdate={onUpdate}
        />

        <VibeSection
          data={data}
          onUpdate={onUpdate}
        />

      </main>
    </div>
  );
};

export default EditProfile;