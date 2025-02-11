import { LoginWithClassroomCode } from "@/pages/LoginWithClassroomCode";
import { PreSplash } from "@/pages/PreSplash";
import { PublicLayout } from "@/layouts/Public";
import { Route, Switch } from "react-router-dom";
import { Splash } from "@/pages/Splash";
import { StudentSelect } from "@/pages/StudentSelect";

export const PublicRoutes: React.FC = () => {
  return (
    <PublicLayout>
      <Switch>
        <Route exact path="/" component={PreSplash} />
        <Route exact path="/splash" component={Splash} />
        <Route
          exact
          path="/login-with-classroom-code"
          component={LoginWithClassroomCode}
        />
        <Route
          exact
          path="/classroom/student-select/:classroomId"
          component={StudentSelect}
        />
      </Switch>
    </PublicLayout>
  );
};
