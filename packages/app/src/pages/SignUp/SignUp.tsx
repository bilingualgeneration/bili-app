// http://localhost:5173/sign-up/by-class-code?code=abcd&email=jon@aol.com

import {
  AccountCredentials,
  ChildProfile,
  Complete,
  LanguageModeSelect,
  RoleSelect,
  Pricing,
  TeacherAbout,
} from "@/pages/SignUp";
import { ClassCode } from "./ClassCode";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonProgressBar,
} from "@ionic/react";
import React, { useState } from "react";
import {
  SignUpDataProvider,
  useSignUpData,
} from "@/pages/SignUp/SignUpContext";
import { UnauthedHeader } from "@/components/UnauthedHeader";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const SignUp: React.FC<{ entry?: string }> = ({ entry }) => (
  <SignUpDataProvider entry={entry}>
    <SignUpComponent />
  </SignUpDataProvider>
);

const progressLookup: { [key: string]: number } = {
  roleSelect: 0,
  classCode: 0.25,
  teacherAbout: 0.25,
  childProfile: 0.25,
  languageModeSelect: 0.5,
  accountCredentials: 0.75,
  pricing: 0.85,
  complete: 1,
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const SignUpComponent: React.FC = () => {
  const query = useQuery();
  const { page: pages, setPage } = useSignUpData();
  const page: string = pages[pages.length - 1];
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (
      page === "roleSelect" &&
      (query.has("code") ||
        query.has("email") ||
        location.pathname === "/sign-up/by-class-code")
    ) {
      // code supplied so redirect to ClassCode
      setPage(["classCode"]);
    }
  }, [page, query]);

  // todo: on revisit, clear old values
  const backButtonOnClick = (): void => {
    if (pages.length > 1) {
      setPage(pages.slice(0, -1));
    } else {
      history.goBack();
    }
  };

  return (
    <>
      <UnauthedHeader backButtonOnClick={backButtonOnClick} />
      <div className="page-wrapper">
        <IonCard style={{ maxWidth: 580, margin: "auto" }}>
          <IonCardContent>
            <div className="margin-bottom-3">
              <IonProgressBar
                color="primary"
                style={{ width: "60%", margin: "auto" }}
                value={progressLookup[page]}
              />
            </div>
            {page === "classCode" && <ClassCode />}
            {page === "roleSelect" && <RoleSelect />}
            {page === "teacherAbout" && <TeacherAbout />}
            {page === "childProfile" && <ChildProfile />}
            {page === "languageModeSelect" && <LanguageModeSelect />}
            {page === "accountCredentials" && <AccountCredentials />}
            {page === "pricing" && <Pricing />}
            {page === "complete" && <Complete />}
          </IonCardContent>
        </IonCard>
      </div>
    </>
  );
};
