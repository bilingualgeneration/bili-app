// TODO: better about page handling for settings

import Reports from "@/pages/Reports"; // debug

import { AuthedLayout } from "@/layouts/Authed";
import { HeaderFooter } from "@/components/HeaderFooter/HeaderFooter";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAdultCheck } from "@/contexts/AdultCheckContext";
import { useProfile } from "@/hooks/Profile";

import {
  About,
  Overview,
  Profile,
  Preferences,
  Progress,
} from "@/pages/Settings";
import { ActivityProvider } from "@/contexts/ActivityContext";
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
  ClassroomDashboardLayout,
  TeacherDashboardLayout,
} from "@/layouts/TeacherDashboard";

import { PhraseMatcherTest } from "@/pages/PhraseMatcherTest";
import { SettingsLayout } from "@/layouts/Settings";
import { useEffect } from "react";

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
            path="/phrase-matcher-test"
            component={PhraseMatcherTest}
          />
          <Route exact path="/reports" component={Reports} /> {/* debug */}
        </Switch>
      </HeaderFooter>
    </AuthedLayout>
  );
};

/*
   <Route exact path="/story-builder" component={StoryBuilder} />
   {profile.role === "teacher" && <Redirect to="/classrooms" />}
   
   <Route
   exact
   path="/caregiver/student-select"
   render={() => <StudentSelect />}
   />
   {profile.role === "caregiver" && (
   <Redirect to="/caregiver/student-select" />
   )}
 */
