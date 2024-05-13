import { generateSpeech } from "./generate.js";

const buildRequest = ({ text }) => {
  return {
    text: `<speak>${text}</speak>`,
    textType: "ssml",
      voiceId: "Kendra",
    //voiceId: 'Lucia',
    outputFile: `data/${text.replace(/\s/g, "_").toLowerCase()}.mp3`,
  };
};

const texts1 = [
    "The cow",
    "My mom",
    "The frog",
    "Doña María",
    "Don Carlos",
    "The cat",
    "The rabbit",
    "The bird",
    "The girl",
    "The baby",
];

const texts2 = [
    "gives",
    "put",
    "eats",
    "draws",
    "devours",
    "sees",
    "chews",
    "visits",
    "drinks",
    "plays with",
];

const texts3 = [
    "milk",
    "sweet bread",
    "insects",
    "clouds",
    "candy",
    "butterflies",
    "grass",
    "worms",
    "juice",
    "dolls",
];

const texts4 = [
    "Saturdays",
    "on the table",
    "in the forest",
    "in the sky",
    "in the living room",
    "in the yard",
    "in the garden",
    "each morning",
    "in the kitchen",
    "each afternoon",
];

let texts = [];

for (const one of texts1) {
  for (const two of texts2) {
    for (const three of texts3) {
      for (const four of texts4) {
        texts = texts.concat([one, two, three, four].join(" "));
      }
    }
  }
}

for (const t of texts) {
  await generateSpeech(buildRequest({ text: t }));
}
