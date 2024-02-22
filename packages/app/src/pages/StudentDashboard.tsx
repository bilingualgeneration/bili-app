import { FC } from "react";
import { Carousel } from "@/components/Carousel";
import { ContentCard } from "@/components/ContentCard";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import { useIntl, FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import StoriesIcon from "@/assets/icons/stories.svg?react";
import PlayIcon from "@/assets/icons/play.svg?react";
import WellnessIcon from "@/assets/icons/wellness.svg?react";
import CommunityIcon from "@/assets/icons/community.svg?react";
import { string } from "zod";
import { Link, useHistory } from "react-router-dom";

import AmiguesCover from "@/assets/img/amigues_cover.png";
import "./StudentDashboard.scss";

interface WaveIcon {
  backgroundColor: string;
  englishLabel: string;
  link?: string;
  icon: any; // todo: better typing
  reactintlId: string;
}

const WaveIcon: FC<WaveIcon> = ({
  backgroundColor,
  englishLabel,
  icon,
  link,
  reactintlId,
}) => {
  const { isImmersive } = useProfile();
  const history = useHistory();
  return (
    <span className="wave-icon">
      <div
        onClick={() => {
          if (link) {
            history.push(link);
          }
        }}
        className={`icon${link ? " has-link" : ""} margin-bottom-1`}
        style={{ backgroundColor }}
      >
        {icon}
      </div>
      <IonText>
        <h2 className="text-2xl semibold color-suelo">
          <FormattedMessage
            defaultMessage={reactintlId}
            description="icon label"
            id={reactintlId}
          />
        </h2>
        {!isImmersive && (
          <h2 className="text-lg color-suelo">{englishLabel}</h2>
        )}
      </IonText>
    </span>
  );
};

const wellnessCards = [
  {
    category: "wellness",
    title: "Afirmaciones",
    titleEn: "Affirmations",
    cover: "/assets/img/drum_image.png",
    isLocked: true,
  },
  {
    category: "wellness",
    title: "Respirando hondo",
    titleEn: "Breathing deeply",
    cover: "/assets/img/dance_image.png",
    isLocked: true,
  },
  {
    category: "wellness",
    title: "Pausa de yoga",
    titleEn: "Yoga break",
    cover: "/assets/img/band_image.png",
    isLocked: true,
  },
  {
    category: "wellness",
    title: "Mantras musicales",
    titleEn: "Musical mantras",
    cover: "/assets/img/mountain_image.png",
    isLocked: true,
  },
  {
    category: "wellness",
    title: "Pausa de yoga",
    titleEn: "Yoga break",
    cover: "/assets/img/mountain_image.png",
    isLocked: true,
  },
];

const playCards = [
  {
    category: "play",
    title: "Fábrica de Cuentos",
    titleEn: "Story Factory",
    cover: "/assets/img/card_play_image.png",
    link: "/story-factory-game/intro",
  },
  {
    category: "play",
    title: "El Intruso",
    titleEn: "The intruder",
    cover: "/assets/img/mountain_image.png",
    link: "/intruder-game/intro",
  },
  {
    category: "play",
    title: "Cuenta conmigo",
    titleEn: "Count with me",
    cover: "/assets/img/dance_image.png",
    link: "/count-with-me-game/intro",
  },
  {
    category: "play",
    title: "Las Cestas",
    titleEn: "The baskets",
    cover: "/assets/img/band_image.png",
    isLocked: true,
  },
  {
    category: "play",
    title: "Afirmaciones",
    titleEn: "Affirmations",
    cover: "/assets/img/card_play_image.png",
    isLocked: true,
  },
];

const communityCards = [
  {
    category: "community",
    title: "¿Qué Harías?",
    titleEn: "What would you do?",
    cover: "/assets/img/horse_image.png",
    link: "/would-do-game/intro",
  },
  {
    category: "community",
    title: "Cuéntame Sobre...",
    titleEn: "Tell me about...",
    cover: "/assets/img/card_community_image.png",
    isLocked: true,
  },
  {
    category: "community",
    title: "Cuentos y dichos",
    titleEn: "Stories and sayings",
    cover: "/assets/img/star_image.png",
    isLocked: true,
  },
  {
    category: "community",
    title: "Veo Veo",
    titleEn: "I Spy",
    cover: "/assets/img/flowers_image.png",
    isLocked: true,
  },
  {
    category: "community",
    title: "Veo Veo",
    titleEn: "I Spy",
    cover: "/assets/img/flowers_image.png",
    isLocked: true,
  },
];

export const StudentDashboard: FC = () => {
  const intl = useIntl();
  const { isInclusive, isImmersive } = useProfile();
  const { childProfiles, activeChildProfile } = useChildProfile();
  const { name } = childProfiles[activeChildProfile];

  const storyCards = [
    {
      category: "stories",
      title: isInclusive ? "¡Amigues!" : "¡Amigos!",
      titleEn: "Friends!",
      cover: "/assets/img/amigues_cover.png",
      link: "/stories/f2e347ac-50b0-4d59-b7f8-682e2659c22f",
      isLocked: false,
    },
    {
      category: "stories",
      title: "Cara de Catrina",
      titleEn: "Catrina for a Day",
      cover: "/assets/img/dance_image.png",
      link: "/stories/791c76d0-4835-4fcc-8c75-44a17c606be4",
      isLocked: false
    },
    {
      category: "stories",
      title: "¿Qué es lo que te gusta de ti?",
      titleEn: "What do you like about yourself?",
      cover: "/assets/img/band_image.png",
      link: "/stories/ea4e21a7-ae7c-4ec7-9112-23e19e7a0932",
      isLocked: false,
    },
    {
      category: "stories",
      title: "El esqueleto travieso",
      titleEn: "The Mischievous Skeleton",
      cover: "/assets/img/mountain_image.png",
      link: "/stories/944328dc-bf51-4af3-ba28-a97565a65a43",
      isLocked: false,
    },
  ];

  const icons: WaveIcon[] = [
    {
      reactintlId: "common.stories",
      englishLabel: "Stories",
      backgroundColor: "#0045a1",
      icon: <StoriesIcon />,
    },
    {
      reactintlId: "common.wellness",
      englishLabel: "Wellness",
      backgroundColor: "#ac217b",
      icon: <WellnessIcon />,
    },
    {
      reactintlId: "common.play",
      englishLabel: "Play",
      link: "/play",
      backgroundColor: "#ff5709",
      icon: <PlayIcon />,
    },
    {
      reactintlId: "common.community",
      englishLabel: "Community",
      link: "/community",
      backgroundColor: "#23beb9",
      icon: <CommunityIcon />,
    },
  ];

  return (
    <div id="student-landing-page">
      <div
        className="cards-title background-pattern"
        style={{
          paddingBottom: "4rem",
          paddingTop: "4rem",
          paddingLeft: 100,
          paddingRight: 100,
        }}
      >
        <h1 className="text-5xl color-suelo carousel-header-margin">
          <FormattedMessage
            id="landingPage.welcome"
            defaultMessage="Hello {name}!"
            values={{ name }}
          />
        </h1>
        {!isImmersive && (
          <p className="text-3xl color-english carousel-header-margin">Hello {name}!</p>
        )}
      </div>

      <div style={{ marginLeft: 100, marginRight: 100 }}>
        <div className="icons-title margin-top-3">
          <IonText>
            <h1 className="text-5xl color-suelo carousel-header-margin">
              <FormattedMessage
                id="landingPage.catgories"
                defaultMessage="Categories"
              />
            </h1>
            {!isImmersive && (
              <p className="text-3xl color-english carousel-header-margin">Categories</p>
            )}
          </IonText>
        </div>
        {/* icons */}
        <div id="wave-icons" style={{ marginTop: "4rem", marginLeft: 30, marginRight: 30 }}>
          <IonGrid>
            <IonRow>
              {icons.map((icon) => (
                <IonCol
                  key={icon.reactintlId}
                  className="ion-text-center"
                  size="3"
                >
                  <WaveIcon {...icon} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
        <br />
        <br />

        {/* stories */}
        <div className="stories-story-cards">
          <IonText>
            <h1 className="text-5xl color-suelo carousel-header-margin">
              <FormattedMessage id="common.stories" defaultMessage="Stories" />
            </h1>
            {!isImmersive && <p className="text-3xl color-english carousel-header-margin">Stories</p>}
          </IonText>
          <div className="margin-top-2 margin-bottom-3">
            <Carousel height={274}>
              {storyCards.map((c, index) => (
                <ContentCard {...c} key={index} />
              ))}
            </Carousel>
          </div>
        </div>
        {/* wellness */}
        <div className="other-story-cards">
          <IonText>
            <h1 className="text-5xl color-suelo carousel-header-margin">
              <FormattedMessage
                id="common.wellness"
                defaultMessage="Wellness"
              />
            </h1>
            {!isImmersive && <p className="text-3xl color-english carousel-header-margin">Wellness</p>}
          </IonText>
          <div className="margin-top-2 margin-bottom-3">
            <Carousel height={274}>
              {wellnessCards.map((c, index) => (
                <ContentCard {...c} key={index} />
              ))}
            </Carousel>
          </div>
        </div>

        {/* play */}
        <div className="other-story-cards">
          <IonText>
            <Link to="/play" className="no-text-decoration">
              <h1 className="text-5xl color-suelo carousel-header-margin">
                <FormattedMessage
                  id="common.play"
                  defaultMessage="Play"
                  description="Standalone label for Play"
                />
              </h1>
              {!isImmersive && <p className="text-3xl color-english carousel-header-margin">Play</p>}
            </Link>
          </IonText>
          <div className="margin-top-2 margin-bottom-3">
            <Carousel height={274}>
              {playCards.map((c, index) => (
                <ContentCard {...c} key={index} />
              ))}
            </Carousel>
          </div>
        </div>

        {/* Comunidad */}
        <div className="other-story-cards">
          <Link to="/community" className="no-text-decoration">
            <IonText>
              <h1 className="text-5xl color-suelo carousel-header-margin">
                <FormattedMessage
                  id="common.community"
                  defaultMessage="Community"
                />
              </h1>
              {!isImmersive && (
                <p className="text-3xl color-english carousel-header-margin">Community</p>
              )}
            </IonText>
          </Link>
          <div className="margin-top-2 margin-bottom-3">
            <Carousel height={274}>
              {communityCards.map((c, index) => (
                <ContentCard {...c} key={index} />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};
