import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { writeFileSync } from "fs";
import http from "http";
import fs from "fs";
import "dotenv/config"; // apparently, nodejs doesn't automatically read in .enb?

export const generateSpeech = async ({
  text,
  textType,
  voiceId,
  outputFile,
}) => {
  // a client can be shared by different commands.
  const client = new PollyClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const params = {
    OutputFormat: "mp3", // For example, 'mp3'
    SampleRate: "22050", // For example, '16000
    Text: text, // The 'speakText' function supplies this value
    TextType: textType, // For example, "text"
    VoiceId: voiceId, // For example, "Matthew"
  };
  const command = new SynthesizeSpeechCommand(params);
  const data = await client.send(command);
  console.log(`saving file ${outputFile}`);
  writeFileSync(outputFile, await streamToBuffer(data.AudioStream));
};

// Helper function to convert stream to buffer
async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
