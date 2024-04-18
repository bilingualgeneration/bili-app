import React from "react";
import { IonSpinner } from "@ionic/react";
import { Redirect } from "react-router";
import {useProfile} from '@/hooks/Profile';

export const Preload: React.FC = () => {
  const {
    isLoading,
    isLoggedIn,
  } = useProfile();

  if (isLoading) {
    // still trying to communicate with Firebase
    // todo: make spinner larger
    // todo: center spinner on page
    return (
      <>
        <IonSpinner name="circular"></IonSpinner>
      </>
    );
  }

  if (isLoggedIn) {
    // todo: redirect based on user account type
    return <Redirect to="/student-dashboard" />;
  } else {
    return <Redirect to="/presplash" />;
  }
};
