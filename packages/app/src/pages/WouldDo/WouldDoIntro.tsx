import {Intro} from '@/components/Intro';
import biliCharacter from "@/assets/img/bili_in_tshirt.png";
import { IonButton } from "@ionic/react";
import { useProfile } from "@/contexts/ProfileContext";

import audio_en_file from "@/assets/audio/WouldDoAudio/instruction_en.wav";
import audio_es_file from "@/assets/audio/WouldDoAudio/instruction_es.wav";
import audio_es_inc_file from "@/assets/audio/WouldDoAudio/instruction_es_inc.wav";

export const WouldDoIntro: React.FC = () => {
  const { isInclusive } = useProfile();
  const texts: any = [
    {
      es: {
	text: '¿Qué harías?',
	subtext: isInclusive
	    ? '¡Te damos la bienvenida  a la actividad "qué harías"! Encuentra un amigue o una persona mayor. Tomen turnos hablando sobre lo que harían en cada situación.'
	: '¡Bienvenidos a la actividad “qué harías”! Encuentra un amigo o un adulto. Tomen turnos hablando sobre lo que harían en cada situación.',
	audio: isInclusive ? audio_es_inc_file : audio_es_file
      },
      en: {
	text: 'What Would You Do?',
	subtext: 'Welcome to the "qué harías" activity! Find a friend or adult. Take turns talking about what you would do in each situation. ',
	audio: audio_en_file
      }
    }
  ]
  return <Intro texts={texts} image={biliCharacter} nextPath="/would-do-game/select" />;
};
