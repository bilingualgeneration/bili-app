import React from "react";
import { FC, JSX } from "react";
import {
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonRadio,
  IonRadioGroup,
  IonList,
} from "@ionic/react";
import { useIntl, FormattedMessage } from "react-intl";
import { useForm } from "react-hook-form";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { useSwiper } from "swiper/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input";
import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";

export type ChildProfileProps = {
  nextSlide: number;
};

export const ChildProfile: FC<ChildProfileProps> = ({ nextSlide }) => {
  const intl = useIntl();
  const { data, setData } = useSignUpData();
  const swiper = useSwiper();

  const schema = z.object({
    childName: z.string().min(1).max(50).optional(),
    childAge: z.string(),
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const ageOptions: ExtendedRadioOption[] = [
    {
      component: (
        <div>
          <IonRadio labelPlacement="end">Below 3 years old</IonRadio>
        </div>
      ),
      value: "<3",
    },
    {
      component: (
        <div>
          <IonRadio labelPlacement="end">3-5 years old</IonRadio>
        </div>
      ),
      value: "3-5",
    },
    {
      component: (
        <div>
          <IonRadio labelPlacement="end">5-7 years old</IonRadio>
        </div>
      ),
      value: "5-7",
    },
    {
      component: (
        <div>
          <IonRadio labelPlacement="end">Above 7 years old</IonRadio>
        </div>
      ),
      value: ">7",
    },
  ];

  const onSubmit = handleSubmit((response) => {
    setData({
      ...data,
      ...response,
    });
    swiper.slideTo(nextSlide);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="ion-padding-bottom">
          <IonText className="ion-text-center">
            <h1>
              <FormattedMessage
                id="childProfile.title"
                defaultMessage="Make a profile for your child"
                description="Title for page where parents share information about their child"
              />
            </h1>
            <p>
              <FormattedMessage
                id="childProfile.subtitle"
                defaultMessage="This helps us personalize your child's learning experience. You
                can add more profiles in settings."
                description="Text at bottom of page that comes before the 'Sign up' link prompting users to sign up using the link if they don't have an account"
              />
            </p>
          </IonText>
        </div>
        <br />
        <div>
          <IonText>
            <h2>
              <FormattedMessage
                id="childProfile.nameLabel"
                defaultMessage="Enter your child's name or nickname:"
                description="Label for text input where parents can enter their child's name"
              />
            </h2>
          </IonText>
          <Input
            control={control}
            name="childName"
            type="text"
            labelPlacement="floating"
          />
        </div>

        <br />
        <div className="ion-margin-top">
          <IonText>
            <h2>
              <FormattedMessage
                id="childProfile.ageLabel"
                defaultMessage="Select your child's age range:"
                description="Label for radio input where parents can select their child's age range"
              />
            </h2>
          </IonText>
        </div>

        <IonRadioGroup>
          <ExtendedRadio
            control={control}
            name="childAge"
            options={ageOptions}
            testId="child-age-radio-group"
          />
        </IonRadioGroup>

        <IonButton
          className="ion-margin-top"
          data-testid="account-credentials-continue-button"
          disabled={!isValid}
          expand="block"
          shape="round"
          type="submit"
        >
          <FormattedMessage
            id="common.continue"
            defaultMessage="Continue"
            description="Button for users to continue on to the next page"
          />
        </IonButton>
      </form>
    </>
  );
};
