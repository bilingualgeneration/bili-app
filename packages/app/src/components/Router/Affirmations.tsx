import {
  AffirmationsGame,
  AffirmationsIntro,
  AffirmationsSelect,
} from "@/pages/Affirmations";
import { HeaderFooter } from "@/components/HeaderFooter";
import { MinimalHeader } from "@/components/MinimalHeader";
import { Route } from "react-router-dom";

export const AffirmationsRoutes: React.FC = () => (
  <Route
    path="/affirmations"
    render={() => (
      <>
        <HeaderFooter background="#f7faf9">
          <Route
            exact
            path="/affirmations/intro"
            component={AffirmationsIntro}
          />
          <Route
            exact
            path="/affirmations/select"
            component={AffirmationsSelect}
          />
        </HeaderFooter>
        <Route
          exact
          path="/affirmations/play/:pack_id"
          render={() => (
            <MinimalHeader>
              <AffirmationsGame />
            </MinimalHeader>
          )}
        />
      </>
    )}
  />
);
