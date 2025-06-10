import { IonProgressBar } from "@ionic/react";
import { useState } from "react";
import { useProfile } from "@/hooks/Profile";
import { useClassroom } from "@/hooks/Classroom";
import { useStudent } from "@/hooks/Student";

import "./AppWrapper.scss";

// todo: minimum loading time

export const AppWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoading: isProfileLoading } = useProfile();
  const { isLoading: isClassroomLoading } = useClassroom();
  const { isLoading: isStudentLoading } = useStudent();
  if (isProfileLoading || isClassroomLoading || isStudentLoading) {
    return (
      <div id="appLoadingIndicator">
        <IonProgressBar type="indeterminate" />
      </div>
    );
  } else {
    return (
      <>
        {import.meta.env.VITE_FIREBASE_ENVIRONMENT !== "live" && (
          <div id="environmentMarker">
            {import.meta.env.VITE_FIREBASE_ENVIRONMENT}
          </div>
        )}

        {children}
      </>
    );
  }
};
