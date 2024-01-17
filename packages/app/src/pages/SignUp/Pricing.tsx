import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIntl, FormattedMessage } from "react-intl";
import { useForm } from "react-hook-form";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { IonButton, IonText } from "@ionic/react";
import { PricingRadioCard } from "@/components/Pricing/PricingRadioCard";
import { CombinedPricingOption } from "@/components/Pricing/CombinedPricingOption";
import pricingBanner from "@/assets/icons/pricing_banner.svg";
import "@/pages/SignUp/Pricing.css";
import { useState } from "react";

export const Pricing: React.FC = () => {
  const { data, setData, pushPage } = useSignUpData();
  const intl = useIntl();
  const schema = z.object({
    pricing: z.string(),
  });
  const {
    control,
    handleSubmit,
    //formState: { isValid },
  } = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = (index: number): void => {
    setActiveIndex(index);
  };

  const onSubmit = handleSubmit((responses) => {
    setData({
      ...data,
      ...responses,
    });
    pushPage("complete");
  });

  return (
    <>
      <div id="pricing-page-container">
        <div className="plan-card">
          <IonText className="ion-text-center">
            <h1>
              <FormattedMessage
                id="signUp.choosePlan"
                defaultMessage="Choose your plan"
                description="Title of page where user can choose plan"
              />
            </h1>
          </IonText>
          <br />
          <div className="banner-content-container">
            <img
              className="pricing-banner"
              src={pricingBanner}
              alt="Pricing Banner"
            />
            <IonText className="ion-text-center banner-text">
              <div className="banner-text1">
                <FormattedMessage
                  id="signUp.trialTitle"
                  defaultMessage="3 week free trial"
                  description="Subtitle of page mentioning the 3 week free trial promo"
                />
              </div>
              <div className="banner-text2">
                <FormattedMessage
                  id="signUp.trialDescription"
                  defaultMessage="For a limited time only"
                  description="Text under subtitle mentioning the trial period time limitation"
                />
              </div>
            </IonText>
          </div>

          <form onSubmit={onSubmit} className="radio-button-select">
            <div className="price-cards">
              <ExtendedRadio
                control={control}
                name="pricing"
                options={[
                  {
                    component: (
                      <CombinedPricingOption
                        optionType="monthly"
                        activeIndex={activeIndex}
                        handleClick={handleClick}
                      />
                    ),
                    value: "monthly",
                  },
                  {
                    component: (
                      <CombinedPricingOption
                        optionType="annual"
                        activeIndex={activeIndex}
                        handleClick={handleClick}
                      />
                    ),
                    value: "annual",
                  },
                ]}
              />
            </div>

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

            <IonText className="ion-text-center">
              <FormattedMessage
                id="signUp.noCommitment"
                defaultMessage="No commitments, cancel anytime."
                description="Text at the bottom of 'Choose your plan' page, assuring new clients of cancelation flexibility"
              />
            </IonText>
          </form>
        </div>
      </div>
    </>
  );
};
