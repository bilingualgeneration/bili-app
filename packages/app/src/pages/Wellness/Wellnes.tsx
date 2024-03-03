
import { useProfile } from "@/contexts/ProfileContext";
import { IonText } from "@ionic/react";
import { FC } from "react";


const PlayHeader: FC = () => {
    const { isImmersive, isInclusive } = useProfile();
    return (
      <div id="headerBanner">
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



export const Wellness: FC = () => {
    const { isImmersive } = useProfile();
    return (
      <div id="wellnessPage">
        <PlayHeader />
            
      </div>
    );
  };