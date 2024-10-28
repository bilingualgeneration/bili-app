import App from "./App";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "@/hooks/Language";
import React from "react";

// need to wrap entire app in reqd provider so authed and unauthed can hand off
import { ReqdActionsProvider } from "@/contexts/ReqdActionsContext";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <LanguageProvider>
    <ReqdActionsProvider>
      <App />
    </ReqdActionsProvider>
  </LanguageProvider>,
);
