import React, { useState, useEffect } from "react";
import { IonButton, IonCard, IonCardContent } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import fabricaRectangle from "@/assets/icons/fabrica_swirl_rectangle.svg";
import fabricaHalfCircle from "@/assets/icons/fabrica_swirl_half_circle.svg";
import "./Intruder.scss";
import "../StoryFactory/StoryFactory.scss";

export const Intruder3: React.FC<{ setShowCongrats: any }> = ({
  setShowCongrats,
}) => {
  const { isImmersive } = useProfile();
  return (
    <div style={{ position: "relative", marginTop: "8rem" }}>
      <div className="stars-overlay"></div>
      <div className="ion-no-padding sf-card">
        <IonCard className="ion-no-margin">
          <IonCardContent className="margin-right">
            <h1 className="color-selva">Congrats</h1>
            <h2 style={{ marginBottom: 0 }} className="color-selva">
              Has encontrado veinte intrusos de <br />
              rima. ¡Eres un superrimador!
            </h2>
            <h2 style={{ marginTop: 0 }} className="color-selva">
              <FormattedMessage
                id={`storyFactory.congrats.description2`}
                defaultMessage="Can you keep going?"
                description="Description 2 congrats message on Story Factory"
              />
            </h2>

            {!isImmersive && (
              <>
                <h1>
                  <br />
                  Congrats!
                </h1>
                <h2>
                  You’ve found twenty rhyme intruders. You are a super-rhymer!
                  <br />
                  Can you keep going?
                </h2>
              </>
            )}

            <div className="ion-text-center" style={{ paddingTop: "4rem" }}>
              <IonButton
                shape="round"
                onClick={() => {
                  setShowCongrats(false);
                }}
              >
                <div style={{ padding: "0 3rem" }}>
                  <div className="keep-going-button-es">¡Sigue adelante!</div>
                  {!isImmersive && (
                    <div className="keep-going-button-en">Keep going!</div>
                  )}
                </div>
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </div>
      <img
        className="bili-character"
        src="/assets/img/bili_in_coat.png"
        alt="Bili character"
      />
    </div>
  );
};
