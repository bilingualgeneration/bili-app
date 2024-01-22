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
        <h2 className="color-selva">
          <FormattedMessage
            defaultMessage={reactintlId}
            description="icon label"
            id={reactintlId}
          />
        </h2>
        {!isImmersive && <h2>{englishLabel}</h2>}
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
          locale={{
            close: (
              <FormattedMessage
                id="joyride.close"
                defaultMessage="Close"
                description="Button label to close Joyride"
              />
            ),
          }}
          callback={(data) => {
            if (data.action === "close") {
              const { showSettingsMessage, ...remainingReqdActions } =
                reqdActions;
              setReqdActions(remainingReqdActions);
            }
          }}
          steps={[
            {
              target: "body",
              disableBeacon: true,
              placement: "center",
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
          <FormattedMessage
            id="landingPage.welcome"
            defaultMessage="Hello {name}!"
            values={{ name }}
          />
        </h1>
        {!isImmersive && <p>Hello {name}!</p>}
      </div>

      <div className="main-block">
        <div className="icons-title">
          <IonText>
            <h1>
              <FormattedMessage
                id="landingPage.catgories"
                defaultMessage="Categories"
              />
            </h1>
            {!isImmersive && <h2>Categories</h2>}
          </IonText>
        </div>
        {/* icons */}
        <div id="wave-icons" style={{ marginTop: "4rem", paddingRight: 100 }}>
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
        <br />
        <br />

        {/* stories */}
        <div className="stories-story-cards">
          <IonText>
            <h1 className="color-selva">
              <FormattedMessage id="common.stories" defaultMessage="Stories" />
            </h1>
            {!isImmersive && <h2>Stories</h2>}
          </IonText>

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
        <br />
        <br />
        {/* wellness */}
        <div className="other-story-cards">
          <IonText>
            <h1 className="color-selva">
              <FormattedMessage
                id="common.wellness"
                defaultMessage="Wellness"
              />
            </h1>
            {!isImmersive && <h2>Wellness</h2>}
          </IonText>

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
        <br />
        <br />
        {/* play */}
        <div className="other-story-cards">
          <IonText>
            <Link to="/play">
              <h1 className="color-selva">
                <FormattedMessage
                  id="common.play"
                  defaultMessage="Play"
                  description="Standalone label for Play"
                />
              </h1>
              {!isImmersive && <h2>Play</h2>}
            </Link>
          </IonText>

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
        <br />
        <br />
        {/* Comunidad */}
        <div className="other-story-cards">
          <IonText>
            <h1 className="color-selva">
              <FormattedMessage
                id="common.community"
                defaultMessage="Community"
              />
            </h1>
            {!isImmersive && <h2>Community</h2>}
          </IonText>

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
