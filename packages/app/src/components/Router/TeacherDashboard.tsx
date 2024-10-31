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
import { Redirect, Route } from "react-router-dom";
import {
  ClassroomDashboardLayout,
  TeacherDashboardLayout,
} from "@/layouts/TeacherDashboard";

export const TeacherDashboardRoutes: React.FC = () => (
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
);

/*
   <AuthedLayout>
   <AdultCheckProvider>
   <TeacherDashboardLayout>
   </TeacherDashboardLayout>
   </AdultCheckProvider>
   </AuthedLayout>
 */
