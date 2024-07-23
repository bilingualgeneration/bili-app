import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import type { MessageFormatElement } from "react-intl";
import React from "react";

import './RadioCard.css';

type RadioCardProps = {
  title: string | MessageFormatElement[];
  content: string | MessageFormatElement[];
  icon?: React.ReactNode;
  iconBackgroundColor?: string;
  badge?: React.ReactNode;
  titleFontSize?: string;
  titleColor?: string;
  contentFontSize?: string;
  contentColor?: string;
};

export const RadioCard: React.FC<RadioCardProps> = ({
  badge,
  content,
  icon,
  iconBackgroundColor,
  title,
  titleFontSize = '2xl', // default font-size for title
  titleColor = 'color-selva', // default color for title
  contentFontSize = 'sm', // default font-size for content
  contentColor = 'color-suelo', // default color for content
}) => {
  return (
    <IonCard className='radio-card' style={{ cursor: "pointer", paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>
      <div className="card-inner">
        {icon && (
          <div
            className="oval-element"
            style={{ backgroundColor: iconBackgroundColor }}
          >
            {icon}
          </div>
        )}
        <div className="title-content">
          <div
            className="badge-content"
            style={{
              backgroundColor: "var(--Flamenco-High)",
              marginLeft: "18px",
              paddingLeft: "8px",
              paddingRight: "8px",
              borderRadius: "4px",
            }}
          >
            {badge}
          </div>
          <IonCardHeader class="custom-ion-header">
            <IonCardTitle>
              <IonText>
                {/* todo: don't force type cast */}
                <p className={`text-${titleFontSize} semibold ${titleColor}`}>
                  {title as string}
                </p>
              </IonText>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div>
              <IonText>
                <p className={`text-${contentFontSize} ${contentColor}`}>
                  {/* todo: don't force type cast */}
                  {content as string}
                </p>
              </IonText>
            </div>
          </IonCardContent>
        </div>
      </div>
    </IonCard>
  );
};
