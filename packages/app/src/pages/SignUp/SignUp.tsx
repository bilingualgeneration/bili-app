import {
  IonButton,
  IonCard,
  IonCardContent,
  IonProgressBar,
} from "@ionic/react";
import React, { useState } from "react";
import {
  Complete,
  RoleSelect,
  LanguageInclusivitySelect,
  LanguageModeSelect,
  ParentAccountCredentials,
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
            <SwiperSlide
              className="ion-padding-top"
              data-testid="role-select-slide"
              data-progress-percent={0.2}
            >
              <RoleSelect teacherSlide={2} parentSlide={1} />
            </SwiperSlide>
            <SwiperSlide
              className="ion-padding-top"
              data-testid="parent-account-credentials-slide"
              data-progress-percent={0.4}
            >
              <ParentAccountCredentials nextSlide={4} previousSlide={0} />
            </SwiperSlide>
            <SwiperSlide
              className="ion-padding-top"
              data-testid="teacher-account-credentials-slide"
              data-progress-percent={0.4}
            >
              <TeacherAccountCredentials previousSlide={0} />
            </SwiperSlide>
            <SwiperSlide
              className="ion-padding-top"
              data-testid="role-select-slide"
              data-progress-percent={0.5}
            >
              <TeacherAbout nextSlide={4} />
            </SwiperSlide>

            <SwiperSlide
              className="ion-padding-top"
              data-testid="language-mode-slide"
              data-progress-percent={0.6}
            >
              <LanguageModeSelect />
            </SwiperSlide>
            <SwiperSlide
              className="ion-padding-top"
              data-testid="language-inclusivity-slide"
              data-progress-percent={0.8}
            >
              <LanguageInclusivitySelect />
            </SwiperSlide>
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
