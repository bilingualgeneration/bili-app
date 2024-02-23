import { FC } from "react";
import {
  IonCard,
  IonCardContent,
  IonText,
} from "@ionic/react";

import { useProfile } from "@/contexts/ProfileContext";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
import { CommunityHeader } from "@/components/CommunityHeader";
import { Link } from "react-router-dom";

import don_lola from "@/assets/img/don_lola.png";
import nuriah from "@/assets/img/nuriah.png";
import tunita from "@/assets/img/tunita.png";

import "./Community.scss";

const Card: FC<any> = ({ image, link, translatedTitle, title }) => {
  const { isImmersive } = useProfile();
  return (
      <div className="community-card">
	<Link to={link} className="no-text-decoration">
          <img src={image} />
          <IonText className="ion-text-center">
            <h1 className='text-3xl semibold color-cielo'>{translatedTitle}</h1>
            {!isImmersive && (
              <h3 className="text-2xl color-cielo">
              {title}
              </h3>
            )}
          </IonText>
	</Link>
      </div>
  );
};

export const Community: FC = () => {
  const intl = useIntl();
  const { isImmersive } = useProfile();
  const cards = [
    {
      translatedTitle: intl.formatMessage({
        id: "common.tellMeAbout",
        defaultMessage: "Tell me about...",
        description: "title for tell me about",
      }),
      title: "Tell me about...",
      link: "/tell-me-about",
      image: nuriah,
      locked: false,
    },
    {
      translatedTitle: intl.formatMessage({
        id: "common.wouldDo",
        defaultMessage: "What would you do?",
        description: "title for what would do",
      }),
      title: "What would you do?",
      link: "/would-do-game/intro",
      image: tunita,
      locked: false,
    },
    {
      translatedTitle: intl.formatMessage({
        id: "common.sayings",
        defaultMessage: "Sayings",
        description: "title for sayings",
      }),
      title: "Sayings",
      image: don_lola,
      locked: true,
    },
  ];
  return (
    <div id="communityPage">
      <CommunityHeader />
      <div id="communityCardWrapper">
        {cards.map((card, index) => (
          <Card {...card} key={index} />
        ))}
      </div>
    </div>
  );
};
