import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";
import { I18nMessage } from "@/components/I18nMessage";
import { IonButton, IonLabel, IonItem, IonInput, IonText } from "@ionic/react";
import { RadioCard } from "@/components/RadioCard";
import { useForm } from "react-hook-form";
import { useI18n } from "@/hooks/I18n";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import HouseIcon from "@/assets/icons/house.svg?react";
import SchoolIcon from "@/assets/icons/school.svg?react";

import "./RoleSelect.scss";

export const RoleSelect: React.FC = () => {
  const { getText } = useI18n();
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
          title={getText("signUp.teacher", 1, "unauthed")}
          content={getText("signUp.teacher2", 1, "unauthed")}
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
          title={getText("signUp.parent", 1, "unauthed")}
          content={getText("signUp.parent2", 1, "unauthed")}
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
            <I18nMessage id="signUp.describe" languageSource="unauthed" />
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
          <I18nMessage id="common.continue" languageSource="unauthed" />
        </IonButton>
      </form>
    </>
  );
};
