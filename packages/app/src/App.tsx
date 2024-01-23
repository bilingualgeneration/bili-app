// todo: unsure if ErrorBoundary is necessary
// todo: unsure if Suspense is working
import { ErrorBoundary } from "react-error-boundary";
import { SuspenseWithPerf } from "reactfire";
import { Loading } from "@/pages/Loading";

import React, { useEffect, useState } from "react";
import { AdultCheckProvider } from "@/contexts/AdultCheckContext";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, RouteComponentProps, Route, Switch } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { AuthProvider, useFirebaseApp } from "reactfire";
import AuthedLayout from "@/layouts/Authed";
import { HeaderFooter } from "@/components/HeaderFooter";
import { I18nWrapper } from "@/components/I18nWrapper";
import Intruder from "@/pages/games/Intruder";
import { IntruderIntro } from "@/pages/Intruder/IntruderIntro";
import { IntruderSelect } from "@/pages/Intruder/IntruderSelect";
import { IntruderGame } from "@/pages/Intruder/IntruderGame";
import { IntruderGameLoader } from "./pages/Intruder/IntruderGameLoader";
import Journeys from "./pages/Journeys";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Login from "@/pages/Login";
import Memory from "@/pages/games/Memory";
import {
  About,
  Overview,
  Preferences,
  Progress,
  Profile,
} from "@/pages/Settings";
import { Play } from "@/pages/Play";
import { Preload } from "@/pages/Preload";
import { PreSplash } from "@/pages/PreSplash";
import { Pricing } from "@/pages/SignUp/Pricing";
import ResetPassword from "@/pages/ResetPassword";
import { SettingsLayout } from "@/layouts/Settings";
import { SignUp } from "@/pages/SignUp";
import { Splash } from "@/pages/Splash";
import Stories from "@/pages/games/Stories";
import { StoryFactoryPg1 } from "@/pages/StoryFactory/StoryFactoryPg1";
import { StoryFactoryPg2 } from "@/pages/StoryFactory/StoryFactoryPg2";
import { StoryFactoryPage3 } from "@/pages/StoryFactory/StoryFactoryPg3";
import { StoryFactoryPage4 } from "@/pages/StoryFactory/StoryFactoryPg4";
import { StudentDashboard } from "@/pages/StudentDashboard";
import TeacherLogin from "@/pages/TeacherLogin";
import UnauthedLayout from "@/layouts/Unauthed";

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

setupIonicReact();

const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <UnauthedLayout>
              <Preload />
            </UnauthedLayout>
          )}
        />

        <Route exact path="/presplash" render={() => <PreSplash />} />

        <Route
          exact
          path="/intruder"
          render={() => (
            <AuthedLayout>
              <Intruder />
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/journeys"
          render={() => (
            <UnauthedLayout>
              <Journeys />
            </UnauthedLayout>
          )}
        />

        <Route
          exact
          path="/login"
          render={() => (
            <UnauthedLayout>
              <Login />
            </UnauthedLayout>
          )}
        />

        <Route
          exact
          path="/memory"
          render={() => (
            <UnauthedLayout>
              <Memory />
            </UnauthedLayout>
          )}
        />

        <Route
          exact
          path="/play"
          render={() => (
            <AuthedLayout>
              <HeaderFooter background="#f7faf9">
                <Play />
              </HeaderFooter>
            </AuthedLayout>
          )}
        />

        {/* temp route for development */}
        <Route
          exact
          path="/pricing"
          render={() => (
            <UnauthedLayout>
              <Pricing />
            </UnauthedLayout>
          )}
        />

        <Route
          exact
          path="/reset-password"
          render={() => (
            <UnauthedLayout>
              <ResetPassword />
            </UnauthedLayout>
          )}
        />

        <Route
          exact
          path="/settings/about"
          render={() => (
            <AuthedLayout>
              <AdultCheckProvider>
                <SettingsLayout background="#f7faf9">
                  <About />
                </SettingsLayout>
              </AdultCheckProvider>
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/settings/overview"
          render={() => (
            <AuthedLayout>
              <AdultCheckProvider>
                <SettingsLayout background="#f7faf9">
                  <Overview />
                </SettingsLayout>
              </AdultCheckProvider>
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/settings/preferences"
          render={() => (
            <AuthedLayout>
              <AdultCheckProvider>
                <SettingsLayout background="#f7faf9">
                  <Preferences />
                </SettingsLayout>
              </AdultCheckProvider>
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/settings/profile"
          render={() => (
            <AuthedLayout>
              <AdultCheckProvider>
                <SettingsLayout background="#f7faf9">
                  <Profile />
                </SettingsLayout>
              </AdultCheckProvider>
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/settings/progress"
          render={() => (
            <AuthedLayout>
              <AdultCheckProvider>
                <SettingsLayout background="#f7faf9">
                  <Progress />
                </SettingsLayout>
              </AdultCheckProvider>
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/sign-up"
          render={() => (
            <UnauthedLayout>
              <SignUp />
            </UnauthedLayout>
          )}
        />

        <Route
          exact
          path="/splash"
          render={() => (
            <UnauthedLayout>
              <Splash />
            </UnauthedLayout>
          )}
        />
        <Route
          exact
          path="/stories/:uuid"
          render={(props) => (
            <UnauthedLayout>
              <Stories id={props.match.params.uuid} />
            </UnauthedLayout>
          )}
        />

        <Route
          exact
          path="/story-factory/1"
          render={() => (
            <AuthedLayout>
              <HeaderFooter background="#F7FAF9">
                <StoryFactoryPg1 />
              </HeaderFooter>
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/story-factory/2"
          render={() => (
            <AuthedLayout>
              <HeaderFooter background="#F7FAF9">
                <StoryFactoryPg2 />
              </HeaderFooter>
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/story-factory/3"
          render={() => (
            <AuthedLayout>
              <HeaderFooter background="#F7FAF9">
                <StoryFactoryPage3 />
              </HeaderFooter>
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/story-factory/play/:pack_id"
          render={() => (
            <AuthedLayout>
              <HeaderFooter background="#F7FAF9">
                <StoryFactoryPage4 />
              </HeaderFooter>
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/story-factory/6"
          render={() => (
            <AuthedLayout>
              <HeaderFooter background="#F7FAF9">
                <StoryFactoryPage4 />
              </HeaderFooter>
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/intruder/intro"
          render={() => (
            <AuthedLayout>
              <HeaderFooter background="#F7FAF9">
                <IntruderIntro />
              </HeaderFooter>
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/intruder/select"
          render={() => (
            <AuthedLayout>
              <HeaderFooter background="#F7FAF9">
                <IntruderSelect />
              </HeaderFooter>
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/intruder/play/:pack_id"
          render={() => (
            <AuthedLayout>
              <HeaderFooter background="#F7FAF9">
                <IntruderGameLoader />
              </HeaderFooter>
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/student-dashboard"
          render={() => (
            <AuthedLayout>
              <HeaderFooter background="#fff">
                <StudentDashboard />
              </HeaderFooter>
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/teacher-login"
          render={() => (
            <UnauthedLayout>
              <TeacherLogin />
            </UnauthedLayout>
          )}
        />
      </Switch>
    </IonReactRouter>
  );
};

const App: React.FC = () => {
  return (
    <SuspenseWithPerf fallback={<Loading />} traceId="user-load">
      <ErrorBoundary fallback={<Loading />}>
        <IonApp>
          <Router />
        </IonApp>
      </ErrorBoundary>
    </SuspenseWithPerf>
  );
};

export default App;
