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
import {useLanguageToggle} from '@/components/LanguageToggle';

const PlayHeader: FC = () => {
  const {language} = useLanguageToggle();
  return (
    <div className="headerBanner">
      <IonText>
        <h1 className='text-5xl color-nube'>
	  {(language === 'es' || language === 'esen') && 'Bienestar'}
	  {language === 'en' && 'Wellness'}
        </h1>
        {language === 'esen' &&
         <p className='text-3xl color-nube'>
           Wellness
         </p>
        }
      </IonText>
    </div>
  );
};

  const AnotherCard: FC<{ rotation?: number }> = ({ rotation = 0 }) => {
    const rotationStyle = {
      transform: `rotate(${rotation}deg)`,
    };
    
    return (
      <div
        className="card another-cards"
        style={rotationStyle}
      >
        <CategoryTag category="other_wellness" className="play-category-tag" />
        <FavoriteButton fid="category-the intruder" />
      </div>
    );
  };


// todo: change mouse cursor to pointer
  const AffirmationCard: FC = () => {
    const {language} = useLanguageToggle();
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
	  {(language === 'es' || language === 'esen') && 'Afirmaciones'}
	  {language === 'en' && 'Affirmations'}
          </h1>
	  
          {language === 'esen' && <p className="text-3xl color-flamenco-lowest">Affirmations</p>}
        </IonText>
      </div>
    );
  };


const YogaCard: FC = () => {
  const {language} = useLanguageToggle();
    return (
      <div
        id="yoga-card"
        className="card"
      >
        <div className="content-lock">
          <Lock />
        </div>
        <CategoryTag category="yoga" className="play-category-tag" />
        <FavoriteButton fid="category-the intruder" />
        <img src={BreathingGirl} />
        <IonText>
          <h1 className="text-4xl semibold color-flamenco-lowest">
	  {(language === 'es' || language === 'esen') && 'Respirando hondo'}
	  {language === 'en' && 'Breathing Deeply'}
          
          </h1>
  
          {language === 'esen' && <p className="text-3xl color-flamenco-lowest">Breathing deeply</p>}
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
