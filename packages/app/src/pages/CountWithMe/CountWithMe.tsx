import { IonText } from "@ionic/react";
import React from "react";

export const CountWithMe: React.FC = () => {
  const data = [
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
        // each animal is an object with an image url and x and y coordinates
        {
          url: "https://ik.imagekit.io/jskeetedev/Group%206962.png?updatedAt=1706501413743",
          x: 60,
          y: 400,
        },
        {
          url: "https://ik.imagekit.io/jskeetedev/Group%206963.png?updatedAt=1706501413594",
          x: 260,
          y: 300,
        },
        {
          url: "https://ik.imagekit.io/jskeetedev/Group%206964.png?updatedAt=1706501397998",
          x: 500,
          y: 500,
        },
        {
          url: "https://ik.imagekit.io/jskeetedev/Group%206965.png?updatedAt=1706501398083",
          x: 740,
          y: 300,
        },
      ],
      fact: [
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
        // each animal is an object with an image url and x and y coordinates
        {
          url: "https://ik.imagekit.io/jskeetedev/Layer%202%202.png?updatedAt=1706501398136",
          x: 20,
          y: 430,
        },
        {
          url: "https://ik.imagekit.io/jskeetedev/Layer%203%202.png?updatedAt=1706501398150",
          x: 500,
          y: 500,
        },
        {
          url: "https://ik.imagekit.io/jskeetedev/dolphin%203%201.png?updatedAt=1706501397958",
          x: 680,
          y: 420,
        },
      ],
      fact: [
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
    },
  ];

  return (
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
          <h1>{data[0].prompt[0].text}</h1> {/* data[0] is hard coded for  */}
          <p>{data[0].prompt[1].text}</p>
        </IonText>
        <img src={data[0].image} alt="hummingbirds" style={{ width: "100%" }} />

        {/* Overlay animals */}
        {data[0].animals.map((animal, index) => (
          <img
            key={index}
            src={animal.url}
            alt={`animal-${index}`}
            style={{
              position: "absolute",
              top: `${animal.y}px`,
              left: `${animal.x}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
