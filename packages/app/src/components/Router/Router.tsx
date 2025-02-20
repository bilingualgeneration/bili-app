import { IonReactRouter } from "@ionic/react-router";
import { useStudent } from "@/hooks/Student";
import { useProfile } from "@/hooks/Profile";
import { Redirect, Route, Switch } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { UnauthedLayout } from "@/layouts/Unauthed";
import { CaregiverLayout } from "@/layouts/Caregiver";
import { StudentSelectLayout } from "@/layouts/StudentSelect";
import { TeacherClassroomLayout, TeacherLayout } from "@/layouts/Teacher";

import {
  //  AddStudentsComplete,
  //  ClassStudents,
  //  ClassStudentsAddStudents,
  ClassOverview,
  //  ClassPreferences,
  //  ClassProgress,
  MyClassrooms,
  //  StudentProgress,
} from "@/pages/TeacherDashboard";

import { CaregiverOverview } from "@/pages/CaregiverDashboard";

import { Login } from "@/pages/Login";
import { LoginWithClassroomCode } from "@/pages/LoginWithClassroomCode";
import { PreSplash } from "@/pages/PreSplash";
import { SignUp } from "@/pages/SignUp";
import { Splash } from "@/pages/Splash";
import { Waitlist } from "@/pages/Waitlist";

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
import { Diverter } from "@/pages/Diverter";
import { FeelingFeedback, OpinionFeedback } from "@/pages/Feedback";
import {
  IntruderSelect,
  IntruderIntro,
  IntruderGameLoader,
} from "@/pages/Intruder";
import { Play } from "@/pages/Play";
import { ProfileComingSoon } from "@/pages/ProfileComingSoon";
import { Stories, StoriesLandingPage, StoryBuilder } from "@/pages/Stories";
import {
  StoryFactoryCongrats,
  StoryFactoryEarlyReader,
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

/*
   / reroute depending on status
   
 */

export const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path="/login">
            <UnauthedLayout>
              <Login />
            </UnauthedLayout>
          </Route>
          <Route exact path="/login-with-classroom-code">
            <UnauthedLayout>
              <LoginWithClassroomCode />
            </UnauthedLayout>
          </Route>
          <Route exact path="/sign-up">
            <UnauthedLayout>
              <SignUp />
            </UnauthedLayout>
          </Route>
          <Route exact path="/sign-up/by-class-code">
            <UnauthedLayout>
              <SignUp />
            </UnauthedLayout>
          </Route>
          <Route exact path="/splash">
            <UnauthedLayout>
              <Splash />
            </UnauthedLayout>
          </Route>
          <Route exact path="/presplash">
            <UnauthedLayout>
              <PreSplash />
            </UnauthedLayout>
          </Route>
          <Route exact path="/waitlist">
            <UnauthedLayout>
              <Waitlist />
            </UnauthedLayout>
          </Route>

          <Route exact path="/classroom/student-select/:classroomId">
            <StudentSelectLayout>
              <StudentSelect />
            </StudentSelectLayout>
          </Route>

          <Route path="/affirmations">
            <StudentLayout>
              <Route exact path="/affirmations/intro">
                <AffirmationsIntro />
              </Route>
              <Route exact path="/affirmations/select">
                <AffirmationsSelect />
              </Route>
              <CardSliderProvider>
                <Route exact path="/affirmations/play/:pack_id">
                  <AffirmationsGame />
                </Route>
                <Route exact path="/affirmations/feedback/feeling">
                  <FeelingFeedback />
                </Route>
                <Route exact path="/affirmations/feedback/opinion">
                  <OpinionFeedback />
                </Route>
                <Route exact path="/affirmations/congrats">
                  <CommunityCongrats />
                </Route>
              </CardSliderProvider>
            </StudentLayout>
          </Route>

          <Route exact path="/community">
            <StudentLayout>
              <Community />
            </StudentLayout>
          </Route>
          <Route exact path="/count-with-me/intro">
            <StudentLayout>
              <CountWithMeIntro />
            </StudentLayout>
          </Route>
          <Route exact path="/count-with-me/select">
            <StudentLayout>
              <CountWithMeSelect />
            </StudentLayout>
          </Route>
          <Route exact path="/count-with-me/play/:pack_id">
            <StudentLayout>
              <CountWithMeGameLoader />
            </StudentLayout>
          </Route>
          <Route exact path="/student-debug">
            <StudentLayout>
              <StudentDebug />
            </StudentLayout>
          </Route>
          <Route exact path="/intruder/intro">
            <StudentLayout>
              <IntruderIntro />
            </StudentLayout>
          </Route>
          <Route exact path="/intruder/select">
            <StudentLayout>
              <IntruderSelect />
            </StudentLayout>
          </Route>
          <Route exact path="/intruder/play/:pack_id">
            <StudentLayout>
              <IntruderGameLoader />
            </StudentLayout>
          </Route>
          <Route exact path="/play">
            <StudentLayout>
              <Play />
            </StudentLayout>
          </Route>
          <Route exact path="/profile/coming-soon">
            <StudentLayout>
              <ProfileComingSoon />
            </StudentLayout>
          </Route>
          <Route exact path="/stories">
            <StudentLayout>
              <StoriesLandingPage />
            </StudentLayout>
          </Route>
          <Route exact path="/story/play/:uuid">
            <StudentLayout>
              <Stories />
            </StudentLayout>
          </Route>
          <Route exact path="/story-factory/intro">
            <StudentLayout>
              <StoryFactoryIntro />
            </StudentLayout>
          </Route>
          <Route exact path="/story-factory/select">
            <StudentLayout>
              <StoryFactorySelect />
            </StudentLayout>
          </Route>
          <Route exact path="/story-factory/play/early-reader">
            <StudentLayout>
              <StoryFactoryEarlyReader />
            </StudentLayout>
          </Route>
          <Route exact path="/story-factory/congrats">
            <StudentLayout>
              <StoryFactoryCongrats />
            </StudentLayout>
          </Route>
          <Route exact path="/classroom/student-select/:classroomId">
            <StudentLayout>
              <StudentSelect />
            </StudentLayout>
          </Route>
          <Route exact path="/tell-me-about/intro">
            <StudentLayout>
              <TellMeAboutIntro />
            </StudentLayout>
          </Route>
          <Route exact path="/tell-me-about/select">
            <StudentLayout>
              <TellMeAboutSelect />
            </StudentLayout>
          </Route>
          <Route exact path="/tell-me-about/play/:pack_id">
            <StudentLayout>
              <TellMeAboutGame />
            </StudentLayout>
          </Route>
          <Route exact path="/wellness">
            <StudentLayout>
              <Wellness />
            </StudentLayout>
          </Route>
          <Route path="/would-do">
            <Route exact path="/would-do/intro">
              <StudentLayout>
                <WouldDoIntro />
              </StudentLayout>
            </Route>
            <Route exact path="/would-do/select">
              <StudentLayout>
                <WouldDoSelect />
              </StudentLayout>
            </Route>
            <CardSliderProvider>
              <Route exact path="/would-do/play/:pack_id">
                <StudentLayout>
                  <WouldDoGame />
                </StudentLayout>
              </Route>
            </CardSliderProvider>
          </Route>

          <Route exact path="/teacher/dashboard">
            <TeacherLayout>
              <MyClassrooms />
            </TeacherLayout>
          </Route>

          <Route exact path="/teacher/classroom/:classroomId">
            <TeacherClassroomLayout>
              <ClassOverview />
            </TeacherClassroomLayout>
          </Route>

          <Route exact path="/caregiver/dashboard">
            <CaregiverLayout>
              <CaregiverOverview />
            </CaregiverLayout>
          </Route>

          <Route exact path="/student-dashboard">
            <StudentLayout>
              <StudentDashboard />
            </StudentLayout>
          </Route>
          <Route exact path="/">
            <Diverter />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </ScrollToTop>
    </IonReactRouter>
  );
};
