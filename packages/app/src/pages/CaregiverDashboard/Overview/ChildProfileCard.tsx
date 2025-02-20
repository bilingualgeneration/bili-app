import { IonIcon, IonText } from "@ionic/react";
import { ellipse } from "ionicons/icons";
import { FormattedMessage } from "react-intl";

import "./ChildProfileCard.scss";

interface ChildProfileCard {
  age: string;
  isActive: boolean;
  letterAvatarBackgroundColor: string;
  letterAvatarTextColor: string;
  name: string;
}

export const ChildProfileCard: React.FC<ChildProfileCard> = ({
  age,
  isActive = false,
  letterAvatarBackgroundColor,
  letterAvatarTextColor,
  name,
}) => {
  return (
    <div className={`child-profile-card${isActive ? " active" : ""}`}>
      <div
        className="letter-avatar"
        style={{ backgroundColor: letterAvatarBackgroundColor }}
      >
        <IonText>
          <h3
            className="ion-text-center text-2xl"
            style={{ color: letterAvatarTextColor }}
          >
            {name.substring(0, 1).toUpperCase()}
          </h3>
        </IonText>
      </div>
      <IonText>
        <h3 className="text-xl semibold color-suelo">{name}</h3>
        <p className="text-lg semibold color-barro ion-no-margin">
          <FormattedMessage
            id="common.years_old"
            defaultMessage="{age} years old"
            description="Label to display an age"
            values={{ age }}
          />
        </p>
      </IonText>
    </div>
  );
};
