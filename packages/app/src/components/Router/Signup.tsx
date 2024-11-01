import { Route } from "react-router-dom";
import { SignUp } from "@/pages/SignUp";
import { UnauthedHeader } from "@/components/UnauthedHeader";
import { useHistory } from "react-router-dom";
import { Waitlist } from "@/pages/Waitlist";

export const SignupRoutes: React.FC = () => {
  const history = useHistory();

  return (
    <Route
      path="/sign-up"
      render={() => (
        <>
          <UnauthedHeader
            backButtonOnClick={() => {
              history.goBack();
            }}
          />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/sign-up/waitlist" component={Waitlist} />

          <Route
            exact
            path="/class-code"
            render={() => <SignUp entry="classCode" />}
          />
        </>
      )}
    />
  );
};
