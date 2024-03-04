
import { useProfile } from "@/contexts/ProfileContext";
import { IonText } from "@ionic/react";
import { FC } from "react";
import AffirmationGirl from "@/assets/img/affirmation_girl.png";
import BreathingGirl from "@/assets/img/breathing_girl.png";
import { CategoryTag } from "@/components/CategoryTag";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useHistory } from "react-router";
import "./Wellness.scss";
import "../Play/Play.scss";

const PlayHeader: FC = () => {
    const { isImmersive, isInclusive } = useProfile();
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
    const { isImmersive } = useProfile();
    const history = useHistory();
    const rotationStyle = {
      transform: `rotate(${rotation}deg)`,
  };

    return (
      <div
        id=""
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

  const AffirmationCard: FC = () => {
    const { isImmersive } = useProfile();
    const history = useHistory();
    return (
      <div
        id="affirmation-card"
        className="card"
        onClick={() => {
         // history.push("/intruder-game/intro");
        }}
      >
        <CategoryTag category="affirmation" className="play-category-tag" />
        <FavoriteButton fid="category-the intruder" />
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
    const { isImmersive } = useProfile();
    const history = useHistory();
    return (
      <div
        id="yoga-card"
        className="card"
        onClick={() => {
         // history.push("/intruder-game/intro");
        }}
      >
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
    const { isImmersive } = useProfile();
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