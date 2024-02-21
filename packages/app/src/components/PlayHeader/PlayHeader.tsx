import { FC } from "react";
import { IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";

import "./PlayHeader.scss";

export const PlayHeader: FC = () => {
  const { isImmersive } = useProfile();
  return (
    <div id="playBanner">
      <IonText>
      <h1 className='text-5xl color-nube'>
        <FormattedMessage
          id="common.play"
          defaultMessage="Play"
          description="Standalone label for Play"
        />
      </h1>
      {!isImmersive &&
       <p className='text-3xl color-nube'>
	 Play
       </p>
      }
      </IonText>
    </div>
  );
};
