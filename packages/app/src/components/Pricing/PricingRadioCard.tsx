import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import type { MessageFormatElement } from "react-intl";
import React from "react";
import "./PricingRadioCard.css";

type PricingRadioCardProps = {
  title: string;
  cost: string;
  frequency: string;
  discount?: string;
  icon?: React.ReactNode;
  iconBackgroundColor?: string;
  badge?: React.ReactNode;
};

export const PricingRadioCard: React.FC<PricingRadioCardProps> = ({
  title,
  cost,
  frequency,
  discount,
  icon,
  iconBackgroundColor,
  badge,
}) => {
  return (
    <IonCard className="main-pricing-card">
      <div>
        {icon && (
          <div
            className="oval-element"
            style={{ backgroundColor: iconBackgroundColor }}
          >
            {icon}
          </div>
        )}
        <IonCardHeader class="pricing-header">
          <IonCardTitle className="ion-no-padding ion-text-start">
            <IonText color="primary" className="bolded-inner-card-heading">
              {title}
            </IonText>
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent className="ion-no-padding ion-text-start">
          <div>
            <span className="cost">{cost}</span>

            <span className="frequency">{frequency}</span>
          </div>

          <div className="discount">{discount}</div>
        </IonCardContent>
      </div>
    </IonCard>
  );
};
