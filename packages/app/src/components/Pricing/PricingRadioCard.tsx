import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import type { MessageFormatElement } from "react-intl";
import { ExtendedRadioOption } from "@/components/ExtendedRadio";
import React from "react";
import "./PricingRadioCard.css";
import { useIntl } from "react-intl";

type PricingRadioCardProps = {
  title: string | MessageFormatElement[];
  content: string | MessageFormatElement[];
  icon?: React.ReactNode;
  iconBackgroundColor?: string;
  badge?: React.ReactNode;
};

export const PricingRadioCard: React.FC<PricingRadioCardProps> = ({
  badge,
  content,
  icon,
  iconBackgroundColor,
  title,
}) => {
  const intl = useIntl();

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
            <IonText color="primary">
              {/* todo: don't force type cast */}
              {title as string}
            </IonText>
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent className="ion-no-padding ion-text-start">
          {/* todo: don't force type cast */}
          {content as string}
        </IonCardContent>
      </div>
    </IonCard>
  );
};
