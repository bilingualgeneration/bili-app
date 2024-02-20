// todo: unsure if ErrorBoundary is necessary
// todo: unsure if Suspense is working
import { ErrorBoundary } from "react-error-boundary";
import { SuspenseWithPerf } from "reactfire";
import { Device } from "@capacitor/device";
import { Loading } from "@/pages/Loading";

import React, { useEffect, useState } from "react";
import { AdultCheckProvider } from "@/contexts/AdultCheckContext";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, RouteComponentProps, Route, Switch } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { AudioManagerProvider } from "@/contexts/AudioManagerContext";
import { AuthProvider, useFirebaseApp } from "reactfire";
import AuthedLayout from "@/layouts/Authed";
import { CountWithMeIntro } from "@/pages/CountWithMe/CountWithMeIntro";
import { CountWithMeSelect } from "@/pages/CountWithMe/CountWithMeSelect";
import { CountWithMeGame } from "@/pages/CountWithMe/CountWithMeGame";
import { HeaderFooter } from "@/components/HeaderFooter";
import { IntruderIntro } from "@/pages/Intruder/IntruderIntro";
import { IntruderGame } from "@/pages/Intruder/IntruderGame";
import { IntruderGameLoader } from "./pages/Intruder/IntruderGameLoader";
import { Tradein } from "@/pages/Tradein";
import Journeys from "./pages/Journeys";
import Login from "@/pages/Login";
import {
  About,
  Overview,
  Preferences,
  Progress,
  Profile,
} from "@/pages/Settings";
import { Debug } from "@/pages/Debug";
import { useIntl } from "react-intl";
import { Play } from "@/pages/Play";
import { Community } from "@/pages/Community";
import { Preload } from "@/pages/Preload";
import { PreSplash } from "@/pages/PreSplash";
import { Pricing } from "@/pages/SignUp/Pricing";
import ResetPassword from "@/pages/ResetPassword";
import { SettingsLayout } from "@/layouts/Settings";
import { SignUp } from "@/pages/SignUp";
import { Splash } from "@/pages/Splash";

import { Stories } from "@/pages/Stories";
import { StoriesDragGameLoader } from "./pages/Stories";
//import { StoryFactoryPg1 } from "@/pages/StoryFactory/StoryFactoryPg1";
//import { StoryFactoryPg2 } from "@/pages/StoryFactory/StoryFactoryPg2";
import { StoryFactoryIntro } from "@/pages/StoryFactory/StoryFactoryIntro";
import { StoryFactoryPage3 } from "@/pages/StoryFactory/StoryFactoryPg3";
import { StoryFactoryPage4 } from "@/pages/StoryFactory/StoryFactoryPg4";
import { StudentDashboard } from "@/pages/StudentDashboard";
import TeacherLogin from "@/pages/TeacherLogin";
import UnauthedLayout from "@/layouts/Unauthed";
import { useLanguage } from "@/contexts/LanguageContext";
import { I18nWrapper } from "@/components/I18nWrapper";
import { WouldDoIntro, WouldDoGame } from "@/pages/WouldDo";

import { PackSelect } from "@/components/PackSelect";

// category headers (usually for PackSelect
import { CommunityHeader } from "@/components/CommunityHeader";
import { PlayHeader } from "@/components/PlayHeader";

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
import "@/theme/margin-classes.scss";
import "@/theme/text-classes.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StoriesPictureGame } from "./pages/Stories/StoriesPictureGame";

setupIonicReact();

const Router: React.FC = () => {
  const contentStyle: Record<string, string> = {};
  const intl = useIntl();
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
            path="/debug"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <Debug />
                </HeaderFooter>
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
            path="/play"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <Play />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/community"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <Community />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/count-with-me-game/intro"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <CountWithMeIntro />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />
          <Route
            exact
            path="/count-with-me-game/select"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <CountWithMeSelect />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/count-with-me-game/play/:pack_id"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <CountWithMeGame />
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
            path="/tradein"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <Tradein />
                </HeaderFooter>
              </AuthedLayout>
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
              <AuthedLayout>
                <HeaderFooter background="#FFFFFF">
                  <Stories />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/stories/play/:pack_id"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#FFFFFF">
                  <StoriesDragGameLoader />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/stories/game"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#FFFFFF">
                  <StoriesPictureGame />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/story-factory-game/intro"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#F7FAF9">
                  <StoryFactoryIntro />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/story-factory-game/select"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <PackSelect
                    headerComponent={<PlayHeader />}
                    module="story-factory-game"
                    packId="55cb3673-8fb1-49cd-826a-0ddf2360025d"
                    translatedTitle={
		      intl.formatMessage({
			id: "common.storyFactory",
			defaultMessage: "Story Factory"
		      })
		    }
                    englishTitle="Story Factory"
                  />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/story-factory-game/play/:pack_id"
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
            path="/would-do-game/intro"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#F7FAF9">
                  <WouldDoIntro />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/would-do-game/play/:pack_id"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#FBF2E2">
                  <WouldDoGame />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/intruder-game/intro"
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
            path="/intruder-game/select"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <PackSelect
                    headerComponent={<PlayHeader />}
                    module="intruder-game"
                    packId="ceff6ae6-fe21-456a-9b57-29f07b5b52d5"
                    translatedTitle={
		      intl.formatMessage({
			id: "common.intruder",
			defaultMessage: "The Intruder"
		      })
                    }
                    englishTitle="The Intruder"
                  />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/intruder-game/play/:pack_id"
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

          <Route
            exact
            path="/would-do-game/select"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <PackSelect
                    headerComponent={<CommunityHeader />}
                    module="would-do-game"
                    packId="cfab339e-5ac0-4411-be0d-1ca7fb1ae920"
                    translatedTitle={
		      intl.formatMessage({
			id: "common.wouldDo",
			defaultMessage: "What would you do?"
		      })
                    }
                    englishTitle="What would you do?"
                  />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />
        </Switch>
      </IonReactRouter>
  );
};

const App: React.FC = () => {
  const { locale } = useLanguage();
  useEffect(() => {
    // set default language to device if not already set
    (async () => {
      const locale = await localStorage.getItem("userLocale");
      //alert((await Device.getLanguageCode()).value);
      if (locale === null) {
        // no stored language
        localStorage.setItem(
          "userLocale",
          (await Device.getLanguageCode()).value,
        );
      }
    })();
  }, []);
  return (
    <SuspenseWithPerf fallback={<Loading />} traceId="user-load">
      <ErrorBoundary fallback={<Loading />}>
        <IonApp>
          <AudioManagerProvider>
	    <I18nWrapper locale={locale}>
              <Router />
	    </I18nWrapper>
          </AudioManagerProvider>
        </IonApp>
      </ErrorBoundary>
    </SuspenseWithPerf>
  );
};

export default App;
