import classNames from "classnames";
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";

import "./WellnessCard.scss";

export interface WellnessCardProps {
  hasFlap?: boolean;
  image: { url: string };
  text_front: any[];
  text_back: any[];
  showFront: boolean;
  setShowFront: any;
}
export const WellnessCard: React.FC<WellnessCardProps> = ({
  hasFlap = false,
  image,
  text_back,
  text_front,
  setShowFront,
  showFront,
}) => {
  return (
    <span className="card-wrapper">
      <IonCard
        className={classNames("card card-flip", {
          front: showFront,
          back: !showFront,
          flapped: hasFlap,
        })}
        onClick={() => setShowFront(!showFront)}
      >
        {hasFlap && <div className="flap"></div>}
        <IonCardContent>
          {showFront ? (
            <IonGrid>
              <IonRow>
                <IonCol
                  className="card-front-image"
                  style={{ backgroundImage: `url(${image.url})` }}
                ></IonCol>
                <IonCol className="flex flex-column ion-justify-content-center ion-text-center">
                  <h1 className="text-4xl semibold color-suelo">
                    {text_front[0]?.text}
                  </h1>
                  {text_front[1] && (
                    <p className="text-2xl color-english">
                      {text_front[1]?.text}
                    </p>
                  )}
                </IonCol>
              </IonRow>
            </IonGrid>
          ) : (
            <div
              className="ion-justify-content-center ion-align-items-center"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <IonText>
                <p className="text-3xl semibold color-suelo">
                  {text_back[0]?.text}
                </p>
                {text_back[1] && (
                  <p className="text-xl color-english margin-top-1">
                    {text_back[1]?.text}
                  </p>
                )}
              </IonText>
            </div>
          )}
        </IonCardContent>
      </IonCard>
    </span>
  );
};
