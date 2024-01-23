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
import { Link, useParams } from "react-router-dom";
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

  // const ionCardsData = [
  //   // an array of objects representing IonCards where es = español and en = english
  //   {
  //     es: "Imagina que accidentalmente rompes un frasco de especias en la cocina. ¿Qué debes hacer para asumir la responsabilidad de tus acciones?",
  //     en: "You accidentally break a jar of spices in the kitchen. \nWhat should you do to take responsibility for your actions?",
  //   },
  //   {
  //     es: "Imagina que encuentras una billetera perdida en una celebración comunitaria. \n¿Qué harías?",
  //     en: "You find a lost wallet at a community celebration. \nWhat would you do?",
  //   },
  //   {
  //     es: "Imagina que durante la hora de la merienda en la escuela, notas que tu amigo no tiene comida. \n¿Qué harías?",
  //     en: "During snack time at school, you notice that your friend doesn't have any food. What would you do?",
  //   },
  //   {
  //     es: "Si ves a un alumno nuevo en tu clase que no habla español o inglés, ¿cómo podrías mostrarle amabilidad y ayudarlo a sentirse incluido?",
  //     en: "If you see a new student in your class who doesn't speak Spanish or English, how could you show kindness and help then feel included?",
  //   },
  //   {
  //     es: "Imagina que tu prima se siente triste porque extraña a sus abuelos que viven lejos. ¿Qué podrías hacer en esa situación para ayudarla a sentirse mejor?",
  //     en: "Imagine your cousin is feeling sad because they miss their grandparents who live far away. What could you do in that situation to help her feel better?",
  //   },
  // ];

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
            // todo: remove the link
            <Link to="/would-do/dc6fd688-cbb9-4467-ba41-aad105c5ea40">
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
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
