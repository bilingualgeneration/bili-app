import App from "./App";
import { createRoot } from "react-dom/client";
import { FirebaseWrapper } from "./components/FirebaseWrapper";
import { LanguageContextProvider } from "@/contexts/LanguageContext";
import React from "react";

// need to wrap entire app in reqd provider so authed and unauthed can hand off
import { ReqdActionsProvider } from "@/contexts/ReqdActionsContext";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <FirebaseWrapper>
    <LanguageContextProvider>
      <ReqdActionsProvider>
        <App />
      </ReqdActionsProvider>
    </LanguageContextProvider>
  </FirebaseWrapper>,
);
