import { FC, JSX } from "react";
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
import { useIntl, FormattedMessage } from "react-intl";
import { useForm } from "react-hook-form";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { MultipleCheckbox } from "@/components/MultipleCheckbox";
import { Select } from "@/components/Select";
import type {
  MultipleCheckboxProps,
  MultipleCheckboxOption,
} from "@/components/MultipleCheckbox";
import "./TeacherAbout.scss";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const OptionWrapper = ({ children }: { children: JSX.Element }) => {
  return <IonCol size="4">{children}</IonCol>;
};

const OptionWrapperRoles = ({ children }: { children: JSX.Element }) => {
  return <IonCol size="4">{children}</IonCol>;
};

export const TeacherAbout: FC = () => {
  const intl = useIntl();
  const { data, setData, pushPage } = useSignUpData();
  // todo: these zod schemas are wrong
  const schema = z.object({
    grades: z.string().array().optional(),
    schoolRoles: z.string().array().optional(),
    schoolName: z.string(),
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

  const rolesOptions = [
    {
      label: intl.formatMessage({
        id: "signUpTeacher.roleAdmin",
        defaultMessage: "Administrator",
        description: "Checkbox label for Admin role option",
      }),
      value: "administrator",
    },
    {
      label: intl.formatMessage({
        id: "signUpTeacher.roleTeacher",
        defaultMessage: "Teacher",
        description: "Checkbox label for teacher role option",
      }),
      value: "teacher",
    },
    {
      label: intl.formatMessage({
        id: "signUpTeacher.roleCounselor",
        defaultMessage: "Counselor",
        description: "Checkbox label for Counselor role option",
      }),
      value: "counselor",
    },
    {
      label: intl.formatMessage({
        id: "signUpTeacher.roleFacilitator",
        defaultMessage: "Facilitator",
        description: "Checkbox label for Facilitator role option",
      }),
      value: "facilitator",
    },
  ];

  const onSubmit = handleSubmit((response) => {
    setData({
      ...data,
      ...response,
    });
    pushPage("teacherAccountCredentials");
  });

  return (
    <>
      <form onSubmit={onSubmit} id="teacher-about-styles">
        <div className="margin-bottom-2">
          <IonText className="ion-text-center">
            <h1 className="text-3xl semibold color-suelo">
              <FormattedMessage
                id="signUpTeacher.aboutTitle"
                defaultMessage="Tell us about yourself"
                description="Title for page where teachers share more info about what grades they teach and their role"
              />
            </h1>
          </IonText>
        </div>
        <div className="margin-bottom-1x">
          <IonText>
            <h2 className="text-xl semibold color-suelo">
              <FormattedMessage
                id="signUpTeacher.aboutGrades"
                defaultMessage="What grade(s) do you work with?"
                description="Title above area where teachers can check off what grades they teach"
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
              <FormattedMessage
                id="signUpTeacher.role"
                defaultMessage="What is your role?"
                description="Title above where teacher can select what role(s) they have"
              />
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

        <div className="margin-bottom-1x margin-top-1">
          <IonText>
            <h2 className="text-xl semibold color-suelo">
              <FormattedMessage
                id="signUpTeacher.school"
                defaultMessage="What is the name of your school?"
              />
            </h2>
          </IonText>
        </div>
        <div className="customer-school-select">
          <Select
            control={control}
            fill="outline"
            options={[
              {
                value: "Arts Magnet School",
                label: "Arts Magnet School",
              },
              {
                value: "Washington School",
                label: "Washington School",
              },
              {
                value: "Livermore School",
                label: "Livermore School",
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
          <FormattedMessage
            id="common.continue"
            defaultMessage="Continue"
            description="Button label to continue"
          />
        </IonButton>
      </form>
    </>
  );
};
