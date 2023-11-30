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
    childAge: z
      .string()
      .refine(
        (val) =>
          [
            "Below years",
            "3-5 years old",
            "5-7 years old",
            "Above 7 years",
          ].includes(val),
        {
          message: "Invalid child age range",
        },
      )
      .optional(),
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      childName: "",
      childAge: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const ageOptions: ExtendedRadioOption[] = [
    {
      component: (
        <>
          <IonRadioGroup allowEmptySelection={true}>
            <IonItem>
              <IonRadio labelPlacement="end">Below 3 years old</IonRadio>
            </IonItem>

            <IonItem>
              <IonRadio labelPlacement="end">3-5 years old</IonRadio>
            </IonItem>

            <IonItem>
              <IonRadio labelPlacement="end">5-7 years old</IonRadio>
            </IonItem>

            <IonItem>
              <IonRadio labelPlacement="end">Above 7 years old</IonRadio>
            </IonItem>
          </IonRadioGroup>
        </>
      ),
      value: "",
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
            <h1 style={{ marginBottom: "1%", marginTop: "5%" }}>
              <FormattedMessage
                id="childProfile.title"
                defaultMessage="Make a profile for your child"
                description="Title for page where parents share information about their child"
              />
            </h1>
            <p style={{ maxWidth: "100%", marginBottom: "8%" }}>
              This helps us personalize your child's learning experience. You
              can add more profiles in settings.
            </p>
          </IonText>
        </div>

        <div>
          <IonText>
            <h2 style={{ marginBottom: "5%", marginTop: "5%" }}>
              <FormattedMessage
                id="childProfile.nameTitle"
                defaultMessage="Enter your child's name or nickname:"
                description="Title for area where parents can select their child's age range"
              />
            </h2>
          </IonText>
          <Input
            control={control}
            name="childName"
            type="text"
            // label=""
            labelPlacement="floating"
            // placeholder="Name"
          />
        </div>

        <div className="ion-margin-top">
          <IonText>
            <h2 style={{ marginTop: "10%", marginBottom: "3%" }}>
              <FormattedMessage
                id="childProfile.ageTitle"
                defaultMessage="Select your child's age range:"
                description="Title for area where parents can select their child's age range"
              />
            </h2>
          </IonText>
        </div>

        <ExtendedRadio
          control={control}
          name="childAge"
          options={ageOptions}
          testId="child-age-radio-group"
        />

        <IonButton
          className="ion-margin-top"
          expand="block"
          shape="round"
          type="submit"
          data-testid="child-profile-continue-button"
          disabled={!isValid}
        >
          Continue
        </IonButton>
      </form>
    </>
  );
};
