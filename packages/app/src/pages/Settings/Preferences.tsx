import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToggle,
} from "@ionic/react";
import Question from "@/assets/icons/question.svg?react";
import { chevronForward } from "ionicons/icons";
import { Popover } from "@/components/Popover";
import { firestore } from "@/components/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FormattedMessage, useIntl } from "react-intl";
import { useProfile } from "@/hooks/Profile";

import "./Preferences.scss";
import { Toggle } from "@/components/Toggle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useClassroom } from "@/hooks/Classroom";
import {
  MultipleCheckbox,
  MultipleCheckboxOption,
} from "@/components/MultipleCheckbox";
import { update } from "firebase/database";

const OptionWrapper = ({ children }: { children: JSX.Element }) => {
  return <IonCol size="4">{children}</IonCol>;
};

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

export const Preferences: React.FC = () => {
  const intl = useIntl();
  const {
    user: { uid },
    profile: { isImmersive, isInclusive, settingsLanguage },
  } = useProfile();
  const { info } = useClassroom();
  const [allowedLanguagesTrigger, setAllowedLanguagesTrigger] = useState<
    string[]
  >(info.allowedLanguages);
  const { control, getValues, setValue, watch } = useForm({
    defaultValues: {
      grades: info.grades,
      name: info.name,
      allowedLanguages: info.allowedLanguages,
      allowLanguageToggle: info.allowLanguageToggle,
      isInclusive: info.isInclusive, // Default value for inclusive toggle
    },
  });
  const ref = doc(firestore, "users", uid);
  // TODO: we shouldn't allow this straight from the app
  const update = (key: string, value: any) => {
    updateDoc(ref, {
      [key]: value,
    });
  };

  const allowLanguageToggle = watch("allowLanguageToggle");
  const allowedLanguages = watch("allowedLanguages");

  return (
    <>
      <IonList className="preferences-style">
        <IonItem style={{ marginBottom: "2rem" }}>
          <div className="title-style">
            <h1>
              <FormattedMessage
                id="sideMenu.preferences"
                defaultMessage="Preferences"
                description="Title at the top of 'preferences' page"
              />
            </h1>
          </div>
        </IonItem>

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
        <IonGrid className="margin-left-2">
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

        {/* Keepp hidden for now Daily playtime limit and sound effects */}

        {/* <IonItem>
          <Popover
            content={intl.formatMessage({
              id: "settingsProgress.preferences.popover4",
              defaultMessage:
                "Determine how long your child plays on the app each day.",
              description: "Daily Playtime Limit",
            })}
            trigger="click-trigger4"
          />
          <Question id="click-trigger4" />
          <IonSelect
            placeholder="Unlimited"
            interface="popover"
            toggleIcon={chevronForward}
          >
            <div className="label-style" slot="label">
              <h4>
                <FormattedMessage
                  id="settingsProgress.preferences.limit"
                  defaultMessage="Daily playtime limit"
                  description="Preferences page 'Daily playtime limit' text"
                />
              </h4>
            </div>
            <IonSelectOption value="unlimited">Unlimited</IonSelectOption>
            <IonSelectOption value="30">30 mins</IonSelectOption>
            <IonSelectOption value="1">1 hour</IonSelectOption>
            <IonSelectOption value="1.30">1 hour 30 mins</IonSelectOption>
            <IonSelectOption value="2">2 hours</IonSelectOption>
            <IonSelectOption value="2.30">2 hours 30 mins</IonSelectOption>
            <IonSelectOption value="3">3 hours</IonSelectOption>
            <IonSelectOption value="3.30">3 hours 30 mins</IonSelectOption>
            <IonSelectOption value="4">4 hours</IonSelectOption>
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
                  id="settingsProgress.preferences.sound"
                  defaultMessage="Sound Effects"
                  description="Preferences page 'Sound effects' text"
                />
              </h4>
            </div>
          </IonToggle>
        </IonItem> */}
      </IonList>
    </>
  );
};
