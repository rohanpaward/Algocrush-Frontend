import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getMe } from "../services/auth/auth-services";

const ProtectedLayout = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

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

  if (loading) return <div>Loading...</div>;

  // ❌ not logged in
  if (!user) return <Navigate to="/" />;

  // ❌ onboarding not done → redirect ONLY if not already there
  if (!user.profile_completed  && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" />;
  }

  // ✅ allow rendering
  return <Outlet />;
};

export default ProtectedLayout;