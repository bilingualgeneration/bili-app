import {
  IonButton,
  IonCard,
  IonCardContent,
  IonProgressBar,
} from "@ionic/react";
import React, { useState } from "react";
import {
  ChildProfile,
  Complete,
  LanguageModeSelect,
  RoleSelect,
  ParentAccountCredentials,
  Pricing,
  TeacherAbout,
  TeacherAccountCredentials,
} from "@/pages/SignUp";
import {
  SignUpDataProvider,
  useSignUpData,
} from "@/pages/SignUp/SignUpContext";
import { UnauthedHeader } from "@/components/UnauthedHeader";
import { useHistory } from "react-router-dom";
import { ClassCode } from "./ClassCode";

export const SignUp: React.FC<{entry?: string}> = ({entry}) => (
  <SignUpDataProvider entry={entry}>
    <SignUpComponent />
  </SignUpDataProvider>
);

const progressLookup: { [key: string]: number } = {
  classCode: 0,
  roleSelect: 0,
  teacherAbout: 0.25,
  childProfile: 0.25,
  languageModeSelect: 0.5,
  parentAccountCredentials: 0.75,
  teacherAccountCredentials: 0.75,
  pricing: 0.85,
  complete: 1,
};

export const SignUpComponent: React.FC = () => {
  const { page: pages, setPage } = useSignUpData();
  const page: string = pages[pages.length - 1];
  const history = useHistory();

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
            {page === "classCode" && <ClassCode/>}
            {page === "roleSelect" && <RoleSelect />}
            {page === "teacherAbout" && <TeacherAbout />}
            {page === "childProfile" && <ChildProfile />}
            {page === "languageModeSelect" && <LanguageModeSelect />}
            {page === "parentAccountCredentials" && (
              <ParentAccountCredentials />
            )}
            {page === "teacherAccountCredentials" && (
              <TeacherAccountCredentials />
            )}
            {page === "pricing" && <Pricing />}
            {page === "complete" && <Complete />}
          </IonCardContent>
        </IonCard>
      </div>
    </>
  );
};
