import { Redirect, Route, Switch } from "react-router-dom";
import { UnauthedLayout } from "@/layouts/Unauthed";

import { Login } from "@/pages/Login";
import { PreSplash } from "@/pages/PreSplash";
import { SignUp } from "@/pages/SignUp";
import { Splash } from "@/pages/Splash";
import { Waitlist } from "@/pages/Waitlist";

export const PublicRoutes: React.FC = () => {
  return (
    <UnauthedLayout>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/presplash" component={PreSplash} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/splash" component={Splash} />
        <Route exact path="/waitlist" component={Waitlist} />
        <Redirect to="/presplash" />
      </Switch>
    </UnauthedLayout>
  );
};
