import { FC } from "react";
import { IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/hooks/Profile";

import "./CommunityHeader.scss";

export const CommunityHeader: FC = () => {
  const { profile: {isImmersive} } = useProfile();
  return (
    <div id="communityBanner">
      <IonText>
        <h1 className='text-5xl color-suelo'>
          <FormattedMessage
            id="common.community"
            defaultMessage="Community"
            description="Standalone label for Community"
          />
        </h1>
        {!isImmersive &&
	 <p className='text-3xl color-suelo'>
	   Community
	 </p>
	}
      </IonText>
    </div>
  );
};
