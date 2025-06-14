import { AppWrapper } from "@/components/AppWrapper";
import { IonApp, setupIonicReact } from "@ionic/react";
import { Router } from "@/components/Router";
import { LanguageToggleProvider } from "@/components/LanguageToggle";
import { ClassroomProvider } from "@/hooks/Classroom";

// todo: unsure if ErrorBoundary is necessary
// todo: unsure if Suspense is working
import { ErrorBoundary } from "react-error-boundary";
import { Loading } from "@/pages/Loading";

import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { AudioManagerProvider } from "@/contexts/AudioManagerContext";

import { TimeTrackerProvider } from "@/hooks/TimeTracker";
import { InterfaceLanguageProvider } from "@/hooks/InterfaceLanguage";
import { I18nWrapper } from "@/components/I18nWrapper";

import { I18nProvider } from "@/hooks/I18n";
import { ProfileProvider } from "@/hooks/Profile";
import { StudentProvider } from "@/hooks/Student";
import { NamesProvider } from "@/hooks/Names";

// category headers (usually for PackSelect
//import { CommunityHeader } from "@/components/CommunityHeader";
//import { PlayHeader } from "@/components/PlayHeader";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "@/theme/variables.scss"; // needs to be imported first!
import "@/theme/buttons.scss";
import "@/theme/color-classes.scss";
import "@/theme/common.scss";
import "@/theme/input.scss";
import "@/theme/margin-classes.scss";
import "@/theme/modal.scss";
import "@/theme/overrides.scss";
import "@/theme/padding-classes.scss";
import "@/theme/responsiveness.scss";
import "@/theme/style-classes.scss";
import "@/theme/text-classes.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

setupIonicReact();

const App: React.FC = () => {
  return (
    <ErrorBoundary fallback={<Loading />}>
      <IonApp>
        <AudioManagerProvider>
          <ProfileProvider>
            <ProfileProvider>
              <InterfaceLanguageProvider>
                <ClassroomProvider>
                  <I18nProvider>
                    <StudentProvider>
                      <NamesProvider>
                        <AppWrapper>
                          <TimeTrackerProvider>
                            <LanguageToggleProvider>
                              <Router />
                            </LanguageToggleProvider>
                          </TimeTrackerProvider>
                        </AppWrapper>
                      </NamesProvider>
                    </StudentProvider>
                  </I18nProvider>
                </ClassroomProvider>
              </InterfaceLanguageProvider>
            </ProfileProvider>
          </ProfileProvider>
        </AudioManagerProvider>
      </IonApp>
    </ErrorBoundary>
  );
};

export default App;
