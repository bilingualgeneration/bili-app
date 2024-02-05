import React, { FC, useEffect, useState } from "react";
import { IonCard, IonCardContent, IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import TinderCard from "react-tinder-card";
import { useProfile } from "@/contexts/ProfileContext";
import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";

import "./WouldDoGame.scss";

export const WouldDoGame: FC = () => {
  const { isImmersive } = useProfile();
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
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

  // do a check if status === loading

  if (status === "loading") {
    return (
      <div style={{ textAlign: "center", paddingTop: "50vh" }}>Loading...</div>
    );
  }

  if (status === "error") {
    return "Error loading the game";
  }

  if (questionsAnswered === questionsData.length) {
    // do something?
  }

  return (
    <>
      <div id="would-do-page" style={{ backgroundColor: "#FBF2E2" }}>
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
        <div id="would-do-question-container">
          {questionsData.map((question, index) => (
            <TinderCard
              key={index}
              className="card"
              onSwipe={() => {
                setQuestionsAnswered(questionsAnswered + 1);
              }}
            >
              <IonCard
                style={{
                  backgroundColor: colors[index % colors.length],
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                <IonCardContent>
                  <IonText>
                    <h2>{question.es}</h2>
                    {!isImmersive && <p>{question.en}</p>}
                  </IonText>
                </IonCardContent>
              </IonCard>
            </TinderCard>
          ))}
        </div>
      </div>
    </>
  );
};
