import { Control, Controller } from "react-hook-form";
import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIntl, FormattedMessage } from "react-intl";
import { useForm } from "react-hook-form";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { IonButton, IonCard, IonText, IonTitle } from "@ionic/react";
import { PricingRadioCard } from "@/components/Pricing/PricingRadioCard";
import pricingBanner from "@/assets/icons/pricing_banner.svg";
import "@/pages/SignUp/Pricing.scss";

export const Pricing: React.FC = () => {
  const { data, setData, pushPage } = useSignUpData();
  const intl = useIntl();
  const schema = z.object({
    pricing: z.string(),
  });

  // Set up useForm with zodResolver
  const {
    control,
    handleSubmit,
    //formState: { isValid },
  } = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const onSubmit = handleSubmit((responses) => {
    setData({
      ...data,
      ...responses,
    });
    pushPage("complete");
  });

  // Define radio options for ExtendedRadio
  const monthlyOption: ExtendedRadioOption = {
    component: (
      <div id="pricing-month">
        <PricingRadioCard
          title={intl.formatMessage({
            id: "signUp.pricing_monthly_title",
            defaultMessage: "1 month unlimited",
            description:
              "larger title for smaller/inner cards within pricing page that shows subscription length",
          })}
          cost={intl.formatMessage({
            id: "signUp.montlyCost",
            defaultMessage: "$4.99",
            description: "cost of a monthly subscription",
          })}
          frequency={
            "/" +
            intl.formatMessage({
              id: "signUp.monthlyFrequency",
              defaultMessage: "month",
              description: "length of time for the particular package",
            })
          }
        />
      </div>
    ),
    value: "monthly",
  };
  const annualOption: ExtendedRadioOption = {
    component: (
      <div id="pricing-annual">
        <div className="best-value-block">
          <p className="best-value-text">
            <FormattedMessage
              id="signUp.bestValuePricing"
              defaultMessage={"best value"}
              description={
                "Orange rectangle that sits above 'annual' pricing option that specifies it as the 'best value'"
              }
            />
          </p>
        </div>
        <PricingRadioCard
          title={intl.formatMessage({
            id: "signUp.pricing_annual_title",
            defaultMessage: "12 months unlimited",
            description:
              "larger title for smaller/inner cards within pricing page that shows subscription length",
          })}
          cost={intl.formatMessage({
            id: "signUp.annualCost",
            defaultMessage: "$44.99",
            description: "cost of an annual subscription",
          })}
          frequency={
            "/" +
            intl.formatMessage({
              id: "signUp.annualFrequency",
              defaultMessage: "year",
              description: "length of time for the particular package",
            })
          }
          discount={intl.formatMessage({
            id: "signUp.annualDiscount",
            defaultMessage: "3 month discount!",
            description: "text that describes savings of package",
          })}
        />
      </div>
    ),
    value: "annual",
  };

  return (
    <>
      <div id="pricing-page-container">
        <div className="plan-card">
          <IonText className="ion-text-center">
            <h2>
              <FormattedMessage
                id="signUp.choosePlan"
                defaultMessage="Choose your plan"
                description="Title of page where user can choose plan"
              />
            </h2>
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
                  defaultMessage="2 week free trial"
                  description="Subtitle of page mentioning the 2 week free trial promo"
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

          {/* Render the form with ExtendedRadio using modified behavior specific for pricing page (to display cards in a row as opposed to column) */}
          <form onSubmit={onSubmit} className="radio-button-select">
            <div className="price-cards">
              <ExtendedRadio
                control={control}
                name="pricing"
                options={[monthlyOption, annualOption]}
                displayCardsInRow={true}
              />
            </div>

            {/* Continue button */}
            <IonButton
              shape="round"
              type="submit"
              data-testid="role-select-continue-button"
            >
              <FormattedMessage
                id="common.continue"
                defaultMessage="Continue"
                description="Button label top continue"
              />
            </IonButton>

            {/* No commitment text */}
            <IonText className="ion-text-center no-commitments-text">
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
