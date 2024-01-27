import { IonText } from "@ionic/react";
import React from "react";

export const CountWithMe: React.FC = () => {
  const data = [
    {
      prompt: [
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
        "https://ik.imagekit.io/jskeetedev/background%20rainforest%201.png?updatedAt=1706319203925",
      animals: [{ x: 0, y: 0, width: 0, height: 0 }],
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
        "https://ik.imagekit.io/jskeetedev/background%20rainforest%201-2.png?updatedAt=1706319993691",
      animals: [{ x: 0, y: 0, width: 0, height: 0 }],
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
          backgroundColor: "#FFFFFF",
          width: "1159px",
          height: "724px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <IonText>
          <h1>{data[1].prompt[0].text}</h1>
          <p>{data[1].prompt[1].text}</p>
        </IonText>
        <img src={data[1].image} alt="hummingbirds" />
      </div>
    </div>
  );
};
