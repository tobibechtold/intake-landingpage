import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getGermanRedirectPath } from "@/lib/localeRedirect";

const LocaleRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const preferredLanguage = localStorage.getItem("language");
    const targetPath = getGermanRedirectPath(
      location.pathname,
      navigator.language,
      preferredLanguage
    );
    if (targetPath && targetPath !== location.pathname) {
      navigate(targetPath, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};

export default LocaleRedirect;
