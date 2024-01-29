import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";

import "./CommunityHeader.scss";

export const CommunityHeader: FC = () => {
  const { isImmersive } = useProfile();
  return (
    <div id="playBanner">
      <h1>
        <FormattedMessage
          id="common.community"
          defaultMessage="Community"
          description="Standalone label for Community"
        />
      </h1>
      {!isImmersive && <h2>Community</h2>}
    </div>
  );
};
