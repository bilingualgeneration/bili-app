import React from "react";
import { IonButton, IonCard, IonImg, IonText } from "@ionic/react";
import "./ClassRoomComplete.css";
import { useHistory } from "react-router";

interface ClassroomCompleteProps {
  h2Text: string;
  isDisabled: boolean;
  path: string;
}

export const ClassroomComplete: React.FC<ClassroomCompleteProps> = ({
  h2Text,
  isDisabled,
  path,
}) => {
  const history = useHistory();
  return (
    <div className="add-class-success">
      <IonCard>
        <IonText className="ion-text-center margin-bottom-3">
          <h2 className="text-3xl semibold color-suelo">{h2Text}</h2>
        </IonText>

        <IonImg src="/assets/img/happy_cactus.png" />

        <IonButton
          className="margin-vertical-3"
          data-testid="complete-continue-button"
          disabled={isDisabled}
          onClick={() => {
            history.push(path);
          }}
          shape="round"
        >
          Continue
        </IonButton>
      </IonCard>
    </div>
  );
};
