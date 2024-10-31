// TODO: remove dependency on firestoredoc
// TODO: update Classroom context to pull ALL info

import "./ClassPreferences.css";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/components/Firebase";
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
  return (
    <FirestoreDocProvider collection="classroom" id={classroomId}>
      <ClassPreferencesLoader />
    </FirestoreDocProvider>
  );
};

const ClassPreferencesLoader: React.FC = () => {
  const { status } = useFirestoreDoc();
  // Firestore document status
  switch (status) {
    case "loading":
      return <IonText>Loading...</IonText>;
    case "error":
      return <IonText>Error loading classroom data</IonText>;
    case "ready":
      return <ClassPreferencesHydrated />;
    default:
      return null;
  }
};

const ClassPreferencesHydrated: React.FC = () => {
  const { data } = useFirestoreDoc();
  const intl = useIntl();
  const { control, getValues } = useForm({
    defaultValues: {
      grades: data.grades,
      //TODO: load default values from classroom
      name: data.name,
      language: "imme",
      allowLanguageToggle: data.allowLanguageToggle,
      isInclusive: data.isInclusive, // Default value for inclusive toggle
    },
  });

  const ref = doc(firestore, "classroom", data.id);
  const update = async (key: string, value: any) => {
    updateDoc(ref, {
      [key]: value,
    });
  };

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
                    {data.name}
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
            onBlur={(newName) => {
              update("name", newName);
            }}
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
                    defaultValue={data.grades}
                    labelPlacement="end"
                    justify="start"
                    options={gradesOptions}
                    name="grades"
                    onChange={(values) => {
                      update("grades", values);
                    }}
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
            name="allowLanguageToggle"
            label="Language Toggle"
            color="primary"
            justify="space-between"
            checked={true}
            mode="ios"
            onChange={(checked) => {
              update("allowLanguageToggle", checked);
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
            name="isInclusive"
            label="Inclusive Spanish"
            color="primary"
            justify="space-between"
            checked={true}
            mode="ios"
            onChange={(checked) => {
              update("isInclusive", checked);
            }}
          />
        </IonItem>
      </IonList>
    </>
  );
};
