import { getFunctions, httpsCallable } from "firebase/functions";
import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";
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
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useCardSlider } from "@/contexts/CardSlider";
import { useClassroom } from "@/hooks/Classroom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useI18n } from "@/hooks/I18n";
import { useLanguage } from "@/hooks/Language";
import { useStudent } from "@/hooks/Student";
import { useTimeTracker } from "@/hooks/TimeTracker";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./Opinion.scss";

import happy from "@/assets/img/feeling_happy.png";
import calm from "@/assets/img/feeling_calm.png";
import sad from "@/assets/img/feeling_sad.png";
import terrible from "@/assets/img/feeling_terrible.png";
import other from "@/assets/img/feeling_other.png";

import audio_no_en from "@/assets/audio/FlowerCongrats/no_en.mp3";
import audio_yes_en from "@/assets/audio/FlowerCongrats/yes.mp3";
import audio_no_es from "@/assets/audio/FlowerCongrats/no_es.mp3";
import audio_yes_es from "@/assets/audio/FlowerCongrats/sí.mp3";
import audio_idk_en from "@/assets/audio/FlowerCongrats/idk.mp3";
import audio_idk_es from "@/assets/audio/FlowerCongrats/no_lo_sé.mp3";
import questionAudioEn from "@/assets/audio/FlowerCongrats/what_do_you_think_en.mp3";
import questionAudioEs from "@/assets/audio/FlowerCongrats/what_do_you_think_es.mp3";

const questionAudios: any = {
  en: questionAudioEn,
  es: questionAudioEs,
};

const audios: Record<string, Record<string, string>> = {
  yes: {
    en: audio_yes_en,
    es: audio_yes_es,
  },
  no: {
    en: audio_no_en,
    es: audio_no_es,
  },
  other: {
    en: audio_idk_en,
    es: audio_idk_es,
  },
};

const FeedbackSchema = z.object({
  response: z.string(),
});

export const OpinionFeedback: React.FC = () => {
  const history = useHistory();
  const { addAudio, clearAudio } = useAudioManager();
  const { activity, cardClicks, isReady, packId, questions } = useCardSlider();
  const { info } = useClassroom();
  const { language, filterText } = useLanguage();
  const { stopTimer, startTimer } = useTimeTracker();
  const { getText } = useI18n();
  const { id: studentId } = useStudent();
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
        return q.category === "opinion";
      });
      const randomQuestion =
        filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];

      const randomQuestionText = filterText(randomQuestion.question).filter(
        (q: any) => q.audio,
      );
      setQuestion(randomQuestion);
      setQuestionId(randomQuestion.uuid);
      let audios: string[] = language
        .split(".")
        .map((l: string) => questionAudios[l]);
      addAudio(audios.concat(randomQuestionText.map((q: any) => q.audio.url)));
    }
  }, [addAudio, isReady, questions, language, questionAudios]);

  useEffect(() => {
    return () => {
      clearAudio();
    };
  }, []);

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
  });

  const onSubmit = handleSubmit((data) => {
    sendFeedbackFunction({
      activity,
      activityId: packId,
      userId: studentId,
      timeSpent: Math.floor(stopTimer() ?? -1),
      category: "opinion",
      questionId,
      response: data.response,
      language: language,
      classroomId: info ? info.id : null,
    });
    startTimer();
    history.push(`/${activity}/congrats`);
  });

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
        <IonCol size="4">
          <RadioCard
            title={getText(i18nKey, 1, "authed")}
            subTitle={getText(i18nKey, 2, "authed")}
            titleColor="color-suelo"
            subTitleColor="color-grey"
            subTitleFontSize="lg"
            icon={<img src={image} />}
            iconBackgroundColor="transparent"
            flexDirectionColumn={true}
            isJustPicture={false}
            isTextCentered={true}
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

  const options = [
    {
      audioKey: "yes",
      backgroundColor: "rgba(34, 190, 185, 1)",
      i18nKey: "common.yes",
      image: happy,
      value: "yes",
    },
    {
      audioKey: "no",
      backgroundColor: "rgba(255, 87, 8, 1)",
      i18nKey: "common.no",
      image: sad,
      value: "no",
    },
    {
      audioKey: "other",
      backgroundColor: "rgba(223, 211, 187, 1)",
      i18nKey: "common.dontKnow",
      image: terrible,
      value: "other",
    },
  ];

  // TODO: replace with loader
  if (question === null) {
    return <></>;
  }

  const filteredQuestion = filterText(question.question);
  return (
    <div id="feedback-opinion-wrapper" className="margin-top-2">
      <IonText className="ion-text-start">
        <h2 className="text-3xl semibold color-suelo padding-left-2">
          <I18nMessage id="common.whatYouThink" />
        </h2>
        <I18nMessage
          id="common.whatYouThink"
          level={2}
          wrapper={(text: string) => (
            <p className="text-2xl color-grey padding-left-2">{text}</p>
          )}
        />
      </IonText>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonCard id="feedback-opinion-instructions-card">
              <IonCardContent>
                <IonText>
                  <h1 className="text-2xl semibold color-suelo">
                    {filteredQuestion[0].text}
                  </h1>
                  {filteredQuestion.length === 2 && (
                    <p className="text-lg color-english">
                      {filteredQuestion[1].text}
                    </p>
                  )}
                </IonText>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="6">
            <ExtendedRadio
              control={control}
              name="response"
              displayCardsInRow={true}
              isMaxWidthNeeded={false}
              maxWidth="25rem"
              options={options.map(generateOption)}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
      <div className="ion-text-center margin-top-2">
        <IonButton
          disabled={!isValid}
          shape="round"
          type="button"
          onClick={onSubmit}
        >
          <IonText>
            <h2 className="text-3xl semibold color-base padding-right-5 padding-left-5">
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
      </div>
    </div>
  );
};
