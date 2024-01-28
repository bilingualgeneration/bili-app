import React, { FC, useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { Deck } from "./Deck"; //
import styles from "./WouldDoAnimationStyles.module.css";

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
      // console.log("Data from Firebase:", data);

      const transformedData = data.questions.map((questionItem: any) => {
        const enText = questionItem.question[0].text;
        const esText = questionItem.question[1].text;

        return {
          es: esText,
          en: enText,
        };
      });

      setQuestionsData(transformedData);
      // console.log(transformedData);
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
      <div>
        <div style={{ padding: "4px 120px 0px 120px" }}>
          <IonText>
            <h1>
              <FormattedMessage
                id="wouldDo.title"
                defaultMessage="What would you do?"
                description="Title of '¿Que harías?' page"
              />
            </h1>
            {!isImmersive && <p>What would you do?</p>}
          </IonText>
        </div>
        <div className={styles.container}>
          <Deck cards={questionsData} />
          {/* Passing questionsData to the Deck component */}
        </div>
      </div>
    </>
  );
};
