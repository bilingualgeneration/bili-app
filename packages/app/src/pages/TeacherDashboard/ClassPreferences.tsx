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
import { chevronForward, language } from "ionicons/icons";
import Question from "@/assets/icons/question.svg?react";
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import {
  MultipleCheckbox,
  MultipleCheckboxOption,
} from "@/components/MultipleCheckbox";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { useClassroom } from "@/hooks/Classroom";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Select, SelectOption } from "@/components/Select";
import { Toggle } from "@/components/Toggle";

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
      language: "imme",
      languageToggle: false, // Default value for language toggle
      inclusiveToggle: false, // Default value for inclusive toggle
    },
  });

  //TODO: create functions for all fields

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
      label: "Pre-K",
      value: "p",
    },
    {
      label: "Kindergarten",
      value: "k",
    },
    {
      label: "1st Grade",
      value: "1",
    },
    {
      label: "2nd Grade",
      value: "2",
    },
    {
      label: "3rd Grade",
      value: "3",
    },
    {
      label: "Other",
      value: "o",
    },
  ];

  const languageOptions: SelectOption[] = [
    { value: "bili", label: "Bilingual" },
    { value: "imme", label: "Immersion" },
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
                    <h2 className="text-2xl semibold color-suelo">
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

            <IonItem lines="none" className="select-language-block-student">
              <Popover
                content="Choose the language mode for your student’s experience in the app. ‘Bilingual’ means your student will see the content in English and Spanish. 
                ‘Immersion’ means your student will only see the content in Spanish."
                trigger="click-trigger2"
              />
              <Question id="click-trigger2" />

              <Select
                control={control}
                name="language"
                placeholder="Bilingual"
                interface="popover"
                options={languageOptions}
                toggleIcon={chevronForward}
                label={"Student language"}
              />
            </IonItem>

            <IonItem lines="none" className="language-toggle-block-student">
              <Popover
                content="Enable the Language Toggle button to allow your student to change the app language while they play. 
                Disable to lock the app language (see ‘Student Language’)."
                trigger="click-trigger3"
              />
              <Question id="click-trigger3" />
              <Toggle
                control={control}
                name="language-toggle"
                label="Language Toggle"
                color="primary"
                justify="space-between"
                checked={true}
                mode="ios"
                onChange={(checked) => {
                  console.log("Language Toggle toggle changed:", checked);
                }}
              />
            </IonItem>

            <IonItem lines="none" className="inclusive-toggle-block-student">
              <Popover
                content="Choose inclusive Spanish to see gender-neutral terms like 'amigues,' 'niñes,' and 'Latine' when referring to groups or non-binary characters. 
                Disable this feature if you do not want to see these terms."
                trigger="click-trigger4"
              />
              <Question id="click-trigger4" />
              <Toggle
                control={control}
                name="inclusive-toggle"
                label="Inclusive Spanish"
                color="primary"
                justify="space-between"
                checked={true}
                mode="ios"
                onChange={(checked) => {
                  console.log("Inclusive Spanish toggle changed:", checked);
                }}
              />
            </IonItem>
          </IonList>
        </>
      );
    default:
      return null;
  }
};
