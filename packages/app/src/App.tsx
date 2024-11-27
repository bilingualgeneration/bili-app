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
import { PackSelect } from "@/components/PackSelect";
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
import "@/theme/variables.css";
import "@/theme/overrides.scss";
import "@/theme/color-classes.scss";
import "@/theme/input.css";
import "@/theme/margin-classes.scss";
import "@/theme/modal.css";
import "@/theme/padding-classes.scss";
import "@/theme/text-classes.scss";
import "@/theme/style-classes.css";
import "@/theme/buttons.css";
import "@/theme/common.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

setupIonicReact();

const App: React.FC = () => {
  return (
    <ErrorBoundary fallback={<Loading />}>
      <IonApp>
        <InterfaceLanguageProvider>
          <AudioManagerProvider>
            <ProfileProvider>
              <ClassroomProvider>
                <I18nProvider>
                  <StudentProvider>
                    <NamesProvider>
                      <AppWrapper>
                        <TimeTrackerProvider>
                          <Router />
                        </TimeTrackerProvider>
                      </AppWrapper>
                    </NamesProvider>
                  </StudentProvider>
                </I18nProvider>
              </ClassroomProvider>
            </ProfileProvider>
          </AudioManagerProvider>
        </InterfaceLanguageProvider>
      </IonApp>
    </ErrorBoundary>
  );
};

export default App;
