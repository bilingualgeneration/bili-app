// TODO: better about page handling for settings

import Reports from "@/pages/Reports"; // debug

import { AuthedLayout } from "@/layouts/Authed";
import { HeaderFooter } from "@/components/HeaderFooter/HeaderFooter";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAdultCheck } from "@/contexts/AdultCheckContext";
import { useProfile } from "@/hooks/Profile";

import {
  AddStudentsComplete,
  ClassStudents,
  ClassStudentsAddStudents,
  ClassOverview,
  ClassPreferences,
  ClassProgress,
  MyClassrooms,
  StudentProgress,
} from "@/pages/TeacherDashboard";
import {
  AddClassroomComplete,
  AddClassroomProvider,
  AddClassroomInfo,
  AddClassroomLanguage,
  AddClassroomNotificationMethod,
  AddClassroomStudents,
} from "@/pages/TeacherDashboard/AddClassroom";
import {
  AffirmationsGame,
  AffirmationsIntro,
  AffirmationsSelect,
} from "@/pages/Affirmations";
import {
  ClassroomDashboardLayout,
  TeacherDashboardLayout,
} from "@/layouts/TeacherDashboard";
import { Community } from "@/pages/Community";
import {
  CountWithMeGameLoader,
  CountWithMeIntro,
  CountWithMeSelect,
} from "@/pages/CountWithMe";
import { Debug } from "@/pages/Debug";
import {
  IntruderSelect,
  IntruderIntro,
  IntruderGameLoader,
} from "@/pages/Intruder";
import {
  About,
  Overview,
  Profile,
  Preferences,
  Progress,
} from "@/pages/Settings";
import { PhraseMatcherTest } from "@/pages/PhraseMatcherTest";
import { Play } from "@/pages/Play";
import { ProfileComingSoon } from "@/pages/ProfileComingSoon";
import { SettingsLayout } from "@/layouts/Settings";
import { Stories, StoriesLandingPage, StoryBuilder } from "@/pages/Stories";
import {
  StoryFactoryIntro,
  StoryFactoryPlay,
  StoryFactorySelect,
} from "@/pages/StoryFactory";
import { StudentDashboard } from "@/pages/StudentDashboard";
import { StudentSelect } from "@/pages/StudentSelect";
import {
  TellMeAboutGame,
  TellMeAboutIntro,
  TellMeAboutSelect,
} from "@/pages/TellMeAbout";
import { Wellness } from "@/pages/Wellness";
import { WouldDoGame, WouldDoIntro, WouldDoSelect } from "@/pages/WouldDo";
import { StoryFactoryCongrats } from "@/pages/StoryFactory/StoryFactoryCongrats";
import { useEffect } from "react";
import { FeelingsFeedback } from "@/pages/Community/FeelingsFeedback";
import { CommunityCongrats } from "@/pages/Community/CommunityCongrats";
import { ThoughtsFeedback } from "@/pages/Community/ThoughtsFeedback";

const AdultCheck: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { showAdultCheck } = useAdultCheck();
  const { justLoggedIn, setJustLoggedIn } = useProfile();

  useEffect(() => {
    if (justLoggedIn) {
      setJustLoggedIn(false);
    } else {
      showAdultCheck();
    }
  }, []);
  return children;
};

export const ProtectedRoutes: React.FC = () => {
  const { profile } = useProfile();
  return (
    <AuthedLayout>
      <HeaderFooter background="#f7faf9">
        <Switch>
          <Route
            path="/classrooms"
            render={() => (
              <AdultCheck>
                <TeacherDashboardLayout>
                  <Route
                    path="/classrooms/add"
                    render={() => (
                      <AddClassroomProvider>
                        <Route exact path="/classrooms/add">
                          <Redirect to="/classrooms/add/info" />
                        </Route>
                        <Route
                          exact
                          path="/classrooms/add/info"
                          component={AddClassroomInfo}
                        />
                        <Route
                          exact
                          path="/classrooms/add/language"
                          component={AddClassroomLanguage}
                        />
                        <Route
                          exact
                          path="/classrooms/add/students"
                          component={AddClassroomStudents}
                        />
                        <Route
                          exact
                          path="/classrooms/add/notification-method"
                          component={AddClassroomNotificationMethod}
                        />
                        <Route
                          exact
                          path="/classrooms/add/complete"
                          component={AddClassroomComplete}
                        />
                      </AddClassroomProvider>
                    )}
                  />
                  <Route exact path="/classrooms" component={MyClassrooms} />
                </TeacherDashboardLayout>
                <Route
                  path="/classrooms/view/:classroomId"
                  render={() => (
                    <ClassroomDashboardLayout>
                      <Route
                        exact
                        path="/classrooms/view/:classroomId"
                        component={ClassOverview}
                      />
                      <Route
                        exact
                        path="/classrooms/view/:classroomId/students"
                        component={ClassStudents}
                      />
                      <Route
                        exact
                        path="/classrooms/view/:classroomId/students/view/:studentId"
                        component={StudentProgress}
                      />
                      <Route
                        exact
                        path="/classrooms/view/:classroomId/progress"
                        component={ClassProgress}
                      />
                      <Route
                        exact
                        path="/classrooms/view/:classroomId/add_students"
                        component={ClassStudentsAddStudents}
                      />
                      <Route
                        exact
                        path="/classrooms/view/:classroomId/add_students/notification-method"
                        component={AddClassroomNotificationMethod}
                      />
                      <Route
                        exact
                        path="/classrooms/view/:classroomId/add_students/complete"
                        component={AddStudentsComplete}
                      />
                      <Route
                        exact
                        path="/classrooms/view/:classroomId/preferences"
                        component={ClassPreferences}
                      />
                      <Route
                        exact
                        path="/classrooms/view/:classroomId/about"
                        component={About}
                      />
                    </ClassroomDashboardLayout>
                  )}
                />
              </AdultCheck>
            )}
          />
          <Route
            path="/settings"
            render={() => (
              <AdultCheck>
                <SettingsLayout>
                  <Route exact path="/settings/about" component={About} />
                  <Route exact path="/settings/overview" component={Overview} />
                  <Route exact path="/settings/profile" component={Profile} />
                  <Route
                    exact
                    path="/settings/preferences"
                    component={Preferences}
                  />
                  <Route exact path="/settings/progress" component={Progress} />
                </SettingsLayout>
              </AdultCheck>
            )}
          />
          <Route
            exact
            path="/affirmations/intro"
            component={AffirmationsIntro}
          />
          <Route
            exact
            path="/affirmations/select"
            component={AffirmationsSelect}
          />
          <Route
            exact
            path="/affirmations/play/:pack_id"
            component={AffirmationsGame}
          />
          <Route exact path="/community" component={Community} />
          <Route
            exact
            path="/community/feelings"
            component={FeelingsFeedback}
          />
          <Route
            exact
            path="/community/thoughts"
            component={ThoughtsFeedback}
          />
          <Route
            exact
            path="/community/congrats"
            component={CommunityCongrats}
          />
          <Route
            exact
            path="/count-with-me-game/intro"
            component={CountWithMeIntro}
          />
          <Route
            exact
            path="/count-with-me-game/select"
            component={CountWithMeSelect}
          />
          <Route
            exact
            path="/count-with-me-game/play/:pack_id"
            component={CountWithMeGameLoader}
          />
          <Route exact path="/debug" component={Debug} />
          <Route exact path="/intruder-game/intro" component={IntruderIntro} />
          <Route
            exact
            path="/intruder-game/select"
            component={IntruderSelect}
          />
          <Route
            exact
            path="/intruder-game/play/:pack_id"
            component={IntruderGameLoader}
          />
          <Route
            exact
            path="/phrase-matcher-test"
            component={PhraseMatcherTest}
          />
          <Route exact path="/play" component={Play} />
          <Route
            exact
            path="/profile/coming-soon"
            component={ProfileComingSoon}
          />
          <Route
            exact
            path="/select-student/:classroomId"
            component={StudentSelect}
          />
          <Route exact path="/stories" component={StoriesLandingPage} />
          <Route exact path="/story/play/:uuid" component={Stories} />
          <Route
            exact
            path="/story-factory-game/intro"
            component={StoryFactoryIntro}
          />
          <Route
            exact
            path="/story-factory-game/select"
            component={StoryFactorySelect}
          />
          <Route
            exact
            path="/story-factory-game/play/:pack_id"
            component={StoryFactoryPlay}
          />
          <Route
            exact
            path="/story-factory-game/congrats"
            component={StoryFactoryCongrats}
          />
          <Route
            exact
            path="/tell-me-about/intro"
            component={TellMeAboutIntro}
          />
          <Route
            exact
            path="/tell-me-about/select"
            component={TellMeAboutSelect}
          />
          <Route
            exact
            path="/tell-me-about/play/:pack_id"
            component={TellMeAboutGame}
          />
          <Route exact path="/story-builder" component={StoryBuilder} />
          <Route exact path="/student-dashboard" component={StudentDashboard} />
          <Route exact path="/wellness" component={Wellness} />
          <Route exact path="/would-do/intro" component={WouldDoIntro} />
          <Route exact path="/would-do/select" component={WouldDoSelect} />
          <Route exact path="/would-do/play/:pack_id" component={WouldDoGame} />
          <Route exact path="/reports" component={Reports} /> {/* debug */}
          <Route
            exact
            path="/caregiver/student-select"
            render={() => <StudentSelect />}
          />
          {profile.role === "caregiver" && (
            <Redirect to="/caregiver/student-select" />
          )}
          {profile.role === "teacher" && <Redirect to="/classrooms" />}
        </Switch>
      </HeaderFooter>
    </AuthedLayout>
  );
};
