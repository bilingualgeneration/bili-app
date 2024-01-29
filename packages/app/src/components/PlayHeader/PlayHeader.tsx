import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";

import "./PlayHeader.scss";

export const PlayHeader: FC = () => {
  const { isImmersive } = useProfile();
  return (
    <div id="playBanner">
      <h1>
        <FormattedMessage
          id="common.play"
          defaultMessage="Play"
          description="Standalone label for Play"
        />
      </h1>
      {!isImmersive && <h2>Play</h2>}
    </div>
  );
};
