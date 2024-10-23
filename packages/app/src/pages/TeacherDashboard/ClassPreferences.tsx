import "./ClassPreferences.css";
import { FormattedMessage, useIntl } from "react-intl";
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
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import {
  MultipleCheckbox,
  MultipleCheckboxOption,
} from "@/components/MultipleCheckbox";
import { useForm, useWatch } from "react-hook-form";
import { Input } from "@/components/Input";
import { useClassroom } from "@/hooks/Classroom";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { useEffect } from "react";
import { useParams } from "react-router";

const OptionWrapper = ({ children }: { children: JSX.Element }) => {
  return <IonCol size="4">{children}</IonCol>;
};

export const ClassPreferences: React.FC = () => {
  const { classroomId } = useParams<{ classroomId: string }>();

  const { control, getValues } = useForm({
    defaultValues: {
      grades: [],
      //TODO: load default values from classroom
      name: "",
    },
  });

  //TODO: create functions for all fields

  // Watch for changes to the name and grades
  //const watchedName = useWatch({ control, name: "name" });
  // const watchedGrades = useWatch({ control, name: "grades" });

  // Update grades function
  const updateGrades = async (key: string, value: any) => {
    //  const ref = doc(firestore, "classrooms", classroomId);
    //  try {
    //      await updateDoc(ref, { [key]: value });
    //      console.log(`Grades updated in Firestore: ${key} =`, value);
    //  } catch (error) {
    //      console.error("Error updating grades:", error);
    //  }
  };

  // Update name function
  const updateName = async (newName: string) => {
    //  const ref = doc(firestore, "classrooms", classroomId);
    //  try {
    //      await updateDoc(ref, { name: newName });
    //      console.log("Class name saved to Firestore:", newName);
    //  } catch (error) {
    //      console.error("Error updating class name:", error);
    //  }
  };

  // useEffect(() => {
  //   if (watchedName) {
  //     console.log("Auto-saving class name:", watchedName);
  //     updateName(watchedName); // Auto-save class name when it changes
  //   }
  // }, [watchedName]);

  // useEffect(() => {
  //   if (watchedGrades) {
  //     console.log("Auto-saving grades:", watchedGrades);
  //     updateGrades("grades", watchedGrades); // Auto-save grades when they change
  //   }
  // }, [watchedGrades]);

  return (
    <FirestoreDocProvider collection="classroom" id={classroomId}>
      <ClassPreferencesLoader
        control={control}
        updateGrades={updateGrades}
        updateName={updateName}
      />
    </FirestoreDocProvider>
  );
};

const ClassPreferencesLoader: React.FC<any> = ({ control }) => {
  const { data, status } = useFirestoreDoc();
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

  // Firestore document status
  switch (status) {
    case "loading":
      return <IonText>Loading...</IonText>;
    case "error":
      return <IonText>Error loading classroom data</IonText>;
    case "ready":
      const { name = "Classroom" } = data;

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
                        {name}
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

            <div className="classroom-input-styles">
              <Input
                label="Class Name"
                labelPlacement="above"
                placeholder={name}
                name="name"
                fill="outline"
                control={control}
                testId="teacher-class-name-update"
                type="text"
                className="classroom-name-input"
                onBlur={console.log}
              />
            </div>

            <IonItem lines="none">
              <div className="grades-block">
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
                    <IonRow className="ion-justify-content-around">
                      <MultipleCheckbox
                        control={control}
                        labelPlacement="end"
                        justify="start"
                        options={gradesOptions}
                        name="grades"
                        onChange={console.log}
                        wrapper={OptionWrapper}
                      />
                    </IonRow>
                  </IonGrid>
                </div>
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
              <IonSelect // needs to use Select so we can have a default value
                placeholder="Bilingual"
                interface="popover"
                toggleIcon={chevronForward}
                value={""}
                onIonChange={(event) => {
                  console.log();
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
                <IonSelectOption value={"esen"}>Bilingual</IonSelectOption>
                <IonSelectOption value={"es"}>Spanish</IonSelectOption>
                <IonSelectOption value={"en"}>English</IonSelectOption>
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
                  console.log();
                }}
                checked={true}
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
    default:
      return null;
  }
};
