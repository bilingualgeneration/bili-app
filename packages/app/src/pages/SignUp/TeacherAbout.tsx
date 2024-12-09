import { I18nMessage } from "@/components/I18nMessage";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonItem,
  IonList,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import { MultipleCheckbox } from "@/components/MultipleCheckbox";
import type {
  MultipleCheckboxProps,
  MultipleCheckboxOption,
} from "@/components/MultipleCheckbox";
import { Select } from "@/components/Select";
import { useForm } from "react-hook-form";
import { useI18n } from "@/hooks/I18n";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./TeacherAbout.scss";

const OptionWrapper = ({ children }: { children: JSX.Element }) => {
  return <IonCol size="4">{children}</IonCol>;
};

const OptionWrapperRoles = ({ children }: { children: JSX.Element }) => {
  return <IonCol size="4">{children}</IonCol>;
};

export const TeacherAbout: React.FC = () => {
  const { getText } = useI18n();
  const { data, setData, pushPage } = useSignUpData();
  // todo: these zod schemas are wrong
  const schema = z.object({
    grades: z.string().array().optional(),
    schoolRoles: z.string().array().optional(),
    schoolName: z.string().optional(),
  });
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      grades: [],
      schoolRoles: [],
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const gradesOptions: MultipleCheckboxOption[] = [
    {
      label: getText("signUpTeacher.aboutGradePre", 1, "unauthed"),
      value: "p",
    },
    {
      label: getText("signUpTeacher.aboutGradeK", 1, "unauthed"),
      value: "k",
    },
    {
      label: getText("signUpTeacher.aboutGrade1", 1, "unauthed"),
      value: "1",
    },
    {
      label: getText("signUpTeacher.aboutGrade2", 1, "unauthed"),
      value: "2",
    },
    {
      label: getText("signUpTeacher.aboutGrade3", 1, "unauthed"),
      value: "3",
    },
    {
      label: getText("signUpTeacher.aboutOther", 1, "unauthed"),
      value: "o",
    },
  ];

  const rolesOptions = [
    {
      label: getText("signUpTeacher.roleAdmin", 1, "unauthed"),
      value: "administrator",
    },
    {
      label: getText("signUpTeacher.roleTeacher", 1, "unauthed"),
      value: "teacher",
    },
    {
      label: getText("signUpTeacher.roleCounselor", 1, "unauthed"),
      value: "counselor",
    },
    {
      label: getText("signUpTeacher.roleFacilitator", 1, "unauthed"),
      value: "facilitator",
    },
  ];

  const onSubmit = handleSubmit((response) => {
    setData({
      ...data,
      ...response,
    });
    pushPage("accountCredentials");
  });

  return (
    <>
      <form onSubmit={onSubmit} id="teacher-about-styles">
        <div className="margin-bottom-2">
          <IonText className="ion-text-center">
            <h1 className="text-3xl semibold color-suelo">
              <I18nMessage
                id="signUpTeacher.aboutTitle"
                languageSource="unauthed"
              />
            </h1>
          </IonText>
        </div>
        <div className="margin-bottom-1x">
          <IonText>
            <h2 className="text-xl semibold color-suelo">
              <I18nMessage
                id="signUpTeacher.aboutGrades"
                languageSource="unauthed"
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
                wrapper={OptionWrapper}
              />
            </IonRow>
          </IonGrid>
        </div>
        <div className="margin-top-1">
          <IonText>
            <h2 className="text-xl semibold color-suelo">
              <I18nMessage id="signUpTeacher.role" languageSource="unauthed" />
            </h2>
          </IonText>
        </div>
        <div className="text-md color-suelo roles-styles">
          <IonGrid>
            <IonRow>
              <MultipleCheckbox
                control={control}
                labelPlacement="end"
                options={rolesOptions}
                name="schoolRoles"
                wrapper={OptionWrapperRoles}
              />
            </IonRow>
          </IonGrid>
        </div>

        <div className="margin-top-1 ion-hide">
          <IonText>
            <h2 className="text-xl semibold color-suelo">
              <I18nMessage
                id="signUpTeacher.school"
                languageSource="unauthed"
              />
            </h2>
          </IonText>
        </div>
        <div className="customer-school-select ion-hide">
          <Select
            control={control}
            fill="outline"
            options={[
              {
                value: "Kujawa Elementary School",
                label: "Kujawa Elementary School",
              },
              {
                value: "Griggs EC/PK/K School",
                label: "Griggs EC/PK/K School",
              },
              {
                value: "Garcia-Leza Ec/Pre-K Center",
                label: "Garcia-Leza Ec/Pre-K Center",
              },
            ]}
            name="schoolName"
          />
        </div>

        <IonButton
          className="margin-top-2"
          expand="block"
          shape="round"
          type="submit"
          data-testid="teacher-about-continue-button"
          disabled={!isValid}
        >
          <I18nMessage id="common.continue" languageSource="unauthed" />
        </IonButton>
      </form>
    </>
  );
};
