import { useProfile } from "@/hooks/Profile";

import { Carousel } from "@/components/Carousel";
import classnames from "classnames";
import { ContentCard } from "@/components/ContentCard";
import { ContentLock } from "@/components/ContentLock";
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
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useStudent } from "@/hooks/Student";
import StoriesIcon from "@/assets/icons/stories.svg?react";
import PlayIcon from "@/assets/icons/play.svg?react";
import WellnessIcon from "@/assets/icons/wellness.svg?react";
import CommunityIcon from "@/assets/icons/community.svg?react";
import { Link, useHistory } from "react-router-dom";
import { I18nMessage } from "@/components/I18nMessage";
import { text } from "ionicons/icons";
import { useI18n } from "@/hooks/I18n";
import "./StudentDashboard.scss";

interface WaveIcon {
  backgroundColor: string;
  link?: string;
  icon: any; // todo: better typing
  reactintlId: string;
}

const WaveIcon: React.FC<WaveIcon> = ({
  backgroundColor,
  icon,
  link,
  reactintlId,
}) => {
  const {
    profile: { isImmersive },
  } = useProfile();
  const { language } = useLanguageToggle();
  const history = useHistory();
  return (
    <span className={classnames("wave-icon", { locked: Boolean(link) })}>
      <div
        onClick={() => {
          if (link) {
            history.push(link);
          }
        }}
        className={`icon${link ? " has-link" : ""} margin-bottom-1`}
        style={{ backgroundColor }}
      >
        {!link && <ContentLock borderRadius="50%" />}
        {icon}
      </div>
      <IonText>
        <h2 className="text-2xl semibold color-suelo">
          <I18nMessage id={reactintlId} />
        </h2>
        <I18nMessage
          id={reactintlId}
          level={2}
          wrapper={(text: string) => (
            <p className="text-lg color-english">{text}</p>
          )}
        />
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
    //link: "/story-factory-game/intro",
    isLocked: true,
  },
  {
    category: "play",
    title: "El Intruso",
    titleEn: "The intruder",
    cover: "/assets/img/mountain_image.png",
    //link: "/intruder-game/intro",
    isLocked: true,
  },
  {
    category: "play",
    title: "Cuenta conmigo",
    titleEn: "Count with me",
    cover: "/assets/img/dance_image.png",
    //link: "/count-with-me-game/intro",
    isLocked: true,
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
    link: "/would-do/intro",
  },
  {
    category: "community",
    title: "Cuéntame Sobre...",
    titleEn: "Tell me about...",
    cover: "/assets/img/card_community_image.png",
    link: "/tell-me-about/intro",
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
];

const Banner: React.FC = () => {
  const { firstName } = useStudent();
  const { language } = useLanguageToggle();
  return (
    <div
      className="cards-title background-pattern"
      style={{
        paddingBottom: "2rem",
        paddingTop: "2rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <I18nMessage
        id="landingPage.welcome"
        wrapper={(text: string) => (
          <h1 className="text-5xl color-suelo carousel-header-margin">
            {text + " " + firstName + "!"}
          </h1>
        )}
      />
      <I18nMessage
        id="landingPage.welcome"
        level={2}
        wrapper={(text: string) => (
          <p className="text-3xl color-english carousel-header-margin">
            {text + " " + firstName + "!"}
          </p>
        )}
      />
    </div>
  );
};

export const StudentDashboard: React.FC = () => {
  const intl = useIntl();
  const {
    profile: { isInclusive },
  } = useProfile();
  const { language } = useLanguageToggle();

  const { getText } = useI18n();

  const comingSoonPill = {
    primaryText:
      getText("pages.storiesLandingPage.comingSoon") || "Próximamente",
    secondaryText:
      getText("pages.storiesLandingPage.comingSoon", 2) || "Coming Soon",
  };

  const icons: WaveIcon[] = [
    {
      reactintlId: "common.stories",
      link: "/stories",
      backgroundColor: "#0045a1",
      icon: <StoriesIcon />,
    },
    {
      reactintlId: "common.wellness",
      backgroundColor: "#ac217b",
      //link: "/wellness",
      icon: <WellnessIcon />,
    },
    {
      reactintlId: "common.play",
      //link: "/play",
      backgroundColor: "#ff5709",
      icon: <PlayIcon />,
    },
    {
      reactintlId: "common.community",
      link: "/community",
      backgroundColor: "#23beb9",
      icon: <CommunityIcon />,
    },
  ];

  return (
    <div id="student-landing-page">
      <Banner />
      <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
        <div className="icons-title margin-top-3">
          <IonText>
            <I18nMessage
              id="landingPage.catgories"
              wrapper={(text: string) => (
                <h1 className="text-5xl color-suelo carousel-header-margin">
                  {text}
                </h1>
              )}
            />
            <I18nMessage
              id="landingPage.catgories"
              level={2}
              wrapper={(text: string) => (
                <p className="text-3xl color-english carousel-header-margin">
                  {text}
                </p>
              )}
            />
          </IonText>
        </div>
        {/* icons */}
        <div id="wave-icons" className="margin-top-3">
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

        {/* stories */}
        <div className="stories-story-cards">
          <IonText>
            <Link to="/stories" className="no-text-decoration">
              <h1 className="text-5xl color-suelo carousel-header-margin">
                <I18nMessage id="common.stories" />
              </h1>
              <I18nMessage
                id={"common.stories"}
                level={2}
                wrapper={(text: string) => (
                  <p className="text-3xl color-english carousel-header-margin">
                    {text}
                  </p>
                )}
              />
            </Link>
          </IonText>
          <div className="margin-top-2 margin-bottom-3">
            <PackSelect
              translatedTitle={"Cuentos"}
              englishTitle={"Stories"}
              category={"story"}
              module={"story"}
              only_cards={true}
              pack_name_field={"title"}
              sortBy="order"
            />
          </div>
        </div>
        {/* wellness */}
        <div className="other-story-cards">
          <IonText>
            {/*<Link to="/wellness" className="no-text-decoration">*/}
            <h1 className="text-5xl color-suelo carousel-header-margin">
              <I18nMessage id="common.wellness" />
            </h1>
            <I18nMessage
              id={"common.wellness"}
              level={2}
              wrapper={(text: string) => (
                <p className="text-3xl color-english carousel-header-margin">
                  {text}
                </p>
              )}
            />
            {/*</Link>*/}
          </IonText>
          <div className="margin-top-2 margin-bottom-3">
            <Carousel height={"17rem"}>
              {wellnessCards.map((c, index) => (
                <ContentCard
                  key={index}
                  pills={c.isLocked ? [comingSoonPill] : undefined}
                  {...c}
                />
              ))}
            </Carousel>
          </div>
        </div>

        {/* play */}
        <div className="other-story-cards">
          <IonText>
            {/*<Link to="/play" className="no-text-decoration">*/}
            <h1 className="text-5xl color-suelo carousel-header-margin">
              <I18nMessage id="common.play" />
            </h1>
            <I18nMessage
              id={"common.play"}
              level={2}
              wrapper={(text: string) => (
                <p className="text-3xl color-english carousel-header-margin">
                  {text}
                </p>
              )}
            />
            {/*</Link>*/}
          </IonText>
          <div className="margin-top-2 margin-bottom-3">
            <Carousel height={"17rem"}>
              {playCards.map((c, index) => (
                <ContentCard
                  key={index}
                  pills={c.isLocked ? [comingSoonPill] : undefined}
                  {...c}
                />
              ))}
            </Carousel>
          </div>
        </div>

        {/* Comunidad */}
        <div className="other-story-cards">
          <Link to="/community" className="no-text-decoration">
            <IonText>
              <h1 className="text-5xl color-suelo carousel-header-margin">
                <I18nMessage id="common.community" />
              </h1>
              <I18nMessage
                id={"common.community"}
                level={2}
                wrapper={(text: string) => (
                  <p className="text-3xl color-english carousel-header-margin">
                    {text}
                  </p>
                )}
              />
            </IonText>
          </Link>
          <div className="margin-top-2 margin-bottom-3">
            <Carousel height={"17rem"}>
              {communityCards.map((c, index) => (
                <ContentCard
                  key={index}
                  pills={c.isLocked ? [comingSoonPill] : undefined}
                  {...c}
                />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};
