// TODO: update Classroom context to pull ALL info

import "./ClassPreferences.scss";
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
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Select, SelectOption } from "@/components/Select";
import { Toggle } from "@/components/Toggle";

const OptionWrapper = ({ children }: { children: JSX.Element }) => {
  return <IonCol size="4">{children}</IonCol>;
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

const languageOptions: MultipleCheckboxOption[] = [
  {
    label: "Spanish Immersion",
    value: "es",
  },
  {
    label: "English Immersion",
    value: "en",
  },
  {
    label: "Bilingual",
    value: "es.en",
  },
];

export const ClassPreferences: React.FC = () => {
  const { info } = useClassroom();
  const [allowedLanguagesTrigger, setAllowedLanguagesTrigger] = useState<
    string[]
  >(info.allowedLanguages);
  const intl = useIntl();
  const { control, getValues, setValue, watch } = useForm({
    defaultValues: {
      grades: info.grades,
      name: info.name,
      allowedLanguages: info.allowedLanguages,
      allowLanguageToggle: info.allowLanguageToggle,
      isInclusive: info.isInclusive, // Default value for inclusive toggle
    },
  });

  const ref = doc(firestore, "classroom", info.id);
  const update = async (key: string, value: any) => {
    updateDoc(ref, {
      [key]: value,
    });
  };

  const allowLanguageToggle = watch("allowLanguageToggle");
  const allowedLanguages = watch("allowedLanguages");

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
                    {info.name}
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
          <IonText>
            <h2 className="text-2xl semibold color-suelo">
              <FormattedMessage
                id="settingsProgress.preferences.grades"
                defaultMessage="Grades"
              />
            </h2>
          </IonText>
        </IonItem>
        <IonGrid className="margin-left-1">
          <IonRow className="ion-justify-content-around">
            <MultipleCheckbox
              control={control}
              defaultValue={info.grades}
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

        <IonItem lines="none" className="margin-top-2">
          <Question className="margin-right-1" id="click-trigger2" />
          <IonText>
            <h2 className="text-2xl semibold color-suelo">
              <Popover
                content="Choose the language mode for your student’s experience in the app. ‘Bilingual’ means your student will see the content in English and Spanish. 
              ‘Immersion’ means your student will only see the content in Spanish."
                trigger="click-trigger2"
              />
              Student languages
            </h2>
          </IonText>
        </IonItem>
        <IonGrid className="margin-left-1">
          <IonRow className="ion-justify-content-around">
            <MultipleCheckbox
              control={control}
              defaultValue={allowedLanguagesTrigger}
              labelPlacement="end"
              justify="start"
              options={languageOptions}
              name="allowedLanguages"
              onChange={(values) => {
                update("allowedLanguages", values);
              }}
              wrapper={OptionWrapper}
              maxSelections={allowLanguageToggle ? undefined : 1}
              minSelections={1}
            />
          </IonRow>
        </IonGrid>

        <IonItem
          lines="none"
          className="text-2xl semibold color-suelo margin-top-2"
        >
          <Popover
            content="Enable the Language Toggle button to allow your student to change the app language while they play. 
          Disable to lock the app language (see ‘Student Language’)."
            trigger="click-trigger3"
          />
          <Question className="margin-right-1" id="click-trigger3" />
          <Toggle
            control={control}
            name="allowLanguageToggle"
            label="Language Toggle"
            color="primary"
            justify="space-between"
            mode="ios"
            onChange={(checked) => {
              if (!checked && allowedLanguages.length > 1) {
                // need to pare down allowedLanguages
                const newAllowedLanguages = allowedLanguages.slice(-1);
                setValue("allowedLanguages", newAllowedLanguages);
                setAllowedLanguagesTrigger(newAllowedLanguages);
                update("allowedLanguages", newAllowedLanguages);
              }
              setValue("allowLanguageToggle", checked);
              update("allowLanguageToggle", checked);
            }}
          />
        </IonItem>

        <IonItem
          lines="none"
          className="text-2xl semibold color-suelo margin-top-2"
        >
          <Popover
            content="Choose inclusive Spanish to see gender-neutral terms like 'amigues,' 'niñes,' and 'Latine' when referring to groups or non-binary characters. 
          Disable this feature if you do not want to see these terms."
            trigger="click-trigger4"
          />
          <Question className="margin-right-1" id="click-trigger4" />
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
