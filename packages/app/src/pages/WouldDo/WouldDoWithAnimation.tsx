import React, { FC, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { Deck } from "./Deck";
import volumeButton from "@/assets/icons/sf_audio_button.svg";
import "@/pages/Intruder/Intruder.scss";

import styles from "./styles.module.css";
import { IonButton, IonText } from "@ionic/react";

export const WouldDoWithAnimation: FC = () => {
  const { isImmersive } = useProfile();

  //@ts-ignore
  const { pack_id } = useParams();
  const firestore = useFirestore();

  const ref = doc(firestore, "would-do-game", pack_id);
  const { status, data } = useFirestoreDocData(ref);

  const [questionsData, setQuestionsData] = useState<any[]>([]);

  useEffect(() => {
    if (data !== undefined) {
      // Transform data to include text in both languages for each question
      const transformedData = data.questions.map((questionItem: any) => {
        return {
          es: questionItem.question.filter((x: any) => x.language === "es")[0]
            .text,
          en: questionItem.question.filter((x: any) => x.language === "en")[0]
            .text,
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
      <div style={{ padding: "4px 120px 0px 120px" }}>
        <IonText>
          <h1>
            <FormattedMessage
              id="wouldDo.title"
              defaultMessage={"What would you do?"}
              description={"Title of '¿Que harías?' page"}
            />
          </h1>
          {!isImmersive && <p>What would you do?</p>}
        </IonText>
      </div>
      {/* Passing questionsData to the Deck component */}
      <Deck cards={questionsData} />
      <div className="sound-button">
        <IonButton
          className="sound-button-background"
          // onClick={() => handleWordAudioClick()}
        >
          <img className="sound-icon" src={volumeButton} />
        </IonButton>
      </div>
    </div>
  );
};
