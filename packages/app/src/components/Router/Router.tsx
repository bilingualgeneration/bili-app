import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { ProtectedRoutes } from "./Protected";
import { PublicRoutes } from "./Public";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Switch } from "react-router-dom";
import { useProfile } from "@/hooks/Profile";
// import { AdultCheckProvider } from "@/contexts/AdultCheckContext";

/*
import { SettingsLayout } from "@/layouts/Settings";
import {
  About,
  Overview,
  Preferences,
  Progress,
  Profile,
} from "@/pages/Settings";
*/

export const Router: React.FC = () => {
  const { isLoggedIn } = useProfile();
  return (
    <IonReactRouter>
      <Switch>
        <ScrollToTop>
          {!isLoggedIn && <PublicRoutes />}
          {isLoggedIn && <ProtectedRoutes />}
        </ScrollToTop>
      </Switch>
    </IonReactRouter>
  );
};

/*
          <Route exact path="/settings/about">
            <AuthedLayout>
              <AdultCheckProvider>
                <SettingsLayout background="#f7faf9">
                  <About />
                </SettingsLayout>
              </AdultCheckProvider>
            </AuthedLayout>
          </Route>

          <Route
            exact
            path="/settings/overview"
            render={() => (
              <AuthedLayout>
                <AdultCheckProvider>
                  <SettingsLayout background="#f7faf9">
                    <Overview />
                  </SettingsLayout>
                </AdultCheckProvider>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/settings/preferences"
            render={() => (
              <AuthedLayout>
                <AdultCheckProvider>
                  <SettingsLayout background="#f7faf9">
                    <Preferences />
                  </SettingsLayout>
                </AdultCheckProvider>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/settings/profile"
            render={() => (
              <AuthedLayout>
                <AdultCheckProvider>
                  <SettingsLayout background="#f7faf9">
                    <Profile />
                  </SettingsLayout>
                </AdultCheckProvider>
              </AuthedLayout>
            )}
          />

          <Route
            exact
            path="/settings/progress"
            render={() => (
              <AuthedLayout>
                <AdultCheckProvider>
                  <SettingsLayout background="#f7faf9">
                    <Progress />
                  </SettingsLayout>
                </AdultCheckProvider>
              </AuthedLayout>
            )}
          />
*/
