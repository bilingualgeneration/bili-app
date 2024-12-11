import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";
import { I18nMessage } from "@/components/I18nMessage";
import { RadioCard } from "@/components/RadioCard";
import { IonButton, IonCard, IonText } from "@ionic/react";
import HappyBilli from "@/assets/icons/bili_happy.svg";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import "./Community.scss";
import { useI18n } from "@/hooks/I18n";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/Language";

const questions = [
  {
    es: "Me gusta ir a la escuela todos los días.",
    en: "I like going to school every day.",
  },
  {
    es: "Sé pedir ayuda.",
    en: "I know how to ask for help.",
  },
  {
    es: "Puedo hacer cosas difíciles o desafiantes.",
    en: "I can do hard or challenging things.",
  },
  {
    es: "Me gusta como soy.",
    en: "I like the way I am.",
  },
];

const getNextQuestionIndex = (currentIndex: number, total: number): number => {
  return (currentIndex + 1) % total;
};

export const ThoughtsFeedback: React.FC = () => {
  const { language } = useLanguage();
  const history = useHistory();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { getText } = useI18n();
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm();
  const yesOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          title={getText("common.yes", 1, "authed")}
          subTitle={getText("common.yes", 2, "authed")}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#FFF"
          maxHeight="5.25rem"
          className="padding-left-9 padding-right-9"
        />
      </div>
    ),
    value: "yes",
  };

  const noOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          title={getText("common.no", 1, "authed")}
          subTitle={getText("common.no", 2, "authed")}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#FFF"
          maxHeight="5.25rem"
          className="padding-left-9 padding-right-9"
        />
      </div>
    ),
    value: "no",
  };
  const otherOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          title={getText("common.dontKnow", 1, "authed")}
          subTitle={getText("common.dontKnow", 2, "authed")}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#FFF"
          maxHeight="5.25rem"
          className="padding-left-7 padding-right-7"
        />
      </div>
    ),
    value: "other",
  };

  //   TEMPORARY SOLUTION FOR HARDCODED QUESTIONS!!!

  useEffect(() => {
    const savedIndex = parseInt(
      localStorage.getItem("currentQuestionIndex") || "0",
      10,
    );
    setCurrentQuestionIndex(savedIndex);
  }, []);

  const handleNextQuestion = () => {
    // Update to the next question and save to local storage
    const nextIndex = getNextQuestionIndex(
      currentQuestionIndex,
      questions.length,
    );
    setCurrentQuestionIndex(nextIndex);
    localStorage.setItem("currentQuestionIndex", nextIndex.toString());
  };

  const onSubmit = handleSubmit((data) => {
    handleNextQuestion();
    history.push("/community/congrats");
  });

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <IonCard
        style={{ textAlign: "center" }}
        className="thoughts-questions-card"
      >
        <form action="">
          <IonText className="ion-text-start">
            <h2 className="text-3xl semibold color-suelo padding-left-4">
              <I18nMessage id="common.whatYouThink" />
            </h2>
            <I18nMessage
              id="common.whatYouThink"
              level={2}
              wrapper={(text: string) => (
                <p className="text-3xl color-grey padding-left-4">{text}</p>
              )}
            />
          </IonText>
          <IonCard
            style={{ background: "#D6D3F0" }}
            className="padding-vertical-5 margin-left-4 margin-right-4"
          >
            <IonText>
              <h1 className="text-3xl semibold color-suelo">
                {language === "en" ? currentQuestion.en : currentQuestion.es}
              </h1>
              {(language === "es.en" || language === "en.es") && (
                <p className="text-2xl color-grey">{currentQuestion.en}</p>
              )}
            </IonText>
          </IonCard>
          <ExtendedRadio
            control={control}
            name="feelingsFeedback"
            displayCardsInRow={true}
            isMaxWidthNeeded={true}
            maxWidth="25rem"
            options={[yesOption, noOption, otherOption]}
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
    </>
  );
};
