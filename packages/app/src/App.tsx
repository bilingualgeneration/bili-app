// todo: unsure if ErrorBoundary is necessary
// todo: unsure if Suspense is working
import { ErrorBoundary } from "react-error-boundary";
import { SuspenseWithPerf } from "reactfire";
import { Loading } from "@/pages/Loading";

import React, { useEffect, useState } from "react";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, RouteComponentProps, Route, Switch } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { AuthProvider, useFirebaseApp } from "reactfire";
import AuthedLayout from "./layouts/Authed";
import { I18nWrapper } from "@/components/I18nWrapper";
import Intruder from "./pages/games/Intruder";
import { IntroPage1 } from "./pages/StoryFactory/StoryFactoryPg1";
import { IntroPage2 } from "./pages/StoryFactory/StoryFactoryPg2";
import { IntroPage3 } from "./pages/StoryFactory/StoryFactoryPg3";
import { StoryFactoryPage4 } from "./pages/StoryFactory/StoryFactoryPg4";
import { StoryFactoryPage5 } from "./pages/StoryFactory/StoryFactoryPg5";
import { StoryFactoryPage6 } from "./pages/StoryFactory/StoryFactoryPg6";
import Journeys from "./pages/Journeys";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Login from "./pages/Login";
import Memory from "./pages/games/Memory";
import { Preload } from "./pages/Preload";
import ResetPassword from "./pages/ResetPassword";
import { SignUp } from "./pages/SignUp";
import { Splash } from "./pages/Splash";
import Stories from "./pages/games/Stories";
import { StudentDashboard } from "./pages/StudentDashboard";
import TeacherLogin from "./pages/TeacherLogin";
import UnauthedLayout from "./layouts/Unauthed";

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
import "./theme/variables.css";
import "./theme/overrides.scss";

/* SwiperJS */
import "swiper/scss";
import "@ionic/react/css/ionic-swiper.css";
import { PreSplash } from "./pages/PreSplash";

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
            <UnauthedLayout>
              <Intruder />
            </UnauthedLayout>
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
          path="/reset-password"
          render={() => (
            <UnauthedLayout>
              <ResetPassword />
            </UnauthedLayout>
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

        {/* This is just temporary while creating pages */}

        <Route
          exact
          path="/story-factory/1"
          render={() => (
            <AuthedLayout customBackground="#FBF2E2" wide={true}>
              <IntroPage1 currentPage={1} />
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/story-factory/2"
          render={() => (
            <AuthedLayout customBackground="#FBF2E2" wide={true}>
              <IntroPage2 currentPage={2} />
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/story-factory/3"
          render={() => (
            <AuthedLayout customBackground="#FBF2E2" wide={true}>
              <IntroPage3 currentPage={3} />
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/story-factory/4"
          render={() => (
            <AuthedLayout customBackground="#FBF2E2" wide={true}>
              <StoryFactoryPage4 />
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/story-factory/5"
          render={() => (
            <AuthedLayout customBackground="#FBF2E2" wide={true}>
              <StoryFactoryPage5 />
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/story-factory/6"
          render={() => (
            <AuthedLayout>
              <StoryFactoryPage6 />
            </AuthedLayout>
          )}
        />

        <Route
          exact
          path="/student-dashboard"
          render={() => (
            <AuthedLayout customBackground="white" wide={true}>
              <StudentDashboard />
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
