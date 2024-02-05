import { FC } from "react";
import { IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";

import "./CommunityHeader.scss";

export const CommunityHeader: FC = () => {
  const { isImmersive } = useProfile();
  return (
    <div id="communityBanner">
      <IonText>
        <h1>
          <FormattedMessage
            id="common.community"
            defaultMessage="Community"
            description="Standalone label for Community"
          />
        </h1>
        {!isImmersive && <h2>Community</h2>}
      </IonText>
    </div>
  );
};
