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
  IonModal,
  IonRow,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import { useIntl, FormattedMessage } from "react-intl";
import { IconWithText } from "@/components/IconWithText";
import { useProfile } from "@/contexts/ProfileContext";
import MeGustaIcon from "@/assets/icons/me_gusta.svg?react";
import PlayIcon from "@/assets/icons/play.svg?react";
import BieneStarIcon from "@/assets/icons/bienestar.svg?react";
import ComunidadIcon from "@/assets/icons/comunidad.svg?react";
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

import "./StudentDashboard.css";

const SettingsModal: FC = () => {
  const { reqdActions, setReqdActions } = useReqdActions();
  const history = useHistory();
  const clearReqdAction = () => {
    const { redirectToSettings, ...remainingReqdActions } = reqdActions;
    setReqdActions(remainingReqdActions);
  };
  return (
    <>
      <IonModal isOpen={true} onWillDismiss={clearReqdAction}>
        <div className="ion-padding ion-text-center">
          <IonText>
            <h2>
              <FormattedMessage
                defaultMessage="To complete your profile, go to the settings page!"
                description="Message informing user that they need to go to the settings page to complete their profile"
                id="reqdActions.goto_settings.message"
              />
            </h2>
          </IonText>
          <IonButton
            onClick={() => {
              clearReqdAction();
              history.push("/settings/overview");
            }}
          >
            <FormattedMessage
              defaultMessage="Go to Settings"
              description="Button label to redirect user to settings page"
              id="reqdActions.goto_settings.button"
            />
          </IonButton>
        </div>
      </IonModal>
    </>
  );
};

export const StudentDashboard: FC = () => {
  const intl = useIntl();
  const { name, isImmersive } = useProfile();
  const { reqdActions, setReqdActions } = useReqdActions();

  return (
    <div id="student-landing-page">
      {reqdActions.redirectToSettings && <SettingsModal />}
      <div className="cards-title background-pattern">
        <h1>
          <FormattedMessage id="landingPage.welcome" values={{ name }} />
        </h1>
        <p>Hello {name}!</p>
      </div>

      <div className="main-block">
        <div className="icons-title">
          <h2 style={{ marginBottom: 10 }}>
            <FormattedMessage id="landingPage.assignments" />
          </h2>
          {!isImmersive && <p>Categories</p>}
        </div>
        {/* icons */}
        <div className="wave-icons">
          <img
            src="/assets/img/wave_frame.png"
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
          {/* <IonGrid>
            <IonRow>
              <IonCol className="col-custom-position-1">
                <IconWithText
                  title={"Cuentos!"}
                  subtitle={"Stories"}
                  icon={<MeGustaIcon />}
                  iconBackgroundColor="#006A67"
                />
              </IonCol>
              <IonCol className="col-custom-position-2">
                <IconWithText
                  title={"Bienestar"}
                  subtitle={"Welness"}
                  icon={<BieneStarIcon />}
                  iconBackgroundColor="#AC217B"
                />
              </IonCol>
              <IonCol className="col-custom-position-3">
                <IconWithText
                  title={"Juego"}
                  subtitle={"Play"}
                  url="/play"
                  icon={<PlayIcon />}
                  iconBackgroundColor="#FF5708"
                />
              </IonCol>
              <IonCol className="col-custom-position-4">
                <IconWithText
                  title={"Comunidad"}
                  subtitle={"Community"}
                  icon={<ComunidadIcon />}
                  iconBackgroundColor="#22BEB9"
                />
              </IonCol>
            </IonRow>
          </IonGrid> */}
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
              iconBackroungColor="#006A67"
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
              iconBackroungColor="#0045A1"
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
              iconBackroungColor="#F0091B"
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
              iconBackroungColor="#F0091B"
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
              iconBackroungColor="#006A67"
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
              iconBackroungColor="#0045A1"
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
              iconBackroungColor="#F0091B"
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
              iconBackroungColor="#F0091B"
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
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Respirando hondo"}
              subtitle={"Breathing deeply"}
              cover={"/assets/img/dance_image.png"}
              icon={<SmallFlower />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Pausa de yoga"}
              subtitle={"Yoga break"}
              cover={"/assets/img/band_image.png"}
              icon={<SmallFlower />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />

            <StoriesCard
              title={"Mantras musicales"}
              subtitle={"Musical mantras"}
              cover={"/assets/img/mountain_image.png"}
              icon={<SmallFlower />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />

            <StoriesCard
              title={"Pausa de yoga"}
              subtitle={"Yoga break"}
              cover={"/assets/img/mountain_image.png"}
              icon={<SmallFlower />}
              iconBackroungColor="#AC217B"
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
              iconBackroungColor="#F48722"
              heart={<Heart />}
              className="other-card-image small"
            />

            <StoriesCard
              title={"El intruso"}
              subtitle={"The intruder"}
              cover={"/assets/img/mountain_image.png"}
              icon={<SmallPlay />}
              iconBackroungColor="#F48722"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Cuenta conmigo"}
              subtitle={"Count with me"}
              cover={"/assets/img/dance_image.png"}
              icon={<SmallPlay />}
              iconBackroungColor="#F48722"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Las Cestas"}
              subtitle={"The baskets"}
              cover={"/assets/img/band_image.png"}
              icon={<SmallPlay />}
              iconBackroungColor="#F48722"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />

            <StoriesCard
              title={"Afirmaciones"}
              subtitle={"Affirmations"}
              cover={"/assets/img/card_play_image.png"}
              icon={<SmallPlay />}
              iconBackroungColor="#F48722"
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
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Cuéntame sobre..."}
              subtitle={"Tell me about..."}
              cover={"/assets/img/card_community_image.png"}
              icon={<SmallCommunity />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Cuentos y dichos"}
              subtitle={"Stories and sayings"}
              cover={"/assets/img/star_image.png"}
              icon={<SmallCommunity />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />

            <StoriesCard
              title={"Veo Veo"}
              subtitle={"I Spy"}
              cover={"/assets/img/flowers_image.png"}
              icon={<SmallCommunity />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />

            <StoriesCard
              title={"Veo Veo"}
              subtitle={"I Spy"}
              cover={"/assets/img/flowers_image.png"}
              icon={<SmallCommunity />}
              iconBackroungColor="#AC217B"
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
