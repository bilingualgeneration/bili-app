import React from "react";
import { IonButton } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import useStoryFactoryButton from "@/components/StoryFactory/StoryFactoryButtonLogic";
import { useProfile } from "@/contexts/ProfileContext";

interface StoryFactoryButtonProps {
  currentPage: number;
  disabled: boolean;
}

export const StoryFactoryButton: React.FC<StoryFactoryButtonProps> = ({
  currentPage,
  disabled,
}) => {
  const { handleNext } = useStoryFactoryButton(currentPage);
  const { isImmersive } = useProfile();

  return (
    // <div className="story-intro-button-container">
    <IonButton
      className="sf-intro-button"
      disabled={disabled}
      expand="block"
      shape="round"
      type="button"
      onClick={handleNext}
    >
      <div>
        <div className="story-button-bold">
          <FormattedMessage
            id="storyFactory.nextButton"
            defaultMessage="Next"
            description="Button to move to the next page in intro pages"
          />
        </div>
        {!isImmersive && <div className="story-button-reg">Let's Play</div>}
      </div>
    </IonButton>
    // </div>
  );
};
