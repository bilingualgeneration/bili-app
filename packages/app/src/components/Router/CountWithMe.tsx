import {
  CountWithMeGameLoader,
  CountWithMeIntro,
  CountWithMeSelect,
} from "@/pages/CountWithMe";
import { HeaderFooter } from "@/components/HeaderFooter";
import { Route } from "react-router-dom";

export const CountWithMeRoutes: React.FC = () => (
  <Route
    path="/count-with-me-game"
    render={() => (
      <HeaderFooter background="#f7faf9">
        <Route
          exact
          path="/count-with-me-game/intro"
          component={CountWithMeIntro}
        />
        <Route
          exact
          path="/count-with-me-game/select"
          component={CountWithMeSelect}
        />
        <Route
          exact
          path="/count-with-me-game/play/:pack_id"
          component={CountWithMeGameLoader}
        />
      </HeaderFooter>
    )}
  />
);
