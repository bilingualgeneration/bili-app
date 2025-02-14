// user can have any logged in status
// no auth or any kind of auth

import { PublicLayout } from "@/layouts/Public";
import { Route, Switch } from "react-router-dom";
import { StudentSelect } from "@/pages/StudentSelect";

export const PublicRoutes: React.FC = () => {
  return (
    <PublicLayout>
      <Switch>
        <Route
          exact
          path="/classroom/student-select/:classroomId"
          component={StudentSelect}
        />
      </Switch>
    </PublicLayout>
  );
};
