import React, { FC, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { Deck } from "./Deck";
import "@/pages/Intruder/Intruder.scss";

import styles from "./styles.module.css";
import { IonText } from "@ionic/react";

export const WouldDoGame: FC = () => {
  const { isInclusive, isImmersive } = useProfile();
  const [chosenLanguageData, setChosenLanguageData] = useState<any[]>([]);

  //@ts-ignore
  const { pack_id } = useParams();
  const firestore = useFirestore();

  const ref = doc(firestore, "would-do-game", pack_id);
  const { status, data } = useFirestoreDocData(ref);
  const [questionsData, setQuestionsData] = useState<any[]>([]);

  useEffect(() => {
    console.log("QuestionData updated: ", questionsData);
  }, [questionsData]);

  useEffect(() => {
    if (data !== undefined) {
      // Transform data to include text and audio in both languages for each card
      const transformedData = data.questions.map((questionItem: any) => {
        if (isImmersive) {
          if (isInclusive) {
            const esIncItems = questionItem.question.filter(
              (item: any) => item.language === "es-inc",
            );
            return {
              esIncText: esIncItems.length > 0 ? esIncItems[0].text : "",
              esIncAudio:
                esIncItems.length > 0 ? esIncItems[0].audio : undefined,
            };
          } else {
            const esItems = questionItem.question.filter(
              (item: any) => item.language === "es",
            );
            return {
              esText: esItems.length > 0 ? esItems[0].text : "",
              esAudio: esItems.length > 0 ? esItems[0].audio : undefined,
            };
          }
        } else {
          const esItems = questionItem.question.filter(
            (item: any) => item.language === "es",
          );
          const enItems = questionItem.question.filter(
            (item: any) => item.language === "en",
          );
          return {
            esText: esItems.length > 0 ? esItems[0].text : "",
            esAudio: esItems.length > 0 ? esItems[0].audio : undefined,
            enText: enItems.length > 0 ? enItems[0].text : "",
            enAudio: enItems.length > 0 ? enItems[0].audio : undefined,
          };
        }
      });

      // Set the state variable based on the transformed data
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
      <div style={{ padding: "4px 120px 0px 120px" }}>
        <IonText>
          <h1 className="text-5xl margin-top-1">
            <FormattedMessage
              id="wouldDo.title"
              defaultMessage={"What would you do?"}
              description={"Title of '¿Que harías?' page"}
            />
          </h1>
          {!isImmersive && <p className="text-3xl">What would you do?</p>}
        </IonText>
      </div>
      {/* Passing questionsData to the Deck component */}
      <Deck cards={questionsData} />
    </div>
  );
};
