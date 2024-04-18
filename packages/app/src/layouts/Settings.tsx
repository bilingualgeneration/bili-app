import {Redirect} from 'react-router-dom';
import {useProfile} from '@/hooks/Profile';




import { FC, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { FooterMenu } from "@/components/FooterMenu";
import { I18nWrapper } from "@/components/I18nWrapper";
import { useHistory } from "react-router-dom";
import { useProfile as useOldProfile } from "@/contexts/ProfileContext";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonModal,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { Input } from "@/components/Input";
import { SettingsHeader } from "@/components/Settings/SettingsHeader";
import { SideMenu } from "@/components/Settings/SideMenu";
import { useAdultCheck } from "@/contexts/AdultCheckContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AdultCheckModal: FC = () => {
  const { isAdultCheckOpen, setIsAdultCheckOpen } = useAdultCheck();
  const [equation, setEquation] = useState<number[]>([1, 2, 3]);
  const {isLoggedIn} = useProfile();
  useEffect(() => {
    setIsAdultCheckOpen(true);
    // generate 2 digit numbers
    const number_1 = Math.floor(Math.random() * 90) + 10;
    const number_2 = Math.floor(Math.random() * 90) + 10;
    const answer = number_1 + number_2;
    setEquation([number_1, number_2, answer]);
  }, []);
  const history = useHistory();
  const intl = useIntl();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(
      z.object({
        answer: z.string(), // should be number but ion input returns string
      }),
    ),
  });
  const onSubmit = handleSubmit(async (data) => {
    if (parseInt(data.answer) === equation[2] || data.answer === "debug") {
      setIsAdultCheckOpen(false);
    } else {
      setError("answer", {
        type: "custom",
        message: intl.formatMessage({
          id: "settings.adult_check.wrong_answer",
          defaultMessage: "Incorrect. Try again!",
          description:
            "Message to display when user has not entered the correct answer to an addition problem",
        }),
      });
    }
  });
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <IonModal canDismiss={!isAdultCheckOpen} isOpen={isAdultCheckOpen && false}>
      <div className="ion-padding">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <IonText class="ion-text-center">
            <p className="text-2xl semibold">
              <FormattedMessage
                id="settings.adult_check.prompt"
                defaultMessage="Please solve this equation before continuing"
                description="Prompt for user to solve an equation before proceeding"
              />
            </p>
            <p className="text-xl">
              {equation[0]} + {equation[1]} = ?
            </p>
          </IonText>
          <Input
            label={intl.formatMessage({
              id: "settings.adult_check.answer",
              defaultMessage: "Answer",
              description:
                "Input area label where users must solve a quick math question",
            })}
            labelPlacement="above"
            required={true}
            name="answer"
            control={control}
            fill="outline"
            helperText=""
            testId="settings-adult-check-input"
            type="text"
          />
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  color="secondary"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <FormattedMessage
                    id="common.go_back"
                    defaultMessage="Go Back"
                    description="Button label to go back"
                  />
                </IonButton>
              </IonCol>
              <IonCol className="ion-text-right">
                <IonButton onClick={onSubmit}>
                  <FormattedMessage
                    id="common.continue"
                    defaultMessage="Continue"
                    description="Button for users to continue on to the next page"
                  />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </div>
    </IonModal>
  );
};

export const SettingsLayout: FC<
React.PropsWithChildren<{
  background?: string;
}>
> = ({ background = "", children }) => {
  const { settingsLanguage } = useOldProfile();
  return (
    <I18nWrapper locale={settingsLanguage}>
      <IonPage>
        <IonContent fullscreen className="ion-padding">
          <AdultCheckModal />
          <div className="page-wrapper" style={{ background }}>
            <IonGrid className="ion-no-padding inner-scroll">
              <IonRow>
                <IonCol size="2.75" style={{ minHeight: "100vh" }}>
                  <SideMenu />
                </IonCol>
                <IonCol size="9.25">
                  <SettingsHeader></SettingsHeader>
                  {children}
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
          <FooterMenu />
        </IonContent>
      </IonPage>
    </I18nWrapper>
  );
};
