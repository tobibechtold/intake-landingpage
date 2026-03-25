import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getGermanRedirectPath } from "@/lib/localeRedirect";

const LocaleRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { legacyLocaleRedirect?: boolean } | null;
    if (state?.legacyLocaleRedirect) {
      return;
    }

    const preferredLanguage = localStorage.getItem("language");
    const targetPath = getGermanRedirectPath(
      location.pathname,
      navigator.language,
      preferredLanguage
    );
    if (targetPath && targetPath !== location.pathname) {
      navigate(targetPath, { replace: true });
    }
  }, [location.pathname, location.state, navigate]);

  return null;
};

export default LocaleRedirect;
