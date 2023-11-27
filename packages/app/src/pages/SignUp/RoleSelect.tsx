import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";

import { IonButton, IonLabel, IonItem, IonInput, IonText } from "@ionic/react";
import { useIntl, FormattedMessage } from "react-intl";

import { useSwiper } from "swiper/react";
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

export type RoleSelectProps = {
  teacherSlide: number;
  parentSlide: number;
};

export const RoleSelect: React.FC<RoleSelectProps> = ({
  teacherSlide,
  parentSlide,
}) => {
  const intl = useIntl();
  const form = useForm<{ role: string }>();
  const schema = z.object({
    role: z.string().min(1), //nonempty was deprecated
  });
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const { data, setData } = useSignUpData();
  const swiper = useSwiper();
  const teacherOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          title={intl.messages["signUp.teacher"]}
          content={intl.messages["signUp.teacher2"]}
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
          title={intl.messages["signUp.parent"]}
          content={intl.messages["signUp.parent2"]}
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
      swiper.slideTo(teacherSlide);
    }
    // @ts-ignore todo: better typing
    if (responses.role === "parent") {
      swiper.slideTo(parentSlide);
    }
  });

  return (
    <>
      <form onSubmit={onSubmit} className="radio-button-select">
        <IonText className="ion-text-center">
          <h1>
            <FormattedMessage
              id="signUp.describe"
              defaultMessage="Which best describes you?"
              description="User can choose if they are a teacher or parent/caregiver."
            />
          </h1>
        </IonText>
        <ExtendedRadio
          control={control}
          name="role"
          options={[teacherOption, parentOption]}
        />
        <IonButton
          shape="round"
          type="button"
          onClick={onSubmit}
          data-testid="role-select-continue-button"
          disabled={!isValid}
        >
          <FormattedMessage
            id="signUp.continue"
            defaultMessage="Continue"
            description="After user chooses teacher or parent/caregiver they can click continue."
          />
        </IonButton>
      </form>
    </>
  );
};
