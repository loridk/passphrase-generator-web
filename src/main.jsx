import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";

if (globalThis.location.protocol === "chrome-extension:") {
  document.documentElement.dataset.appContext = "extension";
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
