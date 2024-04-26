// todo: replace text and audio from intruder to affirmations

import biliCharacter from "@/assets/img/bili_in_tshirt.png";
import {useProfile} from "@/hooks/Profile";
import {Intro} from '@/components/Intro';

import audio_en_file from "@/assets/audio/AffirmationsAudio/intro_en.wav";
import audio_es_file from "@/assets/audio/AffirmationsAudio/intro_es.wav";
import audio_es_inc_file from "@/assets/audio/AffirmationsAudio/intro_es_inc.wav";


const en = `Affirmations are kind and true words. Practice hearing and saying affirmations in this section. Tap each card to flip it over and go deeper. You can do this by yourself, with a friend, or with a grown-up!`;
const es = `Las afirmaciones son palabras amables y verdaderas. Practica escuchando y diciendo afirmaciones en esta sección. Haz clic en cada carta para darle la vuelta y profundizar. ¡Puedes hacerlo tú solo, con un amigo o con un adulto!`;
const esInc = `Las afirmaciones son palabras amables y verdaderas. Practica escuchando y diciendo afirmaciones en esta sección. Haz clic en cada carta para darle la vuelta y profundizar. ¡Puedes hacerlo tú, con un amigue o con una persona mayor!`;

export const AffirmationsIntro: React.FC = () => {
  const {profile: {isInclusive}} = useProfile();
  const texts: any = [
    {
      es: {
	text: "¡Afirmaciones!",
	subtext: isInclusive
	       ? es
	       : esInc,
	audio: isInclusive ? audio_es_inc_file : audio_es_file
      },
      en: {
	text: `Affirmations`,
	subtext: en,
	audio: audio_en_file
      }
    }
  ];
  return (
    <Intro texts={texts} image={biliCharacter} nextPath="/affirmations/select" />
  );
};
