import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useParams } from "react-router-dom";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { Deck } from "@/components/Deck";
import "@/pages/Intruder/Intruder.scss";

import styles from "./styles.module.css";
import { IonText } from "@ionic/react";

export const TellMeAboutGame: React.FC = () => {
  //@ts-ignore
  const { pack_id } = useParams();
  return (
    <FirestoreDocProvider collection="tell-me-about-game" id={pack_id}>
      <TellMeAboutHydratedGame />
    </FirestoreDocProvider>
  );
};

const TellMeAboutHydratedGame: React.FC = () => {
  const { language } = useLanguageToggle();
  const [chosenLanguageData, setChosenLanguageData] = useState<any[]>([]);
  const { status, data } = useFirestoreDoc();

  const [questionsData, setQuestionsData] = useState<any[]>([]);

  useEffect(() => {
    if (data !== undefined && data !== null) {
      // Transform data to include text and audio in both languages for each card
      const transformedData = data.questions.map((questionItem: any) => {
        const es = questionItem.question.find(
          (item: any) => item.language === "es",
        );
        const esHint = questionItem.hint?.find(
          (item: any) => item.language === "es",
        );
        const en = questionItem.question.find(
          (item: any) => item.language === "en",
        );
        const enHint = questionItem.hint?.find(
          (item: any) => item.language === "en",
        );
        const esInc = questionItem.question.find(
          (item: any) => item.language === "es-inc",
        );
        const esIncHint = questionItem.hint?.find(
          (item: any) => item.language === "es-inc",
        );

        return {
          esAudio: es?.audio || null,
          esHintAudio: esHint?.audio || null,
          esHintText: esHint?.text || "",
          esText: es?.text || "",
          enAudio: en?.audio || null,
          enHintAudio: enHint?.audio || null,
          enHintText: enHint?.text || "",
          enText: en?.text || "",
          esIncAudio: esInc?.audio || null,
          esIncHintAudio: esIncHint?.audio || null,
          esIncHintText: esIncHint?.text || "",
          esIncText: esInc?.text || "",
        };
      });
      setQuestionsData(transformedData);
    }
  }, [data]);

  if (status === "loading") {
    return (
      <div style={{ textAlign: "center", paddingTop: "50vh" }}>Loading...</div>
    );
  }

  if (status === "error") {
    return "Error loading the game";
  }

  return (
    <div>
      <div
        style={{ padding: "4px 120px 0px 120px" }}
        className="margin-bottom-2"
      >
        <IonText>
          <h1 className="text-5xl margin-top-1">
            <FormattedMessage
              id="common.tellMeAbout"
              description={"Title of 'Cuéntame sobre...' page"}
            />
          </h1>
          {language === "esen" && <p className="text-3xl">Tell me about...</p>}
        </IonText>
      </div>
      {/* Passing questionsData to the Deck component */}
      <Deck cards={questionsData} />
    </div>
  );
};
