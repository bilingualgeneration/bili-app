// @ts-nocheck

import { IonButton, IonCard, IonCardContent, IonText } from "@ionic/react";
import { stringSimilarity } from "string-similarity-js";
import { useState } from "react";
import { useLanguageToggle } from "@/components/LanguageToggle";

const enPhrases = [
  "hello world",
  "the quick brown fox jumps over the lazy dog",
  "you must be the change you wish to see in the world",
];

const esPhrases = [
  "hola mundo",
  "el veloz zorro marrón salta sobre el perro perezoso",
  "debes ser el cambio que deseas ver en el mundo",
];

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

export const PhraseMatcherTest: React.FC = () => {
  const [phraseNumber, setPhraseNumber] = useState<number>(0);
  const [heardPhrase, setHeardPhrase] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const { language } = useLanguageToggle();
  const phrase =
    language === "en" ? enPhrases[phraseNumber] : esPhrases[phraseNumber];

  const grammar = `#JSGF V1.0; grammar phrase; public <phrase> = ${phrase};`;
  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  recognition.grammars = speechRecognitionList;
  recognition.lang = language === "en" ? "en" : "es";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function (event: any) {
    const speechResult = event.results[0][0].transcript.toLowerCase();
    const speechScore = stringSimilarity(phrase, speechResult);
    const speechConfidence = event.results[0][0].confidence;
    setHeardPhrase(speechResult);
    setScore(speechScore);
    setConfidence(speechConfidence);
  };
  recognition.onspeechend = () => {
    recognition.stop();
  };
  return (
    <IonCard>
      <IonCardContent>
        <IonText>
          <h1>
            {language === "en" ? "Say: " : "Dice: "}
            {phrase}
          </h1>
        </IonText>
        <br />
        <IonButton
          onClick={() => {
            recognition.start();
          }}
        >
          Test
        </IonButton>
        <IonButton
          onClick={() => {
            setPhraseNumber(phraseNumber === 2 ? 0 : phraseNumber + 1);
          }}
        >
          Next Phrase
        </IonButton>
        <IonText>
          <p className="text-xl margin-top-3">
            Phrase Heard: {heardPhrase}
            <br />
            Score: {(score * 100).toFixed(1)}%
            <br />
            Confidence: {(confidence * 100).toFixed(1)}%
          </p>
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};
