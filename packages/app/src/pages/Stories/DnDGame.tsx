import { DnDProvider, useDnD } from "@/hooks/DnD";
import { DnD, MAX_HEIGHT } from "@/components/DnD";
import { IonCol, IonText } from "@ionic/react";
import { useActivity } from "@/contexts/ActivityContext";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useEffect } from "react";
import { useStory } from "./StoryContext";
import { useLanguage } from "@/hooks/Language";

export const DnDGame: React.FC<{ data: any }> = ({ data }) => {
  return (
    <DnDProvider>
      <WrappedDnDGame data={data} />
    </DnDProvider>
  );
};

const WrappedDnDGame: React.FC<{ data: any }> = ({ data }) => {
  const { handleAttempt, handleRecordAttempt } = useActivity();
  const { pageLocks, setPageLocks, pageNumber, pageForward } = useStory();
  const { piecesDropped, totalTargets } = useDnD();
  const { filterText } = useLanguage();
  const { addAudio, clearAudio } = useAudioManager();
  const instructions = filterText(data.instructions);
  useEffect(() => {
    // TODO: check that it works
    addAudio(instructions.map((i: any) => i.audio.url));
    return clearAudio;
  }, []);
  useEffect(() => {
    if (piecesDropped >= totalTargets && totalTargets > 0) {
      /*
      setPageLocks({
        ...pageLocks,
        [pageNumber]: false,
      });
      */
      //pageForward();
    }
  }, [piecesDropped, totalTargets]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* TODO: determine this programmatically */}
      <IonText>
        <h1 className="text-4xl ion-text-center color-suelo">
          {instructions[0].text}
        </h1>
        {instructions.length > 1 && (
          <p className="text-xl ion-text-center color-english">
            {instructions[1].text}
          </p>
        )}
      </IonText>
      <DnD
        gameId={data.uuid}
        audioOnComplete={data.audio_on_complete}
        onDrop={(isCorrect: boolean) => {
          handleAttempt(data.uuid, isCorrect);
        }}
        width={1366}
        target={data.target}
        pieces={data.pieces}
      />
    </div>
  );
};
