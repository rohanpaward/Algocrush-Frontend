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
        console.log("FULL URL:", window.location.href); // ✅ add this
        console.log("SEARCH:", window.location.search); // ✅ add this
      
        // Get token from URL
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
          localStorage.setItem("token", token);
          console.log(token,'this is token')
        }

        const data = await getMe();
        console.log(data, 'this is data');

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