import App from "./App";
import { createRoot } from "react-dom/client";
import { FirebaseWrapper } from "./components/FirebaseWrapper";
import { I18nWrapper } from "@/components/I18nWrapper";
import { LanguageContextProvider } from "@/contexts/LanguageContext";
import React from "react";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <FirebaseWrapper>
      <LanguageContextProvider>
        <I18nWrapper>
          <App />
        </I18nWrapper>
      </LanguageContextProvider>
    </FirebaseWrapper>
  </React.StrictMode>,
);
