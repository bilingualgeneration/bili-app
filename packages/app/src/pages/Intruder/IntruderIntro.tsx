import biliCharacter from "@/assets/img/bili_in_coat.png";
import { useProfile } from "@/hooks/Profile";
import {Intro} from '@/components/Intro';

import audio_en_file from "@/assets/audio/IntruderAudio/intruder_instruction_en.mp3";
import audio_es_file from "@/assets/audio/IntruderAudio/intruder_instruction_es.mp3";
import audio_es_inc_file from "@/assets/audio/IntruderAudio/intruder_instruction_es_inc.mp3";

import "./Intruder.scss";

export const IntruderIntro: React.FC = () => {
  const { profile: {isInclusive} } = useProfile();
  const texts: any = [
    {
      es: {
	text: "¡El Intruso!",
	subtext: isInclusive
	       ? `¡Bienvenides al juego, "El intruso"! El objetivo de este juego es identificar la palabra que no rima con el resto.`
	       : `¡Bienvenidos al juego, "El intruso"! El objetivo de este juego es identificar la palabra que no rima con el resto.`,
	audio: isInclusive ? audio_es_inc_file : audio_es_file
      },
      en: {
	text: `The Intruder`,
	subtext: `Welcome to "The Intruder" game! The goal of this game is to identify the word that does not rhyme with the rest.`,
	audio: audio_en_file
      }
    }
  ];
  return (
    <Intro texts={texts} image={biliCharacter} nextPath="/intruder-game/select" />
  );
};
