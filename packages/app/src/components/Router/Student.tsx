import {
  AffirmationsGame,
  AffirmationsIntro,
  AffirmationsSelect,
} from "@/pages/Affirmations";
import { CardSliderProvider } from "@/contexts/CardSlider";
import { Community, CommunityCongrats } from "@/pages/Community";
import {
  CountWithMeGameLoader,
  CountWithMeIntro,
  CountWithMeSelect,
} from "@/pages/CountWithMe";
import { FeelingFeedback, OpinionFeedback } from "@/pages/Feedback";
import { HeaderFooter } from "@/components/HeaderFooter/HeaderFooter";
import {
  IntruderSelect,
  IntruderIntro,
  IntruderGameLoader,
} from "@/pages/Intruder";
import { Play } from "@/pages/Play";
import { ProfileComingSoon } from "@/pages/ProfileComingSoon";
import {
  // Redirect,
  Route,
  //  Switch,
} from "react-router-dom";
import { Stories, StoriesLandingPage, StoryBuilder } from "@/pages/Stories";
import {
  StoryFactoryCongrats,
  StoryFactoryIntro,
  StoryFactoryPlay,
  StoryFactorySelect,
} from "@/pages/StoryFactory";
import { StudentDashboard } from "@/pages/StudentDashboard";
import { StudentDebug } from "@/pages/Debug";
import { StudentLayout } from "@/layouts/Student";
import { StudentSelect } from "@/pages/StudentSelect";
import {
  TellMeAboutGame,
  TellMeAboutIntro,
  TellMeAboutSelect,
} from "@/pages/TellMeAbout";
import { Wellness } from "@/pages/Wellness";
import { WouldDoGame, WouldDoIntro, WouldDoSelect } from "@/pages/WouldDo";

export const StudentRoutes: React.FC = () => {
  return (
    <StudentLayout>
      <HeaderFooter background="#f7faf9">
        <Route path="/affirmations">
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
          <CardSliderProvider>
            <Route
              exact
              path="/affirmations/play/:pack_id"
              component={AffirmationsGame}
            />
            <Route
              exact
              path="/affirmations/feedback/feeling"
              component={FeelingFeedback}
            />
            <Route
              exact
              path="/affirmations/feedback/opinion"
              component={OpinionFeedback}
            />
            <Route
              exact
              path="/affirmations/congrats"
              component={CommunityCongrats}
            />
          </CardSliderProvider>
        </Route>
        <Route exact path="/community" component={Community} />
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
        <Route exact path="/debug" component={StudentDebug} />
        <Route exact path="/intruder/intro" component={IntruderIntro} />
        <Route exact path="/intruder/select" component={IntruderSelect} />
        <Route
          exact
          path="/intruder/play/:pack_id"
          component={IntruderGameLoader}
        />
        <Route exact path="/play" component={Play} />
        <Route
          exact
          path="/profile/coming-soon"
          component={ProfileComingSoon}
        />
        <Route exact path="/stories" component={StoriesLandingPage} />
        <Route exact path="/story/play/:uuid" component={Stories} />
        <Route
          exact
          path="/story-factory-game/intro"
          component={StoryFactoryIntro}
        />
        <Route
          exact
          path="/story-factory-game/select"
          component={StoryFactorySelect}
        />
        <Route
          exact
          path="/story-factory-game/play/:pack_id"
          component={StoryFactoryPlay}
        />
        <Route
          exact
          path="/story-factory-game/congrats"
          component={StoryFactoryCongrats}
        />
        <Route
          exact
          path="/classroom/student-select/:classroomId"
          component={StudentSelect}
        />
        <Route exact path="/tell-me-about/intro" component={TellMeAboutIntro} />
        <Route
          exact
          path="/tell-me-about/select"
          component={TellMeAboutSelect}
        />
        <Route
          exact
          path="/tell-me-about/play/:pack_id"
          component={TellMeAboutGame}
        />
        <Route exact path="/wellness" component={Wellness} />
        <Route path="/would-do">
          <Route exact path="/would-do/intro" component={WouldDoIntro} />
          <Route exact path="/would-do/select" component={WouldDoSelect} />
          <CardSliderProvider>
            <Route
              exact
              path="/would-do/play/:pack_id"
              component={WouldDoGame}
            />
          </CardSliderProvider>
        </Route>

        <Route exact path="/" component={StudentDashboard} />
        <Route exact path="/student-dashboard" component={StudentDashboard} />
      </HeaderFooter>
    </StudentLayout>
  );
};
