import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { GlobalNav } from "./NavItem";

const ProtectedLayout = () => {
  const { user, loading } = useSelector((state) => state.auth); // 🔥 use Redux

  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 Active tab
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("/home")) return "feed";
    if (path.includes("/profile")) return "profile";
    return "feed";
  };

  const activeTab = getActiveTab();

  // 🔹 Navigation handler
  const handleTabChange = (tabId) => {
    if (tabId === "profile") navigate("/profile");
    if (tabId === "feed") navigate("/home");
  };

  // =====================
  // 🔥 AUTH GUARD
  // =====================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!user) return <Navigate to="/" />;

  if (!user.profile_completed && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" />;
  }

  // =====================

  const isNavVisible = location.pathname !== "/onboarding";

  return (
    <div className="bg-[#09090B] min-h-screen relative">
      <main className={isNavVisible ? "pb-32" : ""}>
        <Outlet context={{ user }} />
      </main>

      {isNavVisible && (
        <GlobalNav activeTab={activeTab} setActiveTab={handleTabChange} />
      )}
    </div>
  );
};

export default ProtectedLayout;