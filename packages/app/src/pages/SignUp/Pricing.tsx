import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIntl, FormattedMessage } from "react-intl";
import { useForm } from "react-hook-form";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { useSwiper } from "swiper/react";
import { IonButton, IonText } from "@ionic/react";

import { RadioCard } from "@/components/RadioCard";

export const Pricing: React.FC = () => {
  const { data, setData } = useSignUpData();
  const intl = useIntl();
  const schema = z.object({
    pricing: z.string(),
  });
  const swiper = useSwiper();
  const {
    control,
    handleSubmit,
    //formState: { isValid },
  } = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((responses) => {
    setData({
      ...data,
      ...responses,
    });
    swiper.slideNext();
  });

  const monthlyOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          title={intl.messages["signUp.pricing_monthly_title"]}
          content={intl.messages["signUp.pricing_monthly_pricing"]}
        />
      </div>
    ),
    value: "monthly",
  };
  const annualOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          title={intl.messages["signUp.pricing_annual_title"]}
          content={intl.messages["signUp.pricing_annual_pricing"]}
        />
      </div>
    ),
    value: "annual",
  };

  return (
    <>
      <form onSubmit={onSubmit} className="radio-button-select">
        <IonText className="ion-text-center">
          <h1>
            <FormattedMessage
              id="signUp.choosePlan"
              defaultMessage="Choose your plan"
              description="Title of page where user can choose plan"
            />
          </h1>
          <br />
          <h2>
            <FormattedMessage
              id="signUp.trialTitle"
              defaultMessage="3 week free trial"
              description="Subtitle of page mentioning the 3 week free trial promo"
            />
          </h2>
          <p>
            <FormattedMessage
              id="signUp.trialDescription"
              defaultMessage="For a limited time only"
              description="Text under subtitle mentioning the trial period time limitation"
            />
          </p>
        </IonText>
        <ExtendedRadio
          control={control}
          name="pricing"
          options={[monthlyOption, annualOption]}
        />
        <IonButton
          shape="round"
          type="submit"
          data-testid="role-select-continue-button"
        >
          <FormattedMessage
            id="common.continue"
            defaultMessage="Continue"
            description="Button for users to continue on to the next page"
          />
        </IonButton>
        <span className="ion-text-center">
          <FormattedMessage
            id="signUp.noCommitment"
            defaultMessage="No commitments, cancel anytime."
            description="Text at the bottom of 'Choose your plan' page, assuring new clients of cancelation flexibility"
          />
        </span>
      </form>
    </>
  );
};
