import { AffirmationsRoutes } from "./Affirmations";
import { CountWithMeRoutes } from "./CountWithMe";
import { TeacherDashboardRoutes } from "./TeacherDashboard";

import { AdultCheckProvider } from "@/contexts/AdultCheckContext";
import { AuthedLayout } from "@/layouts/Authed";
import { HeaderFooter } from "@/components/HeaderFooter";
import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { MinimalHeader } from "@/components/MinimalHeader";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SettingsLayout } from "@/layouts/Settings";
import UnauthedLayout from "@/layouts/Unauthed";

// todo: rename
import {
  About,
  Overview,
  Preferences,
  Progress,
  Profile,
} from "@/pages/Settings";
import { Community } from "@/pages/Community";
import { Debug } from "@/pages/Debug";
import {
  IntruderSelect,
  IntruderIntro,
  IntruderGameLoader,
} from "@/pages/Intruder";
import Login from "@/pages/Login";
import { PhraseMatcherTest } from "@/pages/PhraseMatcherTest";
import { Play } from "@/pages/Play";
import { Preload } from "@/pages/Preload";
import { PreSplash } from "@/pages/PreSplash";
import { ProfileComingSoon } from "@/pages/ProfileComingSoon";
import { Pricing } from "@/pages/SignUp/Pricing";
import ResetPassword from "@/pages/ResetPassword";
import { SignUp } from "@/pages/SignUp";
import { Splash } from "@/pages/Splash";
import {
  Stories,
  StoriesDragGameLoader,
  StoriesLandingPage,
  StoryBuilder,
} from "@/pages/Stories";
import {
  StoryFactoryIntro,
  StoryFactoryPlay,
  StoryFactorySelect,
} from "@/pages/StoryFactory";
import { StudentDashboard } from "@/pages/StudentDashboard";
import { StudentLoader } from "@/pages/Caregiver";
import TeacherLogin from "@/pages/TeacherLogin";
import {
  TellMeAboutGame,
  TellMeAboutIntro,
  TellMeAboutSelect,
} from "@/pages/TellMeAbout";
import { Wellness } from "@/pages/Wellness";
import { WouldDoSelect, WouldDoIntro, WouldDoGame } from "@/pages/WouldDo";
import { ClassCode } from "@/pages/SignUp/ClassCode";
import {
  AddClassroomComplete,
  AddClassroomProvider,
  AddClassroomInfo,
  AddClassroomLanguage,
  AddClassroomNotificationMethod,
  AddClassroomStudents,
} from "@/pages/TeacherDashboard/AddClassroom";
import Reports from "@/pages/Reports";

import { StudentSelect } from "@/pages/TeacherDashboard";
/*
  
  
*/

export const Router: React.FC = () => {
  const contentStyle: Record<string, string> = {};
  return (
    <IonReactRouter>
      <Switch>
        <ScrollToTop>
          <AuthedLayout>
            <AffirmationsRoutes />
            <CountWithMeRoutes />
            <TeacherDashboardRoutes />
          </AuthedLayout>

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
            path="/phrase-matcher-test"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <PhraseMatcherTest />
                </HeaderFooter>
              </AuthedLayout>
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
            path="/stories"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <StoriesLandingPage />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />
          <Route
            exact
            path="/story-builder"
            render={() => (
              <AuthedLayout>
                <MinimalHeader>
                  <StoryBuilder />
                </MinimalHeader>
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
            path="/profile/coming-soon"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <ProfileComingSoon />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route exact path="/settings/about">
            <AuthedLayout>
              <AdultCheckProvider>
                <SettingsLayout background="#f7faf9">
                  <About />
                </SettingsLayout>
              </AdultCheckProvider>
            </AuthedLayout>
          </Route>

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
            path="/classrooms/:classroomId/select-student"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <StudentSelect />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/caregiver/student-loader"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <StudentLoader />
                </HeaderFooter>
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
            path="/sign-up/class-code"
            render={() => (
              <UnauthedLayout>
                <SignUp entry="classCode" />
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
            path="/reports"
            render={(props) => (
              <AuthedLayout>
                <HeaderFooter background="#FFFFFF">
                  <Reports />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/story/play/:uuid"
            render={(props) => (
              <AuthedLayout>
                <MinimalHeader>
                  <Stories />
                </MinimalHeader>
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
                  <StoryFactorySelect />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/story-factory-game/play/:pack_id"
            render={() => (
              <AuthedLayout>
                <MinimalHeader>
                  <StoryFactoryPlay />
                </MinimalHeader>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/tell-me-about-game/intro"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#F7FAF9">
                  <TellMeAboutIntro />
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
                <MinimalHeader>
                  <WouldDoGame />
                </MinimalHeader>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/tell-me-about-game/play/:pack_id"
            render={() => (
              <AuthedLayout>
                <MinimalHeader>
                  <TellMeAboutGame />
                </MinimalHeader>
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
                  <IntruderSelect />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/intruder-game/play/:pack_id"
            render={() => (
              <AuthedLayout>
                <MinimalHeader>
                  <IntruderGameLoader />
                </MinimalHeader>
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
                  <WouldDoSelect />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/tell-me-about-game/select"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <TellMeAboutSelect />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/wellness"
            render={() => (
              <AuthedLayout>
                <HeaderFooter background="#f7faf9">
                  <Wellness />
                </HeaderFooter>
              </AuthedLayout>
            )}
          />
        </ScrollToTop>
      </Switch>
    </IonReactRouter>
  );
};
