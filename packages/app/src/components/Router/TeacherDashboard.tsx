import {
  AddStudentsComplete,
  ClassStudents,
  ClassStudentsAddStudents,
  ClassOverview,
  ClassProgress,
  MyClassrooms,
  StudentSelect,
  StudentProgress,
} from "@/pages/TeacherDashboard";
import { AddClassroomNotificationMethod } from "@/pages/TeacherDashboard/AddClassroom";
import { Route } from "react-router-dom";
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
   </TeacherDashboardLayout>
   </AdultCheckProvider>
   </AuthedLayout>
 */
