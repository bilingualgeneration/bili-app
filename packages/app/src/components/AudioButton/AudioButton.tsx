import { IonText, IonIcon, IonPopover, IonList, IonItem, IonContent, IonButton, IonLabel } from "@ionic/react";
import { useProfile } from "@/hooks/Profile";
import { starSharp } from "ionicons/icons";
import Avatar from "@/assets/icons/avatar.png";
import StudentAvatar from "@/assets/icons/avatar_profile.svg";
import StudentLogout from "@/assets/icons/logout.svg";
import { Link } from "react-router-dom";
import "./AudioButton.scss";
import { useRef, useState } from "react";
import { useLanguageToggle } from "../LanguageToggle";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import volumeButton from "@/assets/icons/sf_audio_button.svg";

interface AudioButtonProps {
  audio: {
    en: { url: string };
    es: { url: string };
    
  };
}


export const AudioButton: React.FC<AudioButtonProps> = ({ audio }) => {
  const { addAudio, clearAudio } = useAudioManager();
  const { language } = useLanguageToggle();


  return (

    <>
      <div>
        <IonButton
          size='small'
          fill='clear'
          className='stories-volume-button'
          onClick={() => {
            let audios = [];
            switch(language){
              case 'en':
                      audios.push(audio.en.url);
                break;
              case 'es':
                      audios.push(audio.es.url);
                break;
              case 'esen':
                      audios.push(audio.es.url);
                      audios.push(audio.en.url);
                break;
              default:
          
                break;
            }
            
            addAudio(audios);
          }}
        >
          <img className="stories-volume-icon" src={volumeButton} />
        </IonButton>
      </div>

    </>
  );
};
