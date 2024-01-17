import React from "react";
import { PricingRadioCard } from "./PricingRadioCard";
import "./PricingRadioCard.css";
import { useIntl } from "react-intl";

type CombinedPricingOptionProps = {
  optionType: "monthly" | "annual";
  activeIndex: number;
  handleClick: (index: number) => void;
};

export const CombinedPricingOption: React.FC<CombinedPricingOptionProps> = ({
  optionType,
  activeIndex,
  handleClick,
}) => {
  const intl = useIntl();

  return (
    <div className={`combined-pricing-option ${optionType}`}>
      {/* Render the monthly card */}
      {optionType === "monthly" && (
        <PricingRadioCard
          title={intl.messages["signUp.pricing_monthly_title"]}
          content={intl.messages["signUp.pricing_monthly_pricing"]}
        />
      )}

      {/* Render the annual card */}
      {optionType === "annual" && (
        <>
          {/* Additional block for the best value */}
          <div className="best-value-block">
            <p className="best-value-text">best value</p>
          </div>
          <PricingRadioCard
            title={intl.messages["signUp.pricing_annual_title"]}
            content={intl.messages["signUp.pricing_annual_pricing"]}
          />
        </>
      )}

      {/* Logic for handling click and active state */}
      <span
        onClick={() => handleClick(0)} // 0 is the index for monthly, 1 is for annual
        className={
          activeIndex === (optionType === "monthly" ? 0 : 1) ? "active" : ""
        }
      />
    </div>
  );
};
