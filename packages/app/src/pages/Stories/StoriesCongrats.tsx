import { DialogueScreen } from "@/components/DialogueScreen";
import { IonText } from "@ionic/react";
import { I18nMessage } from "@/components/I18nMessage";
import { useActivity } from "@/contexts/ActivityContext";
import { useEffect } from "react";
import { useStory } from "./StoryContext";
//import { useTimeTracker } from "@/hooks/TimeTracker";

import biliCharacter from "@/assets/icons/bili_character.svg";
import StarImage from "@/assets/icons/small-star.svg";

const englishCongratsText: { [key: number]: string } = {
  5: "Congrats!",
  4: "Amazing!",
  3: "I know you could do it! Way to go!",
  2: "You're on the right track, keep going!",
  1: "Good effort! Keep trying!",
};

export const StoriesCongrats: React.FC<{
  onKeepGoingClick: () => void;
}> = ({ onKeepGoingClick }) => {
  const {
    //handleRecordAttempt,
    stars,
  } = useActivity();
  //const { stopTimer } = useTimeTracker();
  const { sendAnalytics } = useStory();

  useEffect(() => {
    //handleRecordAttempt(stopTimer());
    sendAnalytics();
  }, []);

  const safeStars = stars ?? 1;

  return (
    <div className="responsive-height-with-header margin-safe-area">
      <DialogueScreen
        audios={[]}
        buttonI18nKey={"intruder.keepGoing"}
        characterImage={biliCharacter}
        onButtonClick={onKeepGoingClick}
      >
        <IonText class="ion-text-center">
          <h1 className="text-5xl color-suelo">
            <I18nMessage id={`common.congrats.title.${stars}`} />
          </h1>

          <I18nMessage
            id={`common.congrats.title.${stars}`}
            level={2}
            wrapper={(text: string) => (
              <h2 className="text-4xl color-english">{text}</h2>
            )}
          />

          <div className="stars-container">
            {[...Array(safeStars)].map((_, index) => (
              <img
                key={index}
                src={StarImage}
                alt="star"
                className="star-image"
              />
            ))}
          </div>
        </IonText>
      </DialogueScreen>
    </div>
  );
};
