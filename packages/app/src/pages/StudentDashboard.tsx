import React from "react";
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
import Heart from "@/assets/icons/heart.svg?react";
import Star from "@/assets/icons/star.svg?react";
import { string } from "zod";
import { Link } from "react-router-dom";
import "./StudentDashboard.css";

export const StudentDashboard: React.FC = () => {
  const intl = useIntl();
  const { name, isImmersive } = useProfile();

  return (
    <div id="student-landing-page">
      <div className="cards-title background-pattern">
        <h1>
          <FormattedMessage id="landingPage.welcome" values={{ name }} />
        </h1>
        <p>Hello {name}!</p>
      </div>

      <div className="">
        <div className="icons-title">
          <h2 style={{ marginBottom: 10 }}>
            <FormattedMessage id="landingPage.assignments" />
          </h2>
          {!isImmersive && <p>Categories</p>}
        </div>
        {/* icons */}
        <div className="wave-icons">
          <IonGrid>
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
              overflowX: "hidden",
            }}
          >
            <StoriesCard
              title={"¡Me gusta como soy!"}
              subtitle={"I like myself"}
              cover={"/assets/img/boot_image.png"}
              icon={<SmallBook />}
              iconBackroungColor="#006A67"
              heart={<Heart />}
              rating={[<Star />, <Star />, <Star />]}
              className="stories-card-image"
              isLocked={false}
            />

            <StoriesCard
              title={"Auto retrato"}
              subtitle={"Self-portrait"}
              cover={"/assets/img/boot_image.png"}
              icon={<SmallArt />}
              iconBackroungColor="#0045A1"
              heart={<Heart />}
              rating={[<Star />, <Star />, <Star />]}
              className="stories-card-image"
              isLocked={false}
            />

            <StoriesCard
              title={"Auto retrato"}
              subtitle={"Self-portrait"}
              cover={"/assets/img/boot_image.png"}
              icon={<SmallCommunity />}
              iconBackroungColor="#F0091B"
              heart={<Heart />}
              rating={[<Star />, <Star />, <Star />]}
              className="stories-card-image"
              isLocked={false}
            />

            <StoriesCard
              title={"Auto retrato"}
              subtitle={"Self-portrait"}
              cover={"/assets/img/boot_image.png"}
              icon={<SmallCommunity />}
              iconBackroungColor="#F0091B"
              heart={<Heart />}
              rating={[<Star />, <Star />, <Star />]}
              className="stories-card-image"
              isLocked={false}
            />

            <StoriesCard
              title={"Auto retrato"}
              subtitle={"Self-portrait"}
              cover={"/assets/img/boot_image.png"}
              icon={<SmallCommunity />}
              iconBackroungColor="#F0091B"
              heart={<Heart />}
              rating={[<Star />, <Star />, <Star />]}
              className="stories-card-image"
              isLocked={false}
            />

            <StoriesCard
              title={"Auto retrato"}
              subtitle={"Self-portrait"}
              cover={"/assets/img/boot_image.png"}
              icon={<SmallArt />}
              iconBackroungColor="#0045A1"
              heart={<Heart />}
              rating={[<Star />, <Star />, <Star />]}
              className="stories-card-image"
              isLocked={true}
            />

            <StoriesCard
              title={"Auto retrato"}
              subtitle={"Self-portrait"}
              cover={"/assets/img/boot_image.png"}
              icon={<SmallArt />}
              iconBackroungColor="#0045A1"
              heart={<Heart />}
              rating={[<Star />, <Star />, <Star />]}
              className="stories-card-image"
              isLocked={true}
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
            }}
          >
            <StoriesCard
              title={"¡Me gusta como soy!"}
              subtitle={"I like myself"}
              cover={"/assets/img/wellness_1.png"}
              icon={<SmallFlower />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"¡Me gusta como soy!"}
              subtitle={"I like myself"}
              cover={"/assets/img/wellness_1.png"}
              icon={<SmallFlower />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"¡Me gusta como soy!"}
              subtitle={"I like myself"}
              cover={"/assets/img/wellness_1.png"}
              icon={<SmallFlower />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
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
            }}
          >
            <StoriesCard
              title={"Afirmaciones"}
              subtitle={"Affirmations"}
              cover={"/assets/img/card_play_image.png"}
              icon={<SmallFlower />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Afirmaciones"}
              subtitle={"Affirmations"}
              cover={"/assets/img/card_play_image.png"}
              icon={<SmallFlower />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Afirmaciones"}
              subtitle={"Affirmations"}
              cover={"/assets/img/card_play_image.png"}
              icon={<SmallFlower />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
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
            }}
          >
            <StoriesCard
              title={"Afirmaciones"}
              subtitle={"Affirmations"}
              cover={"/assets/img/card_community_image.png"}
              icon={<SmallFlower />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Afirmaciones"}
              subtitle={"Affirmations"}
              cover={"/assets/img/card_community_image.png"}
              icon={<SmallFlower />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCard
              title={"Afirmaciones"}
              subtitle={"Affirmations"}
              cover={"/assets/img/card_community_image.png"}
              icon={<SmallFlower />}
              iconBackroungColor="#AC217B"
              heart={<Heart />}
              className="other-card-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
