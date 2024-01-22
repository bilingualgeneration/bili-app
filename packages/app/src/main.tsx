import App from "./App";
import { createRoot } from "react-dom/client";
import { FirebaseWrapper } from "./components/FirebaseWrapper";
import { I18nWrapper } from "@/components/I18nWrapper";
import { LanguageContextProvider } from "@/contexts/LanguageContext";
import React from "react";

// need to wrap entire app in reqd provider so authed and unauthed can hand off
import { ReqdActionsProvider } from "@/contexts/ReqdActionsContext";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <FirebaseWrapper>
    <LanguageContextProvider>
      <I18nWrapper>
        <ReqdActionsProvider>
          <App />
        </ReqdActionsProvider>
      </I18nWrapper>
    </LanguageContextProvider>
  </FirebaseWrapper>,
);
