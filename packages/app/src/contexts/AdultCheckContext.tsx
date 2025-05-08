import { useOldProfile } from "@/hooks/OldProfile";
import { useLanguage } from "@/hooks/Language";
import { I18nWrapper } from "@/components/I18nWrapper";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  useIonModal,
} from "@ionic/react";
import { Input } from "@/components/Input";
import { useStudent } from "@/hooks/Student";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type PassedAdultCheck = boolean | null;

export type AdultCheck = {
  passedAdultCheck: PassedAdultCheck;
  setPassedAdultCheck: Dispatch<SetStateAction<PassedAdultCheck>>;
  showAdultCheck: any;
};

const AdultCheckContext = createContext<AdultCheck>({} as AdultCheck);

export const useAdultCheck = () => useContext(AdultCheckContext);

export const AdultCheckProvider = ({ children }: PropsWithChildren<{}>) => {
  const [passedAdultCheck, setPassedAdultCheck] =
    useState<PassedAdultCheck>(null);
  const { id: studentId } = useStudent();
  const history = useHistory();
  const { profile } = useOldProfile();
  const [present, dismiss] = useIonModal(AdultCheckModalWrapper, {
    dismiss: (correct: boolean) => {
      if (correct) {
        // do nothing since user is already in protected area
      } else {
        history.replace("/student-dashboard");
        /*
	if(studentId){
          history.replace("/student-dashboard");
	}else{
	  // TODO: figure out
          history.replace("/student-select/123");
	  dismiss();
	}
	*/
      }
      dismiss();
    },
  });
  const [adultCheckVisible, setAdultCheckVisible] = useState<boolean>(false);
  const showAdultCheck = useCallback(() => {
    const a = present({
      backdropDismiss: false,
    });
    /*
    setAdultCheckVisible(true);
    */
  }, [setAdultCheckVisible]);
  return (
    <AdultCheckContext.Provider
      value={{
        passedAdultCheck,
        setPassedAdultCheck,
        showAdultCheck,
      }}
    >
      {children}
    </AdultCheckContext.Provider>
  );
};

const AdultCheckModalWrapper: React.FC<any> = ({ dismiss }) => {
  const { language } = useLanguage();
  // TODO: better typing
  return (
    <I18nWrapper locale={language.slice(0, 2) as "en" | "es" | undefined}>
      <AdultCheckModal dismiss={dismiss} />
    </I18nWrapper>
  );
};

const AdultCheckModal: React.FC<any> = ({ dismiss }) => {
  const [equation, setEquation] = useState<number[]>([1, 2, 3]);

  useEffect(() => {
    const number_1 = Math.floor(Math.random() * 90) + 10;
    const number_2 = Math.floor(Math.random() * 90) + 10;
    const answer = number_1 + number_2;
    setEquation([number_1, number_2, answer]);
  }, []);
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
    // TODO: if user presses continue without changing form, no error message appears
    if (
      parseInt(data.answer || "") === equation[2] ||
      data.answer === "debug"
    ) {
      dismiss(true);
    } else {
      setError("answer", {
        type: "custom",
        message: intl.formatMessage({
          id: "settings.adult_check.wrong_answer",
        }),
      });
    }
  });
  return (
    <IonPage>
      <IonContent>
        <div className="ion-padding">
          <IonText class="ion-text-center">
            <p className="text-2xl semibold">
              <FormattedMessage id="settings.adult_check.prompt" />
            </p>
            <p className="text-xl">
              {equation[0]} + {equation[1]} = ?
            </p>
          </IonText>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Input
              label={intl.formatMessage({ id: "settings.adult_check.answer" })}
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
                      dismiss(false);
                    }}
                  >
                    <FormattedMessage id="common.go_back" />
                  </IonButton>
                </IonCol>
                <IonCol className="ion-text-right">
                  <IonButton onClick={onSubmit}>
                    <FormattedMessage id="common.continue" />
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};
