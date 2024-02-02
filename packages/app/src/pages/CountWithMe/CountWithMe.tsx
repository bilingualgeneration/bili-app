import { IonButton, IonText } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";

interface Animal {
  url: string;
  x: number;
  y: number;
  rotation: number;
}

interface Prompt {
  language: string;
  text: string;
}

interface DataItem {
  prompt: Prompt[];
  image: string;
  animals: Animal[];
  fact: Prompt[];
  map: string;
}

const FirstPage = (animalIndex: number, data: DataItem[]) => {
  // Function to render the first page for each animal
  return (
    <>
      <div
        style={{
          backgroundColor: "#F7FAF9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            width: "1159px",
            height: "800px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <IonText>
            <h1>{data[animalIndex].prompt[0].text}</h1>
            <p>{data[animalIndex].prompt[1].text}</p>
          </IonText>
          <img
            src={data[animalIndex].image}
            alt={`animal-${animalIndex}`}
            style={{ width: "100%" }}
          />

          {data[animalIndex].animals.map(
            (
              animal,
              index, // Maps through animals array and renders each animal on the page
            ) => (
              <img
                key={index}
                src={animal.url}
                alt={`animal-${index}`}
                style={{
                  position: "absolute", // Position each animal absolutely
                  top: `${animal.y}px`, // hard-coded y position
                  left: `${animal.x}px`, // hard-coded x position
                }}
              />
            ),
          )}
        </div>
      </div>
    </>
  );
};

const FactsPage = (animalIndex: number, data: DataItem[]) => {
  // Function to render the facts page for each animal
  return (
    <>
      <div
        style={{
          backgroundColor: "#F7FAF9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            width: "1159px",
            height: "640px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "row", // Use row to align content horizontally
            justifyContent: "center", // Center content horizontally
            alignItems: "stretch", // Align items to stretch vertically
            padding: "20px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start", // Align text content to the left
              padding: "20px",
            }}
          >
            <IonText>
              <h2>{data[animalIndex].fact[0].text}</h2>
              <p>{data[animalIndex].fact[1].text}</p>
            </IonText>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end", // Align map image to the right
              padding: "20px",
            }}
          >
            <img
              src={data[animalIndex].map}
              alt={`animal-${animalIndex}`}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const CongratsPage = () => {
  // Function to render the congrats page
  const congrats = {
    background:
      "https://ik.imagekit.io/jskeetedev/Untitled%20design%20(3).png?updatedAt=1706831646016",
    star: "https://ik.imagekit.io/jskeetedev/Untitled%20design%20(2).png?updatedAt=1706831320447",
    es: "Te ganaste una estrella",
    en: "You've earned a star",
  };

  const [showText, setShowText] = useState(true); // State to show/hide text

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(false);
    }, 2000); // Set timeout to hide text after 2 seconds

    return () => clearTimeout(timeout);
  }, []); // This effect runs only once

  return (
    <>
      <div style={{ padding: "50px" }}>
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src={congrats.background}
            style={{
              position: "absolute",
              width: "1200px",
              height: "auto",
              zIndex: 1,
            }}
            alt="background"
          />
          <IonText>
            <h1>Actividad Completada</h1>
            <p style={{ textAlign: "center" }}>Activity Completed</p>
          </IonText>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
            }}
          >
            <img
              src={congrats.star}
              alt="star"
              style={{
                width: showText ? "700px" : "200px",
                height: "auto",
                position: "relative",
                transition: "width 1s ease", // transition effect to animate star shrink
              }}
            />
            {showText && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)", // Center text horizontally and vertically in the star
                  color: "#fff",
                }}
              >
                <p style={{ fontSize: "26px", margin: 0, color: "black" }}>
                  {congrats.es}
                </p>
                <p style={{ fontSize: "12px", margin: 0, color: "black" }}>
                  {congrats.en}
                </p>
              </div>
            )}
          </div>

          <IonButton shape="round" style={{ width: "300px" }}>
            ¡Sigue adelante!
            <br />
            Keep Going!
          </IonButton>
        </div>
      </div>
    </>
  );
};

export const CountWithMe: React.FC = () => {
  const data: DataItem[] = [
    {
      prompt: [
        // birds count
        {
          language: "es",
          text: "¿Cuántos colibrís hay? Haz clic en cada colibrí para contarlos.",
        },
        {
          language: "en",
          text: "How many hummingbirds are there? Tap on each hummingbird to count them.",
        },
        { language: "es-inc", text: "" },
      ],
      image:
        "https://ik.imagekit.io/jskeetedev/background%20rainforest%201.png?updatedAt=1706319203925", // background image from imagekit
      animals: [
        // each animal is an object with an image url, x and y coordinates, and a rotation value set to 0
        {
          url: "https://ik.imagekit.io/jskeetedev/Group%206962.png?updatedAt=1706501413743",
          x: 60,
          y: 400,
          rotation: 0,
        },
        {
          url: "https://ik.imagekit.io/jskeetedev/Group%206963.png?updatedAt=1706501413594",
          x: 260,
          y: 300,
          rotation: 0,
        },
        {
          url: "https://ik.imagekit.io/jskeetedev/Group%206964.png?updatedAt=1706501397998",
          x: 500,
          y: 500,
          rotation: 0,
        },
        {
          url: "https://ik.imagekit.io/jskeetedev/Group%206965.png?updatedAt=1706501398083",
          x: 740,
          y: 300,
          rotation: 0,
        },
      ],
      fact: [
        {
          language: "es",
          text: "¿El colibrí es originario de las Américas. Se pueden encontrar muchos colibrís a lo largo de América Central y del Sur.",
        },
        {
          language: "en",
          text: "The hummingbird is native to the Americas. Many hummingbirds can be found across Central and South America",
        },
        { language: "es-inc", text: "" },
      ],
      map: "https://ik.imagekit.io/jskeetedev/Screenshot%202024-02-01%20at%202.11%20Background%20Removed.05%E2%80%AFPM.png?updatedAt=1706816649130",
    },
    {
      prompt: [
        // dolphins count
        {
          language: "es",
          text: "¿Cuántos delfines rosados hay? Haz clic en cada delfin rosado para contarlos.",
        },
        {
          language: "en",
          text: "How many river dolphins are there? Tap on each river dolphin to count them.",
        },
        { language: "es-inc", text: "" },
      ],
      image:
        "https://ik.imagekit.io/jskeetedev/background%20rainforest%201-2.png?updatedAt=1706319993691", // background image from imagekit
      animals: [
        // each animal is an object with an image url, x and y coordinates, and a rotation value set to 0
        {
          url: "https://ik.imagekit.io/jskeetedev/Layer%202%202.png?updatedAt=1706501398136",
          x: 20,
          y: 430,
          rotation: 0,
        },
        {
          url: "https://ik.imagekit.io/jskeetedev/Layer%203%202.png?updatedAt=1706501398150",
          x: 500,
          y: 500,
          rotation: 0,
        },
        {
          url: "https://ik.imagekit.io/jskeetedev/dolphin%203%201.png?updatedAt=1706501397958",
          x: 680,
          y: 420,
          rotation: 0,
        },
      ],
      fact: [
        {
          language: "es",
          text: "¿El delfín rosado también es conocido como “boto”, “bufeo” o “delfín rosado de río”. Se pueden encontrar en los ríos de la selva amazónica y son de color rosa o gris.",
        },
        {
          language: "en",
          text: "The river dolphin is also known as the boto, bufeo, or pink river dolphin. They can be found in the rivers of the Amazon rainforest and are a pink or grey color.",
        },
        { language: "es-inc", text: "" },
      ],
      map: "https://ik.imagekit.io/jskeetedev/Untitled%20design_Se4AWpbwQ.png?updatedAt=1706817834245",
    },
  ];

  const animals = { hummingbirds: 0, dolphins: 1 };

  // Array of pages to render
  const pages = [
    FirstPage(animals.hummingbirds, data),
    FirstPage(animals.dolphins, data),
    FactsPage(animals.hummingbirds, data),
    FactsPage(animals.dolphins, data),
    CongratsPage(),
  ];

  return pages[4];
};
