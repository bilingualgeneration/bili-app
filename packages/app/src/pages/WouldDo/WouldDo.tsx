import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

export const WouldDo: React.FC = () => {
  const ionCardsData = [
    // an array of objects representing IonCards where es = español and em = english
    {
      es: "Imagina que accidentalmente rompes un frasco de especias en la cocina. ¿Qué debes hacer para asumir la responsabilidad de tus acciones?",
      em: "You accidentally break a jar of spices in the kitchen. \nWhat should you do to take responsibility for your actions?",
    },
    {
      es: "Imagina que encuentras una billetera perdida en una celebración comunitaria. \n¿Qué harías?",
      em: "You find a lost wallet at a community celebration. \nWhat would you do?",
    },
    {
      es: "Imagina que durante la hora de la merienda en la escuela, notas que tu amigo no tiene comida. \n¿Qué harías?",
      em: "During snack time at school, you notice that your friend doesn't have any food. What would you do?",
    },
    {
      es: "Si ves a un alumno nuevo en tu clase que no habla español o inglés, ¿cómo podrías mostrarle amabilidad y ayudarlo a sentirse incluido?",
      em: "If you see a new student in your class who doesn't speak Spanish or English, how could you show kindness and help them feel included?",
    },
    {
      es: "Imagina que tu prima se siente triste porque extraña a sus abuelos que viven lejos. ¿Qué podrías hacer en esa situación para ayudarla a sentirse mejor?",
      em: "Imagine your cousin is feeling sad because they miss their grandparents who live far away. What could you do in that situation to help her feel better?",
    },
  ];

  const colors = ["#D3EAE8", "#FFAEDC", "#EEE8DE", "#FFE24F", "#FF8B70"]; // an array of colors to be used for the IonCards as seen in Figma

  return (
    <>
      <div style={{ backgroundColor: "#FBF2E2" }}>
        {" "}
        {/* Background color of the page as seen on Figma */}
        <div style={{ padding: "4px 120px 0px 120px" }}>
          <h1 style={{ fontWeight: "bold" }}>¿Qué harías?</h1>
          <p style={{ fontWeight: "normal" }}>What would you do?</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {ionCardsData.map(
            (
              card,
              index, // maps through the array of objects and creates an IonCard for each object
            ) => (
              <IonCard
                key={index}
                style={{
                  backgroundColor: colors[index % colors.length],
                  width: "626.89px",
                  height: "460px",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                {" "}
                {/* Background color of each IonCard is cycled through the colors array */}
                <IonCardHeader>
                  <IonCardTitle>{card.es}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>{card.es}</IonCardContent>
              </IonCard>
            ),
          )}
        </div>
      </div>
    </>
  );
};
