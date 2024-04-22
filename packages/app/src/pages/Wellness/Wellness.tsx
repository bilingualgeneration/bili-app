import { useProfile } from "@/hooks/Profile";
import { IonText } from "@ionic/react";
import { FC } from "react";
import AffirmationGirl from "@/assets/img/affirmation_girl.png";
import BreathingGirl from "@/assets/img/breathing_girl.png";
import { CategoryTag } from "@/components/CategoryTag";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useHistory } from "react-router";
import Lock from "@/assets/icons/lock.svg?react";
import "./Wellness.scss";
import "../Play/Play.scss";

const PlayHeader: FC = () => {
    const { profile: {isImmersive, isInclusive} } = useProfile();
    return (
      <div className="headerBanner">
        <IonText>
        <h1 className='text-5xl color-nube'>
        Bienestar
        </h1>
        {!isImmersive &&
         <p className='text-3xl color-nube'>
            Wellness
         </p>
        }
        </IonText>
      </div>
    );
  };

  const AnotherCard: FC<{ rotation?: number }> = ({ rotation = 0 }) => {
    const { profile: {isImmersive} } = useProfile();
    const history = useHistory();
    const rotationStyle = {
      transform: `rotate(${rotation}deg)`,
  };

    return (
      <div
        className="card another-cards"
        style={rotationStyle}
        onClick={() => {
         // history.push("/intruder-game/intro");
        }}
      >
        <CategoryTag category="other_wellness" className="play-category-tag" />
        <FavoriteButton fid="category-the intruder" />
        {/* <img src={AffirmationGirl} />
        <IonText>
          <h1 className="text-4xl semibold">
          Afirmaciones
          </h1>
  
          {!isImmersive && <p className="text-3xl color-nube">Affirmations</p>}
        </IonText> */}
      </div>
    );
  };


// todo: change mouse cursor to pointer
  const AffirmationCard: FC = () => {
    const { profile: {isImmersive} } = useProfile();
    const history = useHistory();
    return (
      <div
        id="affirmation-card"
        className="card"
        onClick={() => {
          history.push("/affirmations/intro");
        }}
      >
        <CategoryTag category="affirmation" className="play-category-tag" />
        <FavoriteButton fid="category-affirmations" />
        <img src={AffirmationGirl} />
        <IonText>
          <h1 className="text-4xl semibold color-flamenco-lowest">
            Afirmaciones
          </h1>
	  
          {!isImmersive && <p className="text-3xl color-flamenco-lowest">Affirmations</p>}
        </IonText>
      </div>
    );
  };


  const YogaCard: FC = () => {
    const { profile: {isImmersive }} = useProfile();
    const history = useHistory();
    return (
      <div
        id="yoga-card"
        className="card"
        onClick={() => {
         // history.push("/intruder-game/intro");
        }}
      >
        <div className="content-lock">
          <Lock />
        </div>
        <CategoryTag category="yoga" className="play-category-tag" />
        <FavoriteButton fid="category-the intruder" />
        <img src={BreathingGirl} />
        <IonText>
          <h1 className="text-4xl semibold color-flamenco-lowest">
          Respirando hondo
          </h1>
  
          {!isImmersive && <p className="text-3xl color-flamenco-lowest">Breathing deeply</p>}
        </IonText>
      </div>
    );
  };


export const Wellness: FC = () => {
    const { profile: {isImmersive} } = useProfile();
    return (
      <div id="wellnessPage">
        <PlayHeader />
        <div className="main-block">
          <AnotherCard rotation={15}/>
          <AffirmationCard/> 
          <YogaCard/>
          <AnotherCard rotation={-15}/>
        </div>
        
      </div>
    );
  };
