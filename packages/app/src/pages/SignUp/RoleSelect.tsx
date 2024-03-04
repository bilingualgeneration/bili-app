import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";

import { IonButton, IonLabel, IonItem, IonInput, IonText } from "@ionic/react";
import { useIntl, FormattedMessage } from "react-intl";

import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import HouseIcon from "@/assets/icons/house.svg?react";
import SchoolIcon from "@/assets/icons/school.svg?react";

import "./RoleSelect.css";
import { string } from "zod";
import { CollectionReference } from "firebase/firestore";
import { RadioCard } from "@/components/RadioCard";

export const RoleSelect: React.FC = () => {
  const intl = useIntl();
  const schema = z.object({
    role: z.string().min(1), //nonempty was deprecated
  });
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });
  const { data, setData, pushPage } = useSignUpData();
  const teacherOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          title={intl.formatMessage({
            id: "signUp.teacher",
            defaultMessage: "Teacher",
            description: "title for Teacher select card",
          })}
          content={intl.formatMessage({
            id: "signUp.teacher2",
            defaultMessage: "I want to use this app with my students",
            description: "description for Teacher select card",
          })}
          icon={<SchoolIcon />}
          iconBackgroundColor="var(--Cielo-Cielo)"
        />
      </div>
    ),
    value: "teacher",
  };

  const parentOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          title={intl.formatMessage({
            id: "signUp.parent",
            defaultMessage: "Parent",
            description: "title for Parent select card",
          })}
          content={intl.formatMessage({
            id: "signUp.parent2",
            defaultMessage: "I want to use this app with my child(ren)",
            description: "description for Parent select card",
          })}
          icon={<HouseIcon />}
          iconBackgroundColor="var(--Desierto-Highest)"
        />
      </div>
    ),
    value: "parent",
  };

  const onSubmit = handleSubmit((responses) => {
    //add logic where to store user's choice
    setData({
      ...data,
      ...responses,
    });
    // @ts-ignore todo: better typing
    if (responses.role === "teacher") {
      pushPage("teacherAbout");
      //swiper.slideTo(teacherSlide);
    }
    // @ts-ignore todo: better typing
    if (responses.role === "parent") {
      pushPage("childProfile");
      //swiper.slideTo(parentSlide);
    }
  });

  return (
    <>
      <form onSubmit={onSubmit} className="radio-button-select">
        <IonText className="ion-text-center">
          <h2 className="text-3xl semibold color-suelo">
            <FormattedMessage
              id="signUp.describe"
              defaultMessage="Which best describes you?"
              description="Title of page where user is presented with button options where they can choose if they are a teacher or parent/caregiver."
            />
          </h2>
        </IonText>
        <ExtendedRadio
          control={control}
          name="role"
          options={[teacherOption, parentOption]}
        />
        <IonButton
          className="margin-vertical-1"
          shape="round"
          type="button"
          onClick={onSubmit}
          data-testid="role-select-continue-button"
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
