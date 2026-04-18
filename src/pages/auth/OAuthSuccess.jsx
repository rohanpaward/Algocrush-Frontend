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
        const data = await getMe();

        if (data?.isNewUser === true) {
          navigate("/onboarding");
        } else {
          navigate("/profile");
        }
      } catch (e) {
        navigate("/login");
      }
    };

    init();
  }, []);

  return <div>Logging you in...</div>;
};

export default OAuthSuccess;