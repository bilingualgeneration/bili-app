import biliCharacter from "@/assets/img/bili_in_coat.png";
import { useProfile } from "@/contexts/ProfileContext";
import {Intro} from '@/components/Intro';

import audio_en_file from "@/assets/audio/CountAudio/instruction_en.mp3";
import audio_es_file from "@/assets/audio/CountAudio/instruction_es.mp3";
import audio_es_inc_file from "@/assets/audio/CountAudio/instruction_es_inc.mp3";

export const CountWithMeIntro: React.FC = () => {
  const { isInclusive } = useProfile();
  const texts: any = [
    {
      es: {
	text: "¡Cuenta conmigo!",
	subtext: isInclusive
	       ? `¡Bienvenides al juego, “Cuenta conmigo”! Practica contando mientras aprendes sobre diferentes temas y cosas.`
	       : `¡Bienvenidos al juego, “Cuenta conmigo”! Practica contando mientras aprendes sobre diferentes temas y cosas.`,
	audio: isInclusive ? audio_es_inc_file : audio_es_file
      },
      en: {
	text: `Count With Me`,
	subtext: `Welcome to  the “Count With Me” game! Practice counting while learning about different topics and things. `,
	audio: audio_en_file
      }
    }
  ];
  return (
    <Intro texts={texts} image={biliCharacter} nextPath="/count-with-me-game/select" />
  );
};
