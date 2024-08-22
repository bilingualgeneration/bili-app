import {useProfile} from '@/hooks/Profile';

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
import { PackSelect } from "@/components/PackSelect";
import { useIntl, FormattedMessage } from "react-intl";
import {useLanguageToggle} from '@/components/LanguageToggle';
import {useStudent} from '@/hooks/Student';
import StoriesIcon from "@/assets/icons/stories.svg?react";
import PlayIcon from "@/assets/icons/play.svg?react";
import WellnessIcon from "@/assets/icons/wellness.svg?react";
import CommunityIcon from "@/assets/icons/community.svg?react";
import { string } from "zod";
import { Link, useHistory } from "react-router-dom";

import AmiguesCover from "@/assets/img/amigues_cover.png";
import CatrinaCover from '@/assets/img/catrina.png';
import GustaCover from '@/assets/img/gusta.png';
import "./StudentDashboard.scss";

interface WaveIcon {
  backgroundColor: string;
  englishLabel: string;
  link?: string;
  icon: any; // todo: better typing
  reactintlId: string;
}

const WaveIcon: React.FC<WaveIcon> = ({
  backgroundColor,
  englishLabel,
  icon,
  link,
  reactintlId,
}) => {
  const {profile: {isImmersive}} = useProfile();
  const {language} = useLanguageToggle();
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
        {language === 'esen' && (
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
    link: "/affirmations/intro",
    isLocked: false,
  },
  {
    category: "wellness",
    title: "Pausa de yoga",
    titleEn: "Yoga break",
    cover: "/assets/img/mountain_image.png",
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
    link: "/tell-me-about-game/intro"
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
  }
];

const Banner: React.FC = () => {
  const {firstName} = useStudent();
  const {language} = useLanguageToggle();
  return <div
           className="cards-title background-pattern"
           style={{
             paddingBottom: "2rem",
             paddingTop: "2rem",
             paddingLeft: 20,
             paddingRight: 20,
           }}>
    <h1 className="text-5xl color-suelo carousel-header-margin">
      <FormattedMessage
        id="landingPage.welcome"
        defaultMessage="Hello {firstName}!"
        values={{ firstName }}
      />
    </h1>
    {language === 'esen' && (
      <p className="text-3xl color-english carousel-header-margin">Hello {firstName}!</p>
        )}
  </div>;
}

export const StudentDashboard: React.FC = () => {
  const intl = useIntl();
  const {
    profile: {
      isInclusive,
    }
  } = useProfile();
  const {language} = useLanguageToggle();
  const isImmersive = true;

  const icons: WaveIcon[] = [
    {
      reactintlId: "common.stories",
      englishLabel: "Stories",
      link: "/stories",
      backgroundColor: "#0045a1",
      icon: <StoriesIcon />,
    },
    {
      reactintlId: "common.wellness",
      englishLabel: "Wellness",
      backgroundColor: "#ac217b",
      link: "/wellness",
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
      <Banner />
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <div className="icons-title margin-top-3">
          <IonText>
            <h1 className="text-5xl color-suelo carousel-header-margin">
              <FormattedMessage
                id="landingPage.catgories"
                defaultMessage="Categories"
              />
            </h1>
            {language === 'esen' && (
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
            <Link to="/stories" className="no-text-decoration">
            <h1 className="text-5xl color-suelo carousel-header-margin">
              <FormattedMessage id="common.stories" defaultMessage="Stories" />
            </h1>
            {language === 'esen' && <p className="text-3xl color-english carousel-header-margin">Stories</p>}
	    </Link>
          </IonText>
          <div className="margin-top-2 margin-bottom-3">
          <PackSelect 
            translatedTitle={"Cuentos"} 
            englishTitle={"Stories"} 
            category={"story"} 
            module={"story"}
	    only_cards={true}
            pack_name_field = {"title"}
	    sortBy='order'
          />
          </div>
        </div>
        {/* wellness */}
        <div className="other-story-cards">
          <IonText>
            <Link to="/wellness" className="no-text-decoration">
            <h1 className="text-5xl color-suelo carousel-header-margin">
              <FormattedMessage
                id="common.wellness"
                defaultMessage="Wellness"
              />
            </h1>
            {language === 'esen' && <p className="text-3xl color-english carousel-header-margin">Wellness</p>}
	    </Link>
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
              {language === 'esen' && <p className="text-3xl color-english carousel-header-margin">Play</p>}
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
              {language === 'esen' && (
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
