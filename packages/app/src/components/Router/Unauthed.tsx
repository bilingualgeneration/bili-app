import { Redirect, Route, Switch } from "react-router-dom";
import { UnauthedLayout } from "@/layouts/Unauthed";

import { Login } from "@/pages/Login";
import { SignUp } from "@/pages/SignUp";
import { Waitlist } from "@/pages/Waitlist";

import { QuickLaunch } from "@/pages/QuickLaunch"; // TODO: remove

export const UnauthedRoutes: React.FC = () => {
  return (
    <UnauthedLayout>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-up/by-class-code" component={SignUp} />
        <Route exact path="/waitlist" component={Waitlist} />
      </Switch>
    </UnauthedLayout>
  );
};
