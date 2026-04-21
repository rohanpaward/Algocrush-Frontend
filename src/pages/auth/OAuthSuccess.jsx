import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../services/auth/auth-services";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const init = async () => {
      try {
        // ✅ Get token from URL and save to localStorage
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
          localStorage.setItem("token", token);
          window.history.replaceState({}, document.title, "/oauth-success");
        }

        const data = await getMe();

        if (data?.isNewUser === true) {
          navigate("/onboarding");
        } else {
          navigate("/profile");
        }
      } catch (e) {
        navigate("/");
      }
    };

    init();
  }, []);

  return <div>Logging you in...</div>;
};

export default OAuthSuccess;