import {
  IonButton,
  IonCard,
  IonCardContent,
  IonProgressBar,
} from "@ionic/react";
import React, { useState } from "react";
import {
  ChildProfile,
  Complete,
  LanguageModeSelect,
  RoleSelect,
  ParentAccountCredentials,
  Pricing,
  TeacherAbout,
  TeacherAccountCredentials,
} from "@/pages/SignUp";
//import {Test} from './Test';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { SignUpDataProvider } from "@/pages/SignUp/SignUpContext";

// todo: on page visit, clear form and reset swiper
export const SignUp: React.FC = () => {
  const [progressPercent, setProgressPercent] = useState<number>(0.2);
  const handleSlideChange = (swiper: SwiperCore): void => {
    setProgressPercent(
      Number(
        swiper.slides[swiper.activeIndex].getAttribute(
          "data-progress-percent",
        )!,
      ),
    );
  };
  return (
    <SignUpDataProvider>
      <IonCard>
        <IonCardContent>
          <div className="ion-padding">
            <IonProgressBar
              color="primary"
              style={{ width: "60%", margin: "auto" }}
              value={progressPercent}
            />
          </div>
          <Swiper allowTouchMove={false} onSlideChange={handleSlideChange}>
            {/* 0 */}
            <SwiperSlide
              className="ion-padding-top"
              data-testid="role-select-slide"
              data-progress-percent={0.2}
            >
              <RoleSelect teacherSlide={1} parentSlide={2} />
            </SwiperSlide>

            {/* 1 */}
            <SwiperSlide
              className="ion-padding-top"
              data-testid="role-select-slide"
              data-progress-percent={0.4}
            >
              <TeacherAbout nextSlide={3} />
            </SwiperSlide>

            {/* 2 */}
            <SwiperSlide
              className="ion-padding-top"
              data-testid="child-profile-slide"
              data-progress-percent={0.4}
            >
              <ChildProfile nextSlide={3} />
            </SwiperSlide>

            {/* 3 */}
            <SwiperSlide
              className="ion-padding-top"
              data-testid="language-mode-slide"
              data-progress-percent={0.6}
            >
              <LanguageModeSelect teacherSlide={5} parentSlide={4} />
            </SwiperSlide>

            {/* 4 */}
            <SwiperSlide
              className="ion-padding-top"
              data-testid="parent-account-credentials-slide"
              data-progress-percent={0.8}
            >
              <ParentAccountCredentials nextSlide={6} previousSlide={0} />
            </SwiperSlide>

            {/* 5 */}
            <SwiperSlide
              className="ion-padding-top"
              data-testid="teacher-account-credentials-slide"
              data-progress-percent={0.8}
            >
              <TeacherAccountCredentials previousSlide={0} />
            </SwiperSlide>

            {/* 6 */}
            <SwiperSlide
              className="ion-padding-top"
              data-testid="role-select-slide"
              data-progress-percent={0.9}
            >
              <Pricing />
            </SwiperSlide>

            {/* 7 */}
            <SwiperSlide
              className="ion-padding-top"
              data-testid="complete-slide"
              data-progress-percent={1}
            >
              <Complete />
            </SwiperSlide>
          </Swiper>
        </IonCardContent>
      </IonCard>
    </SignUpDataProvider>
  );
};
