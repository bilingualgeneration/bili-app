import { FormattedMessage } from "react-intl";
import { IonButton, IonText } from "@ionic/react";
import { useStory } from "./StoryContext";
import { useLanguage } from "@/hooks/Language";
import { useEffect } from "react";

import congratsStar from "@/assets/icons/count_congrats_star.svg";

export const StoriesCongrats: React.FC<{
  onKeepGoingClick: () => void;
}> = ({ onKeepGoingClick }) => {
  const { language } = useLanguage();
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
            <FormattedMessage
              id="countWithMe.keepGoing"
              defaultMessage="Keep Going!"
              description="Button label to exit congrats screen"
            />
          </p>
          {language === "esen" && <p className="text-sm">Keep going!</p>}
        </IonText>
      </IonButton>
    </div>
  );
};
