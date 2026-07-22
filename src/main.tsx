import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { captureUtmParams } from "@/lib/attribution";
import { initAnalytics } from "@/lib/analytics";

captureUtmParams(window.location.search);
initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
