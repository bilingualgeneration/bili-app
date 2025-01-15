import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { ProtectedRoutes } from "./Protected";
import { PublicRoutes } from "./Public";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Switch } from "react-router-dom";
import { useProfile } from "@/hooks/Profile";

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
