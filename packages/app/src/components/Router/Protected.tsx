import Reports from "@/pages/Reports"; // debug

import { AuthedLayout } from "@/layouts/Authed";
import { HeaderFooter } from "@/components/HeaderFooter/HeaderFooter";
import { MinimalHeader } from "@/components/MinimalHeader";
import { Redirect, Route, Switch } from "react-router-dom";
import { useProfile } from "@/hooks/Profile";

import {
  AddStudentsComplete,
  ClassStudents,
  ClassStudentsAddStudents,
  ClassOverview,
  ClassPreferences,
  ClassProgress,
  MyClassrooms,
  StudentSelect,
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
import { PhraseMatcherTest } from "@/pages/PhraseMatcherTest";
import { Play } from "@/pages/Play";
import { ProfileComingSoon } from "@/pages/ProfileComingSoon";
import { Stories, StoriesLandingPage, StoryBuilder } from "@/pages/Stories";
import {
  StoryFactoryIntro,
  StoryFactoryPlay,
  StoryFactorySelect,
} from "@/pages/StoryFactory";
import { StudentDashboard } from "@/pages/StudentDashboard";
// unsure what this is
//import { StudentLoader } from "@/pages/Caregiver";
import {
  TellMeAboutGame,
  TellMeAboutIntro,
  TellMeAboutSelect,
} from "@/pages/TellMeAbout";
import { Wellness } from "@/pages/Wellness";
import { WouldDoGame, WouldDoIntro, WouldDoSelect } from "@/pages/WouldDo";
import { StoryFactoryCongrats } from "@/pages/StoryFactory/StoryFactoryCongrats";

export const ProtectedRoutes: React.FC = () => {
  const { profile } = useProfile();
  return (
    <AuthedLayout>
      <HeaderFooter background="#f7faf9">
        <Switch>
          <Route
            path="/classrooms"
            render={() => (
              <>
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
                    </ClassroomDashboardLayout>
                  )}
                />
              </>
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
            render={() => (
              <MinimalHeader>
                <AffirmationsGame />
              </MinimalHeader>
            )}
          />
          <Route exact path="/community" component={Community} />
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
            render={() => (
              <MinimalHeader>
                <IntruderGameLoader />
              </MinimalHeader>
            )}
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
          <Route
            exact
            path="/story/play/:uuid"
            render={() => (
              <MinimalHeader>
                <Stories />
              </MinimalHeader>
            )}
          />
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
            render={() => (
              <MinimalHeader>
                <StoryFactoryPlay />
              </MinimalHeader>
            )}
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
            render={() => (
              <MinimalHeader>
                <TellMeAboutGame />
              </MinimalHeader>
            )}
          />
          <Route exact path="/story-builder" component={StoryBuilder} />
          <Route exact path="/student-dashboard" component={StudentDashboard} />
          <Route exact path="/wellness" component={Wellness} />
          <Route exact path="/would-do-game/intro" component={WouldDoIntro} />
          <Route exact path="/would-do-game/select" component={WouldDoSelect} />
          <Route
            exact
            path="/would-do-game/play/:pack_id"
            render={() => (
              <MinimalHeader>
                <WouldDoGame />
              </MinimalHeader>
            )}
          />
          <Route exact path="/reports" component={Reports} /> {/* debug */}
          {/*
	    TODO: figure this out
          <Route
            exact
            path="/caregiver/student-loader"
            render={() => (
                  <StudentLoader />
            )}
          />
	  */}
          {profile.role === "caregiver" && (
            <Redirect to="/caregiver/student-loader" />
          )}
          {profile.role === "teacher" && <Redirect to="/classrooms" />}
        </Switch>
      </HeaderFooter>
    </AuthedLayout>
  );
};
