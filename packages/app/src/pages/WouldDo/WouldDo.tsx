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

export const WouldDo: FC = () => {
  const { isImmersive } = useProfile();
  //@ts-ignore
  const { pack_id } = useParams();
  const firestore = useFirestore();

  //Firestore operations
  const ref = doc(firestore, "would-do-game", pack_id);
  const { status, data } = useFirestoreDocData(ref);

  const [questionsData, setQuestionsData] = useState<any[]>([]);
  const colors = ["#D3EAE8", "#FFAEDC", "#EEE8DE", "#FFE24F", "#FF8B70"];

  useEffect(() => {
    if (data !== undefined) {
      console.log("Data from Firebase:", data);

      // Transform data to include text in both languages for each question
      const transformedData = data.questions.map((questionItem: any) => {
        const enText = questionItem.question[0].text;
        const esText = questionItem.question[1].text;

        return {
          es: esText,
          en: enText,
        };
      });

      setQuestionsData(transformedData);
      console.log(transformedData);
    }
  }, [data]);

  // do a check if status === loading
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
      <div style={{ backgroundColor: "#FBF2E2" }}>
        {" "}
        {/* Background color of the page as seen on Figma */}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {questionsData.map((question, index) => (
            <IonCard
              key={index}
              style={{
                backgroundColor: colors[index % colors.length],
                width: "626.89px",
                height: "460px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <IonCardHeader>
                <IonCardTitle>{question.es}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {isImmersive && <div>{question.en}</div>}
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </div>
    </>
  );
};
