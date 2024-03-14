import biliCharacter from "@/assets/img/bili_in_tshirt.png";
import { useProfile } from "@/contexts/ProfileContext";
import {Intro} from '@/components/Intro';

import es_1 from "@/assets/audio/StoryFactoryAudio/story_factory_first_es.mp3";
import es_inc_1 from "@/assets/audio/StoryFactoryAudio/story_factory_first_es-inc.mp3";
import en_1 from "@/assets/audio/StoryFactoryAudio/story_factory_first_en.mp3";
import es_2 from "@/assets/audio/StoryFactoryAudio/story_factory_second_es.mp3";
import en_2 from "@/assets/audio/StoryFactoryAudio/story_factory_second_en.mp3";

export const StoryFactoryIntro: React.FC = () => {
  const { isInclusive } = useProfile();
  const texts: any = [
    {
      es: {
	text: isInclusive
	    ? `¡Bienvenides a la fábrica de cuentos!`
	    : `¡Bienvenidos a la fábrica de cuentos!`,
	subtext: isInclusive
	       ? `¡Un lugar para lecturas silábicas graciosas!`
	       : `¡Un lugar para lecturas silábicas graciosas!`,
	audio: isInclusive ? es_inc_1 : es_1
      },
      en: {
	subtext: `Welcome to the story factory! A place for silly syllabic reading! `,
	audio: en_1
      }
    },
    {
      es: {
	subtext: "Crea más de 4.000 historias diferentes con solo deslizar el dedo o hacer clic en un botón.",
	audio: es_2
      },
      en: {
	subtext: `Create over 4,000 different stories with the swipe of your finger or click of a button.`,
	audio: en_2
      }
    },
    
  ];

  return <>
    <Intro texts={texts} image={biliCharacter} nextPath="/story-factory-game/select" />
  </>;
}
