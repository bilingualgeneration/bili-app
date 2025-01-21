import { FormattedMessage } from "react-intl";
import { IonButton, IonText } from "@ionic/react";
import { useStory } from "./StoryContext";
import { useEffect } from "react";
import { I18nMessage } from "@/components/I18nMessage";

import congratsStar from "@/assets/icons/count_congrats_star.svg";

export const StoriesCongrats: React.FC<{
  onKeepGoingClick: () => void;
}> = ({ onKeepGoingClick }) => {
  const { sendAnalytics } = useStory();
  useEffect(() => {
    sendAnalytics();
  }, []);
  const stars = 1;
  return (
    <div style={{ margin: "auto" }}>
      <div style={{ paddingBottom: 100 }}>
        {Array.from({ length: stars }, (value, index) => (
          <img
            key={index}
            className="congrats-star"
            src={congratsStar}
            alt="star"
          />
        ))}
      </div>

      <IonButton
        expand="block"
        shape="round"
        type="button"
        onClick={onKeepGoingClick}
      >
        <IonText>
          <p className="text-3xl" style={{ padding: "0 2.5rem" }}>
            <I18nMessage id="countWithMe.keepGoing" />
          </p>
          <I18nMessage
            id="countWithMe.keepGoing"
            level={2}
            wrapper={(t: string) => <p className="text-sm">{t}</p>}
          />
        </IonText>
      </IonButton>
    </div>
  );
};
