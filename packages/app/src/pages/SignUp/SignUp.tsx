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
//import {Test} from './Test';
//import { Swiper, SwiperSlide } from "swiper/react";
//import SwiperCore from "swiper";
import {
  SignUpDataProvider,
  useSignUpData,
} from "@/pages/SignUp/SignUpContext";

export const SignUp: React.FC = () => (
  <SignUpDataProvider>
    <SignUpComponent />
  </SignUpDataProvider>
);

const progressLookup: { [key: string]: number } = {
  roleSelect: 0,
  teacherAbout: 0.25,
  childProfile: 0.25,
  languageModeSelect: 0.5,
  parentAccountCredentials: 0.75,
  teacherAccountCredentials: 0.75,
  pricing: 0.85,
  complete: 1,
};

// todo: on page visit, clear form and reset swiper
export const SignUpComponent: React.FC = () => {
  const { page } = useSignUpData();

  return (
    <div className="page-wrapper">
      <div className="signup-wrapper">
        <IonCard>
          <IonCardContent>
            <div className="ion-padding">
              <IonProgressBar
                color="primary"
                style={{ width: "60%", margin: "auto" }}
                value={progressLookup[page]}
              />
            </div>
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
    </div>
  );
};
