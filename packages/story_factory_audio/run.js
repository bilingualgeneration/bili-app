import { generateSpeech } from "./generate.js";

const buildRequest = ({ text }) => {
  return {
    text,
    textType: "text",
    voiceId: "Mia",
    outputFile: `data/${text.replace(/\s/g, "_").toLowerCase()}.mp3`,
  };
};

const texts1 = [
  "la vaca",
  "mi mamá",
  "el sapo",
  "Doña María",
  "Don Carlos",
  "el gato",
  "El pájaro",
  "La niña",
  "La bebé",
];

const texts2 = [
  "nos da",
  "puso",
  "come",
  "dibuja",
  "devora",
  "mira",
  "mastica",
  "visita",
  "bebe",
  "juega con",
];

const texts3 = [
  "leche",
  "pan dulce",
  "insectos",
  "nubes",
  "golosinas",
  "mariposas",
  "pasto",
  "gusanos",
  "jugo",
  "muñecas",
];

const texts4 = [
  "los sabados",
  "en la mesa",
  "en el bosque",
  "en el cielo",
  "en la sala",
  "en el patio",
  "en el jardín",
  "cada mañana",
  "en la cocina",
  "cada tarde",
];

/*
let texts = [
    ...texts1,
    ...texts2,
    ...texts3,
    ...texts4,
];
*/

let texts = [];

for (const one of texts1.slice(0, 2)) {
  for (const two of texts2.slice(0, 2)) {
    for (const three of texts3.slice(0, 2)) {
      for (const four of texts4.slice(0, 2)) {
        texts = texts.concat([one, two, three, four].join(" "));
      }
    }
  }
}

for (const t of texts) {
  await generateSpeech(buildRequest({ text: t }));
}

console.log(texts.length);
