// TODO: disable submit button after submitted

import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";
import { getFunctions, httpsCallable } from "firebase/functions";
import { I18nMessage } from "@/components/I18nMessage";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";
import { RadioCard } from "@/components/RadioCard";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import { useI18n } from "@/hooks/I18n";
import { useLanguage } from "@/hooks/Language";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useCardSlider } from "@/contexts/StrapiCardSlider";
import { useClassroom } from "@/hooks/Classroom";
import { useEffect, useState } from "react";
import { useStudent } from "@/hooks/Student";
import { useTimeTracker } from "@/hooks/TimeTracker";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./Feeling.scss";

import happy from "@/assets/img/feeling_happy.png";
import calm from "@/assets/img/feeling_calm.png";
import sad from "@/assets/img/feeling_sad.png";
import terrible from "@/assets/img/feeling_terrible.png";
import other from "@/assets/img/feeling_other.png";

import audio_happy_en from "@/assets/audio/FlowerCongrats/happy.mp3";
import audio_happy_es from "@/assets/audio/FlowerCongrats/feliz.mp3";
import audio_calm_en from "@/assets/audio/FlowerCongrats/calm.mp3";
import audio_calm_es from "@/assets/audio/FlowerCongrats/tranquile.mp3";
import audio_sad_en from "@/assets/audio/FlowerCongrats/sad.mp3";
import audio_sad_es from "@/assets/audio/FlowerCongrats/triste.mp3";
import audio_terrible_en from "@/assets/audio/FlowerCongrats/terrible.mp3";
import audio_terrible_es from "@/assets/audio/FlowerCongrats/fatal.mp3";
import audio_other_en from "@/assets/audio/FlowerCongrats/other.mp3";
import audio_other_es from "@/assets/audio/FlowerCongrats/otro.mp3";

const FeedbackSchema = z.object({
  response: z.string(),
});

const audios: Record<string, Record<string, string>> = {
  happy: {
    en: audio_happy_en,
    es: audio_happy_es,
  },
  calm: {
    en: audio_calm_en,
    es: audio_calm_es,
  },
  sad: {
    en: audio_sad_en,
    es: audio_sad_es,
  },
  terrible: {
    en: audio_terrible_en,
    es: audio_terrible_es,
  },
  other: {
    en: audio_other_en,
    es: audio_other_es,
  },
};

const FeelingCard: React.FC<{
  title: string;
  subTitle?: string;
  icon?: React.ReactNode;
  backgroundColor: string;
  onAudioPlay?: () => void;
}> = ({ title, subTitle, icon, backgroundColor, onAudioPlay }) => {
  return (
    <IonCard
      className="feeling-card ion-no-padding"
      style={{ backgroundColor }}
      onClick={onAudioPlay}
    >
      <div className="feeling-card-inner">
        {icon && <div className="icon-container">{icon}</div>}
        <IonCardContent>
          <IonText>
            <p className="title color-suelo text-2xl semibold">{title}</p>
            {subTitle && (
              <p className="sub-title color-english text-xl">{subTitle}</p>
            )}
          </IonText>
        </IonCardContent>
      </div>
    </IonCard>
  );
};

export const FeelingFeedback: React.FC = () => {
  const history = useHistory();
  const { language, populateText, filterText } = useLanguage();
  const { getText } = useI18n();
  const { addAudio, clearAudio } = useAudioManager();
  const { stopTimer, startTimer } = useTimeTracker();
  const { activity, cardClicks, isReady, packId, questions } = useCardSlider();
  const { id: studentId } = useStudent();
  const { info } = useClassroom();
  const [question, setQuestion] = useState<any>(null);
  const [questionId, setQuestionId] = useState<any>(null);
  const functions = getFunctions();
  const sendFeedbackFunction = httpsCallable(
    functions,
    "student-feedback-create",
  );

  useEffect(() => {
    if (isReady && question === null) {
      const filteredQuestions = questions.filter((q: any) => {
        return q.category === "feeling";
      });
      const randomQuestion =
        filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
      /*
      const randomQuestionText = filterText(randomQuestion.question).filter(
        (q: any) => q.audio,
      );
      */
      setQuestion(randomQuestion.question);
      setQuestionId(randomQuestion.uuid);
      addAudio(
        filterText(randomQuestion.question).map((q: any) => q.audio.url),
      );
    }
  }, [addAudio, isReady, questions]);

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
  });
  useEffect(() => {
    return () => {
      clearAudio();
    };
  }, []);

  const options: any[] = [
    {
      image: happy,
      audioKey: "happy",
      backgroundColor: "#FFE24F",
      i18nKey: "common.feeling.happy",
      value: "happy",
    },
    {
      image: calm,
      audioKey: "calm",
      backgroundColor: "#C3ECE2",
      i18nKey: "common.feeling.calm",
      value: "calm",
    },
    {
      image: sad,
      audioKey: "sad",
      backgroundColor: "#8FB8FA",
      i18nKey: "common.feeling.sad",
      value: "sad",
    },
    {
      image: terrible,
      audioKey: "terrible",
      backgroundColor: "#FF8B70",
      i18nKey: "common.feeling.terrible",
      value: "terrible",
    },
    {
      image: other,
      audioKey: "other",
      backgroundColor: "#F28AC9",
      i18nKey: "common.feeling.other",
      value: "other",
    },
  ];

  const generateOption = ({
    audioKey,
    backgroundColor,
    i18nKey,
    image,
    value,
  }: {
    audioKey: string;
    backgroundColor: string;
    i18nKey: string;
    image: any;
    value: string;
  }) => {
    return {
      component: (
        <IonCol size="2" className="ion-no-padding">
          <FeelingCard
            title={getText(i18nKey, 1, "authed") ?? ""}
            subTitle={getText(i18nKey, 2, "authed") ?? ""}
            icon={<img src={image} />}
            backgroundColor={backgroundColor}
            onAudioPlay={() => {
              const audio: string[] = language
                .split(".")
                .map((l: string) => audios[audioKey][l]);
              addAudio(audio);
            }}
          />
        </IonCol>
      ),
      value: value,
    };
  };

  const onSubmit = handleSubmit((data) => {
    sendFeedbackFunction({
      activity,
      activityId: packId,
      userId: studentId,
      timeSpent: Math.floor(stopTimer() ?? -1),
      category: "feeling",
      questionId,
      response: data.response,
      language: language,
      classroomId: info ? info.id : null,
    });
    startTimer();
    history.push(`/${activity}/congrats`);
  });

  if (question === null) {
    return <></>;
  }

  const filteredQuestion = filterText(question);

  return (
    <div className="responsive-height-with-header flex ion-justify-content-center ion-align-items-center">
      <IonGrid style={{ "--ion-grid-columns": 10 }}>
        <IonRow>
          <IonCol className="ion-hide-lg-down" size-lg="1"></IonCol>
          <IonCol>
            <IonCard className="drop-shadow" style={{ textAlign: "center" }}>
              <form action="" id="feedback_feelings_form">
                <IonText className="ion-text-start">
                  <h2 className="text-3xl semibold color-suelo padding-left-2">
                    {filteredQuestion[0].text}
                  </h2>
                  {filteredQuestion.length === 2 && (
                    <p className="text-3xl color-grey padding-left-2">
                      {filteredQuestion[1].text}
                    </p>
                  )}
                </IonText>
                <ExtendedRadio
                  control={control}
                  name="response"
                  displayCardsInRow={true}
                  isMaxWidthNeeded={true}
                  maxWidth="14.5rem"
                  options={options.map(generateOption)}
                />

                <IonButton
                  data-testid="addclassroom-notification-method-continue-button"
                  disabled={!isValid}
                  shape="round"
                  type="button"
                  onClick={onSubmit}
                >
                  <IonText className=" padding-right-5 padding-left-5">
                    <h2 className="text-3xl semibold color-base">
                      <I18nMessage id="common.next" />
                    </h2>

                    <I18nMessage
                      id="common.next"
                      level={2}
                      wrapper={(text: string) => (
                        <p className="text-sm color-base">{text}</p>
                      )}
                    />
                  </IonText>
                </IonButton>
              </form>
            </IonCard>
          </IonCol>
          <IonCol className="ion-hide-lg-down" size-lg="1"></IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
