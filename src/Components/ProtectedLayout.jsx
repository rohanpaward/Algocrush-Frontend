import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getMe } from "../services/auth/auth-services";
import { GlobalNav } from "./NavItem";

const ProtectedLayout = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Sync the active tab with the current URL path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("/home")) return "feed";
    if (path.includes("/profile")) return "profile";
    // Add logic for 'discovery' or 'messages' routes here
    return "feed";
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {

    const checkAuth = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  

  // Sync state if user navigates via browser buttons or direct links
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname]);

  // 2. Handle navigation when a nav icon is clicked
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "profile") navigate("/profile");
    if (tabId === "feed") navigate("/home");
    // if (tabId === "discovery") navigate("/discovery");
    // if (tabId === "messages") navigate("/messages");
  };

  if (loading) return <div className="min-h-screen bg-[#09090B] flex items-center justify-center text-white">Loading...</div>;

  if (!user) return <Navigate to="/" />;

  if (!user.profile_completed && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" />;
  }

  // 3. Conditional Visibility: Hide nav bar during onboarding
  const isNavVisible = location.pathname !== "/onboarding";

  return (
    <div className="bg-[#09090B] min-h-screen relative">
      {/* 4. Use pb-32 so the fixed nav doesn't cover bottom content */}
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