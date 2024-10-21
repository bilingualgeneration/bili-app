import { doc, updateDoc } from "firebase/firestore";
import "./ClassPreferences.css";
import { FormattedMessage, useIntl } from "react-intl";
import { firestore } from "@/components/Firebase";
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToggle,
} from "@ionic/react";
import { Popover } from "@/components/Popover";
import { chevronForward } from "ionicons/icons";
import Question from "@/assets/icons/question.svg?react";
import { useProfile } from "@/hooks/Profile";
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import {
  MultipleCheckbox,
  MultipleCheckboxOption,
} from "@/components/MultipleCheckbox";
import { useForm } from "react-hook-form";
import { string } from "zod";

const OptionWrapper = ({ children }: { children: JSX.Element }) => {
  return <IonCol size="4">{children}</IonCol>;
};

export const ClassPreferences: React.FC = () => {
  const intl = useIntl();
  const gradesOptions: MultipleCheckboxOption[] = [
    {
      label: intl.formatMessage({
        id: "signUpTeacher.aboutGradePre",
        defaultMessage: "Pre-K",
        description: "Checkbox label for pre-kindergarten",
      }),
      value: "prek",
    },
    {
      label: intl.formatMessage({
        id: "signUpTeacher.aboutGrade1",
        defaultMessage: "1st Grade",
        description: "Checkbox label for 1st grade",
      }),
      value: "1st",
    },
    {
      label: intl.formatMessage({
        id: "signUpTeacher.aboutGrade2",
        defaultMessage: "2nd Grade",
        description: "Checkbox label for 2nd grade",
      }),
      value: "2nd",
    },
    {
      label: intl.formatMessage({
        id: "signUpTeacher.aboutGrade3",
        defaultMessage: "3rd Grade",
        description: "Checkbox label for 3rd grade",
      }),
      value: "3rd",
    },
    {
      label: intl.formatMessage({
        id: "signUpTeacher.aboutGrade4",
        defaultMessage: "4th Grade",
        description: "Checkbox label for 4th grade",
      }),
      value: "4th",
    },
    {
      label: intl.formatMessage({
        id: "signUpTeacher.aboutOther",
        defaultMessage: "Other",
        description: "Checkbox label for any other grades taught",
      }),
      value: "other",
    },
  ];
  const { control, getValues } = useForm({
    defaultValues: {
      grades: [],
    },
  });
  const {
    user: { uid },
    profile: { isImmersive, isInclusive, settingsLanguage },
  } = useProfile();
  //TODO: update updateProfile function
  const ref = doc(firestore, "users", uid);
  // TODO: we shouldn't allow this straight from the app
  const updateProfile = (key: string, value: any) => {
    updateDoc(ref, {
      [key]: value,
    });
  };

  return (
    <>
      <IonList className="preferences-style">
        {/* header */}
        <div className="class-progress-header">
          <IonItem>
            <IonLabel>
              <div className="header-overview-row">
                <div className="header-overview-arrow">
                  <IonText className="text-sm color-barro classroom-name-text">
                    {"1-st grade Spanish"}
                  </IonText>
                  <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                  <IonText className="text-sm semibold overview-text-header">
                    Preferences
                  </IonText>
                </div>
                <div className="progress-header-block">
                  <IonText className="text-3xl semibold">
                    {"Preferences"}
                  </IonText>
                </div>
              </div>
            </IonLabel>
          </IonItem>
        </div>
        {/* main */}

        <IonItem lines="none">
          <Popover
            content={intl.formatMessage({
              id: "settingsProgress.preferences.popover1",
              defaultMessage:
                "Choose the language you will see in settings. This should be based on your language preferences as an adult.",
              description:
                "Description of the language you will see in settings.",
            })}
            trigger="click-trigger1"
          />
          <Question id="click-trigger1" />
        </IonItem>

        <IonItem lines="none">
          <Popover
            content={intl.formatMessage({
              id: "settingsProgress.preferences.popover1",
              defaultMessage:
                "Choose the language you will see in settings. This should be based on your language preferences as an adult.",
              description:
                "Description of the language you will see in settings.",
            })}
            trigger="click-trigger1"
          />
          <Question id="click-trigger1" />
          <div className="margin-bottom-1x">
            <IonText>
              <h2 className="text-xl semibold color-suelo">
                <FormattedMessage
                  id="settingsProgress.preferences.grades"
                  defaultMessage="Grades"
                />
              </h2>
            </IonText>
          </div>
          <div className="text-md color-suelo grades-styles">
            <IonGrid>
              <IonRow>
                <MultipleCheckbox
                  control={control}
                  labelPlacement="end"
                  options={gradesOptions}
                  name="grades"
                  // onChange={() => {
                  //     updateProfile("grades", getValues('grades'));

                  // }}
                  onChange={console.log}
                  wrapper={OptionWrapper}
                />
              </IonRow>
            </IonGrid>
          </div>
        </IonItem>

        <IonItem lines="none">
          <Popover
            content={intl.formatMessage({
              id: "settingsProgress.preferences.popover2",
              defaultMessage:
                "Choose the language mode for your child's experience in the app. 'Bilingual' means your child will see the content in English and Spanish. 'Immersion' means your child will only see the content in Spanish.",
              description:
                "Description of the language mode for your child's experience in the app",
            })}
            trigger="click-trigger2"
          />
          <Question id="click-trigger2" />
          <IonSelect
            placeholder="Bilingual"
            interface="popover"
            toggleIcon={chevronForward}
            value={""}
            onIonChange={(event) => {
              updateProfile("", event.target.value);
            }}
          >
            <div className="label-style" slot="label">
              <h4>
                <FormattedMessage
                  id="settingsProgress.preferences.bilingual"
                  defaultMessage="Student Language"
                />
              </h4>
            </div>
            <IonSelectOption value={false}>Bilingual</IonSelectOption>
            <IonSelectOption value={true}>Spanish</IonSelectOption>
            <IonSelectOption value={true}>English</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem lines="none">
          <Popover
            content={intl.formatMessage({
              id: "settingsProgress.preferences.popover5",
              defaultMessage:
                "Enable this feature to hear sound effects associated with the app.",
              description: "Sound effects mode",
            })}
            trigger="click-trigger5"
          />
          <Question id="click-trigger5" />
          <IonToggle justify="space-between" checked={true} mode="ios">
            <div className="label-style">
              <h4>
                <FormattedMessage
                  id="settingsProgress.preferences.toggle"
                  defaultMessage="Language Toggle"
                />
              </h4>
            </div>
          </IonToggle>
        </IonItem>

        <IonItem lines="none">
          <Popover
            content={intl.formatMessage({
              id: "settingsProgress.preferences.popover3",
              defaultMessage:
                "Choose inclusive Spanish to opt for terms like 'amigues,' 'niñes,' and 'Latine' to personalize your experience when referring to groups or non-binary characters. Disable this feature if you do not want to see these terms.",
              description:
                "Description of the inclusive language mode with gender neutral pronouns",
            })}
            trigger="click-trigger3"
          />
          <Question id="click-trigger3" />
          <IonToggle
            justify="space-between"
            onClick={() => {
              updateProfile("isInclusive", !isInclusive);
            }}
            checked={isInclusive}
            mode="ios"
          >
            <div className="label-style">
              <h4>
                <FormattedMessage
                  id="settingsProgress.preferences.inclusive"
                  defaultMessage="Inclusive Spanish"
                  description="Preferences page 'Inclusive Spanish' text"
                />
              </h4>
            </div>
          </IonToggle>
        </IonItem>
      </IonList>
    </>
  );
};
