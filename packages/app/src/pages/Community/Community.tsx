import { CommunityHeader } from "@/components/CommunityHeader";
import { IonCard, IonCardContent, IonText } from "@ionic/react";

import { I18nMessage } from "@/components/I18nMessage";
import { Link } from "react-router-dom";
import { ContentLock } from "@/components/ContentLock";

import don_lola from "@/assets/img/don_lola.png";
import nuriah from "@/assets/img/nuriah.png";
import tunita from "@/assets/img/tunita.png";

import "./Community.scss";

const Card: React.FC<any> = ({ image, link, locked, i18nKey }) => {
  const content = (
    <>
      <img src={image} />
      <IonText className="ion-text-center">
        <h1 className="text-3xl semibold color-cielo">
          <I18nMessage id={i18nKey} />
        </h1>
        <I18nMessage
          id={i18nKey}
          level={2}
          wrapper={(t: string) => <p className="text-2xl color-cielo">{t}</p>}
        />
      </IonText>
    </>
  );
  return (
    <div className="community-card">
      {locked && <ContentLock borderRadius="2rem" />}
      {link && (
        <Link to={link} className="no-text-decoration">
          {content}
        </Link>
      )}
      {!link && content}
    </div>
  );
};

export const Community: React.FC = () => {
  const cards = [
    {
      i18nKey: "common.tellMeAbout",
      link: "/tell-me-about/intro",
      image: nuriah,
    },
    {
      i18nKey: "common.wouldDo",
      link: "/would-do/intro",
      image: tunita,
    },
    {
      i18nKey: "common.sayings",
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
