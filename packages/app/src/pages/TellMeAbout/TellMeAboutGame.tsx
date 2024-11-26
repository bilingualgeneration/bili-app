import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { Deck } from "@/components/Deck";
import "@/pages/Intruder/Intruder.scss";
import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { useLanguage } from "@/hooks/Language";
import { I18nMessage } from "@/components/I18nMessage";

export const TellMeAboutGame: React.FC = () => {
  //@ts-ignore
  const { pack_id } = useParams();
  return (
    <FirestoreDocProvider collection="tell-me-about" id={pack_id}>
      <TellMeAboutHydratedGame />
    </FirestoreDocProvider>
  );
};

const TellMeAboutHydratedGame: React.FC = () => {
  const { status, data } = useFirestoreDoc();
  const { filterText } = useLanguage();
  const [questionsData, setQuestionsData] = useState<any[]>([]);

  useEffect(() => {
    if (data !== undefined && data !== null) {
      // Transform data to include text and audio in both languages for each card

      const transformedData = data.questions.map((questionItem: any) => {
        // possible solution for using filterText
        // const filteredQuestion = filterText(questionItem.question || []);
        // console.log(filteredQuestion)
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
    <>
      <Deck id="common.tellMeAbout" cards={questionsData} />
    </>
  );
};
