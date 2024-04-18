// todo: replace text and audio from intruder to affirmations

import biliCharacter from "@/assets/img/bili_in_coat.png";
import {useProfile} from "@/hooks/Profile";
import {Intro} from '@/components/Intro';

import audio_en_file from "@/assets/audio/IntruderAudio/intruder_instruction_en.mp3";
import audio_es_file from "@/assets/audio/IntruderAudio/intruder_instruction_es.mp3";
import audio_es_inc_file from "@/assets/audio/IntruderAudio/intruder_instruction_es_inc.mp3";

export const AffirmationsIntro: React.FC = () => {
  const {profile: {isInclusive}} = useProfile();
  const texts: any = [
    {
      es: {
	text: "¡Affirmatciones!",
	subtext: isInclusive
	       ? `inclusive text inclusive text inclusive text inclusive text inclusive text`
	       : `text text text text text`,
	audio: isInclusive ? audio_es_inc_file : audio_es_file
      },
      en: {
	text: `Affirmations`,
	subtext: `text text text text text`,
	audio: audio_en_file
      }
    }
  ];
  return (
    <Intro texts={texts} image={biliCharacter} nextPath="/affirmations/select" />
  );
};
