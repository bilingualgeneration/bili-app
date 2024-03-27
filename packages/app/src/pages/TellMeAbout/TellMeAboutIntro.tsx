import {Intro} from '@/components/Intro';
import biliCharacter from "@/assets/img/bili_in_tshirt.png";
import { IonButton } from "@ionic/react";
import { useProfile } from "@/contexts/ProfileContext";

import audio_en_file from "@/assets/audio/WouldDoAudio/instruction_en.mp3";
import audio_es_file from "@/assets/audio/WouldDoAudio/instruction_es.mp3";
import audio_es_inc_file from "@/assets/audio/WouldDoAudio/instruction_es_inc.mp3";

export const TellMeAboutIntro: React.FC = () => {
  const { isInclusive } = useProfile();
  const texts: any = [
    {
      es: {
	text: 'Cuéntame sobre...',
	subtext: isInclusive
	    ? '¡Te damos la bienvenida  a la actividad "cuéntame sobre"! Encuentra un amigue o una persona mayor. Tomen turnos hablando las cosas que les gustan.' // not sure if this is inclusive
	: '¡Bienvenidos a la actividad "cuéntame sobre"! Encuentra un amigo o un adulto. Túrnense para contarse las cosas que les gustan.',
	audio: isInclusive ? audio_es_inc_file : audio_es_file
      },
      en: {
	text: 'Tell me about...',
	subtext: 'Welcome to the "cuéntame sobre" activity! Find a friend or adult. Take turns telling each other about the things you like.',
	audio: audio_en_file
      }
    }
  ]
  return <Intro texts={texts} image={biliCharacter} nextPath="/tell-me-about-game/select" />;
};
