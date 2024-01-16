import { FC } from "react";
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
import Joyride from "react-joyride";
import { useIntl, FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import StoriesIcon from "@/assets/icons/stories.svg?react";
import PlayIcon from "@/assets/icons/play.svg?react";
import WellnessIcon from "@/assets/icons/wellness.svg?react";
import CommunityIcon from "@/assets/icons/community.svg?react";
import StemIcon from "@/assets/icons/stem.svg?react";
import { StoriesCard } from "@/components/StoriesCard";
import SmallBook from "@/assets/icons/small_book.svg?react";
import SmallArt from "@/assets/icons/small_art.svg?react";
import SmallCommunity from "@/assets/icons/small_community.svg?react";
import SmallFlower from "@/assets/icons/small_flower.svg?react";
import SmallPlay from "@/assets/icons/small_play.svg?react";
import Heart from "@/assets/icons/heart.svg?react";
import Star from "@/assets/icons/star.svg?react";
import { gameControllerOutline } from "ionicons/icons";
import { string } from "zod";
import { Link, useHistory } from "react-router-dom";
import { useReqdActions } from "@/contexts/ReqdActionsContext";

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
        className={`icon${link ? " has-link" : ""}`}
        style={{ backgroundColor }}
      >
        {icon}
      </div>
      <IonText>
        <p>
          <FormattedMessage
            defaultMessage={reactintlId}
            description="icon label"
            id={reactintlId}
          />
        </p>
        {!isImmersive && <p>{englishLabel}</p>}
      </IonText>
    </span>
  );
};

export const StudentDashboard: FC = () => {
  const intl = useIntl();
  const { name, isImmersive } = useProfile();
  const { reqdActions, setReqdActions } = useReqdActions();
  const icons: WaveIcon[] = [
    {
      reactintlId: "common.stories",
      englishLabel: "stories",
      backgroundColor: "#0045a1",
      icon: <StoriesIcon />,
    },
    {
      reactintlId: "common.wellness",
      englishLabel: "wellness",
      backgroundColor: "#ac217b",
      icon: <WellnessIcon />,
    },
    {
      reactintlId: "common.play",
      englishLabel: "play",
      link: "/play",
      backgroundColor: "#ff5709",
      icon: <PlayIcon />,
    },
    {
      reactintlId: "common.community",
      englishLabel: "community",
      backgroundColor: "#23beb9",
      icon: <CommunityIcon />,
    },
  ];
  return (
    <div id="student-landing-page">
      {reqdActions.showSettingsMessage && (
        <Joyride
          callback={(data) => {
            if (data.action === "close") {
              const { showSettingsMessage, ...remainingReqdActions } =
                reqdActions;
              setReqdActions(remainingReqdActions);
            }
          }}
          steps={[
            {
              target: "#footer_settings_button",
              disableBeacon: true,
              content: (
                <FormattedMessage
                  defaultMessage="Click here to customize your child's learning experience"
                  description="Message informing user that they need to go to the settings page to complete their profile"
                  id="reqdActions.goto_settings.message"
                />
              ),
            },
          ]}
        />
      )}
      <div
        className="cards-title background-pattern"
        style={{
          paddingBottom: "2rem",
          paddingTop: "2rem",
          paddingLeft: 100,
        }}
      >
        <h1>
          <FormattedMessage id="landingPage.welcome" values={{ name }} />
        </h1>
        {!isImmersive && <p>Hello {name}!</p>}
      </div>

      <div className="main-block">
        <div className="icons-title">
          <h2 style={{ marginBottom: 10 }}>
            <FormattedMessage id="landingPage.assignments" />
          </h2>
          {!isImmersive && <p>Categories</p>}
        </div>
        {/* icons */}
        <div id="wave-icons">
          <IonGrid>
            <IonRow>
              {icons.map((icon) => (
                <IonCol key={icon.reactintlId} className="ion-text-center">
                  <WaveIcon {...icon} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>

        {/* stories */}
        <div className="stories-story-cards">
          <div className="cards-title">
            <h2>
              <FormattedMessage id="landingPage.stories" />
            </h2>
            {!isImmersive && <p>Stories</p>}
          </div>

          <div
            className="hide-scrollbar"
            style={{
              display: "flex",
              alignItems: "center",
              overflowX: "scroll",
            }}
          >
            <StoriesCard
              title={"Qué es lo que te gusta de ti mismo?"}
              subtitle={"What do you like about yourself?"}
              cover={"/assets/img/drum_image.png"}
              icon={<SmallBook />}
              iconBackroundColor="#0045a1"
              heart={<Heart />}
              //rating={[<Star />, <Star />, <Star />]}
              className="other-card-image"
              isLocked={false}
            />

            <StoriesCard
              title={"Cara de Catrina"}
              subtitle={"Catrina for a Day"}
              cover={"/assets/img/dance_image.png"}
              icon={<SmallBook />}
              iconBackroundColor="#0045A1"
              heart={<Heart />}
              //rating={[<Star />, <Star />, <Star />]}
              className="other-card-image"
              isLocked={false}
            />

            <StoriesCard
              title={"Soy de..."}
              subtitle={"I'm From..."}
              cover={"/assets/img/band_image.png"}
              icon={<SmallBook />}
              iconBackroundColor="#0045a1"
              heart={<Heart />}
              //rating={[<Star />, <Star />, <Star />]}
              className="other-card-image"
              isLocked={false}
            />

            <StoriesCard
              title={"El esqueleto travieso"}
              subtitle={"The Mischievous Skeleton"}
              cover={"/assets/img/mountain_image.png"}
              icon={<SmallBook />}
              iconBackroundColor="#0045a1"
              heart={<Heart />}
              //rating={[<Star />, <Star />, <Star />]}
              className="other-card-image"
              isLocked={false}
            />

            <StoriesCard
              title={"Qué es lo que te gusta de ti mismo?"}
              subtitle={"What do you like about yourself?"}
              cover={"/assets/img/drum_image.png"}
              icon={<SmallBook />}
              iconBackroundColor="#0045a1"
              heart={<Heart />}
              //rating={[<Star />, <Star />, <Star />]}
              className="other-card-image"
              isLocked={false}
            />

            <StoriesCard
              title={"Cara de Catrina"}
              subtitle={"Catrina for a Day"}
              cover={"/assets/img/dance_image.png"}
              icon={<SmallBook />}
              iconBackroundColor="#0045A1"
              heart={<Heart />}
              //rating={[<Star />, <Star />, <Star />]}
              className="other-card-image"
              isLocked={false}
            />

            <StoriesCard
              title={"Soy de..."}
              subtitle={"I'm From..."}
              cover={"/assets/img/band_image.png"}
              icon={<SmallBook />}
              iconBackroundColor="#0045a1"
              heart={<Heart />}
              //rating={[<Star />, <Star />, <Star />]}
              className="other-card-image"
              isLocked={false}
            />

            <StoriesCard
              title={"El esqueleto travieso"}
              subtitle={"The Mischievous Skeleton"}
              cover={"/assets/img/mountain_image.png"}
              icon={<SmallBook />}
              iconBackroundColor="#0045a1"
              heart={<Heart />}
              //rating={[<Star />, <Star />, <Star />]}
              className="other-card-image"
              isLocked={false}
            />
          </div>
        </div>

        {/* wellness */}
        <div className="other-story-cards">
          <div className="cards-title">
            <h2>
              <FormattedMessage id="landingPage.wellness" />
            </h2>
            {!isImmersive && <p>Wellness</p>}
          </div>

          <div
            className="hide-scrollbar"
            style={{
              display: "flex",
              alignItems: "center",
              overflowX: "scroll",
            }}
          >
            <StoriesCard
              title={"Afirmaciones"}
              subtitle={"Affirmations"}
              cover={"/assets/img/drum_image.png"}
              icon={<SmallFlower />}
              iconBackroundColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Respirando hondo"}
              subtitle={"Breathing deeply"}
              cover={"/assets/img/dance_image.png"}
              icon={<SmallFlower />}
              iconBackroundColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Pausa de yoga"}
              subtitle={"Yoga break"}
              cover={"/assets/img/band_image.png"}
              icon={<SmallFlower />}
              iconBackroundColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />

            <StoriesCard
              title={"Mantras musicales"}
              subtitle={"Musical mantras"}
              cover={"/assets/img/mountain_image.png"}
              icon={<SmallFlower />}
              iconBackroundColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />

            <StoriesCard
              title={"Pausa de yoga"}
              subtitle={"Yoga break"}
              cover={"/assets/img/mountain_image.png"}
              icon={<SmallFlower />}
              iconBackroundColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />
          </div>
        </div>

        {/* play */}
        <div className="other-story-cards">
          <div className="cards-title">
            <Link to="/play">
              <h2>
                <FormattedMessage id="landingPage.play" />
              </h2>
              {!isImmersive && <p>Play</p>}
            </Link>
          </div>

          <div
            className="hide-scrollbar"
            style={{
              display: "flex",
              alignItems: "center",
              overflowX: "scroll",
            }}
          >
            <StoriesCard
              title={"Fábrica de cuentos"}
              subtitle={"Story Factory"}
              cover={"/assets/img/card_play_image.png"}
              icon={<SmallPlay />}
              iconBackroundColor="#F48722"
              heart={<Heart />}
              className="other-card-image small"
            />

            <StoriesCard
              title={"El intruso"}
              subtitle={"The intruder"}
              cover={"/assets/img/mountain_image.png"}
              icon={<SmallPlay />}
              iconBackroundColor="#F48722"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Cuenta conmigo"}
              subtitle={"Count with me"}
              cover={"/assets/img/dance_image.png"}
              icon={<SmallPlay />}
              iconBackroundColor="#F48722"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Las Cestas"}
              subtitle={"The baskets"}
              cover={"/assets/img/band_image.png"}
              icon={<SmallPlay />}
              iconBackroundColor="#F48722"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />

            <StoriesCard
              title={"Afirmaciones"}
              subtitle={"Affirmations"}
              cover={"/assets/img/card_play_image.png"}
              icon={<SmallPlay />}
              iconBackroundColor="#F48722"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />
          </div>
        </div>

        {/* Comunidad */}
        <div className="other-story-cards">
          <div className="cards-title">
            <h2>
              <FormattedMessage id="landingPage.community" />
            </h2>
            {!isImmersive && <p>Community</p>}
          </div>

          <div
            className="hide-scrollbar"
            style={{
              display: "flex",
              alignItems: "center",
              overflowX: "scroll",
            }}
          >
            <StoriesCard
              title={"¿Qué harías?"}
              subtitle={"What would you do?"}
              cover={"/assets/img/horse_image.png"}
              icon={<SmallCommunity />}
              iconBackroundColor="#23beb9"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Cuéntame sobre..."}
              subtitle={"Tell me about..."}
              cover={"/assets/img/card_community_image.png"}
              icon={<SmallCommunity />}
              iconBackroundColor="#23beb9"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Cuentos y dichos"}
              subtitle={"Stories and sayings"}
              cover={"/assets/img/star_image.png"}
              icon={<SmallCommunity />}
              iconBackroundColor="#23beb9"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />

            <StoriesCard
              title={"Veo Veo"}
              subtitle={"I Spy"}
              cover={"/assets/img/flowers_image.png"}
              icon={<SmallCommunity />}
              iconBackroundColor="#23beb9"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />

            <StoriesCard
              title={"Veo Veo"}
              subtitle={"I Spy"}
              cover={"/assets/img/flowers_image.png"}
              icon={<SmallCommunity />}
              iconBackroundColor="#23beb9"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
