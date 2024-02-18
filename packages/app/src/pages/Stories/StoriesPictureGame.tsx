//AM

import React, { useState, useEffect, useMemo } from "react";

import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import CorrectImage from "@/assets/img/correct_card.png";
import InCorrectImage2 from "@/assets/img/incorrect_card_1.png";
import InCorrectImage3 from "@/assets/img/incorrect_card_2.png";
import InCorrectImage4 from "@/assets/img/incorrect_card_3.png";
import incorrect_card_audio from "@/assets/audio/IntruderAudio/intruder_incorrect.wav";
import correct_card_audio from "@/assets/audio/IntruderAudio/intruder_correct.wav";
import volumeButton from "@/assets/icons/sf_audio_button.svg";
import { useParams } from "react-router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { useAudioManager } from "@/contexts/AudioManagerContext";
//temporary audio files, should be chaged for count-with-me files oncel uploade
import audio_en_file from "@/assets/audio/IntruderAudio/intruder_instruction_en.mp3";
import audio_es_file from "@/assets/audio/IntruderAudio/intruder_instruction_es.mp3";
import audio_es_inc_file from "@/assets/audio/IntruderAudio/intruder_instruction_es_inc.mp3";
import { useHistory } from "react-router";
import { card } from "ionicons/icons";
import { StoriesGame } from "@/components/StoriesGame";

const mockGameData = {
  card_group: [
    {
      spanish_question_text: "Haz clic en la foto con amigues.",
      spanish_inclusive_question_text: "Haz clic en la foto con amigues.",
      english_question_text: "Click on the photo with friends.",
      spanish_inclusive_question_audio: { url: audio_es_inc_file },
      spanish_question_audio: { url: audio_es_file },
      englsih_question_audio: { url: audio_en_file },
      correct_card_image: { url: "/assets/img/correct_card.png" },
      correct_card_audio: { url: "" },
      incorrect_card_image_2: { url: "/assets/img/incorrect_card_1.png" },
      incorrect_card_audio_2: { url: "" },
      incorrect_card_image_3: { url: "/assets/img/incorrect_card_2.png" },
      incorrect_card_audio_3: { url: "" },
      incorrect_card_image_4: { url: "/assets/img/incorrect_card_3.png" },
      incorrect_card_audio_4: { url: "" },
      nextSlide: () => console.log("Next slide function placeholder"),
    },
  ],
};

export const StoriesPictureGame: React.FC = () => {
  return (
    <div>
      <StoriesGame game={mockGameData} gameType="image" />
    </div>
  );
};
