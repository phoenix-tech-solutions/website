import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import "./styles/global.css";
import "./styles/site.css";
import "./styles/pages.css";
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {(location.hostname === "phoenixtechsolutions.org" ||
      location.hostname.endsWith(".vercel.app")) && <Analytics />}
  </StrictMode>,
);
