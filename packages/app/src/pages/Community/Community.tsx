import { FC } from "react";
import { IonCard, IonCardContent, IonText } from "@ionic/react";

import { useLanguageToggle } from "@/components/LanguageToggle";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
import { CommunityHeader } from "@/components/CommunityHeader";
import { Link } from "react-router-dom";
import Lock from "@/assets/icons/lock.svg?react";

import don_lola from "@/assets/img/don_lola.png";
import nuriah from "@/assets/img/nuriah.png";
import tunita from "@/assets/img/tunita.png";

import "./Community.scss";

const Card: FC<any> = ({ image, link, locked, translatedTitle, title }) => {
  const { language } = useLanguageToggle();
  const content = (
    <>
      <img src={image} />
      <IonText className="ion-text-center">
        <h1 className="text-3xl semibold color-cielo">
          {language === "en" ? title : translatedTitle}
        </h1>
        {language === "esen" && (
          <h3 className="text-2xl color-cielo">{title}</h3>
        )}
      </IonText>
    </>
  );
  return (
    <div className="community-card">
      {locked && (
        <div className="content-lock">
          <Lock />
        </div>
      )}
      {link && (
        <Link to={link} className="no-text-decoration">
          {content}
        </Link>
      )}
      {!link && content}
    </div>
  );
};

export const Community: FC = () => {
  const intl = useIntl();
  const cards = [
    {
      translatedTitle: intl.formatMessage({
        id: "common.tellMeAbout",
        defaultMessage: "Tell me about...",
        description: "title for tell me about",
      }),
      title: "Tell me about...",
      link: "/tell-me-about/intro",
      image: nuriah,
    },
    {
      translatedTitle: intl.formatMessage({
        id: "common.wouldDo",
        defaultMessage: "What would you do?",
        description: "title for what would do",
      }),
      title: "What would you do?",
      link: "/would-do/intro",
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
