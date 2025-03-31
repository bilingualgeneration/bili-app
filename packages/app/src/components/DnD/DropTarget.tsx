import classNames from "classnames";
import { hashSegment } from "./DnD";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useEffect } from "react";
import { useDnD } from "@/hooks/DnD";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { useState } from "react";

import audio_correct from "@/assets/audio/correct.mp3";
import audio_incorrect from "@/assets/audio/incorrect.mp3";
import { useStory } from "@/pages/Stories/StoryContext";
import { useActivity } from "@/contexts/ActivityContext";

export interface DropTargetProps {
  gameId: string;
  classes: string;
  image: any;
  isBlank: boolean;
  text: string;
  renderTrigger: Date;
  x: number;
  y: number;
}

export const DropTarget: React.FC<DropTargetProps> = ({
  gameId,
  classes,
  image,
  isBlank,
  text,
  renderTrigger,
  x,
  y,
}) => {
  const { addAudio } = useAudioManager();
  const {
    audioOnComplete,
    onDrop,
    pieces,
    piecesDropped,
    setPieces,
    setPiecesDropped,
    totalTargets,
  } = useDnD();
  const [hasDropped, setHasDropped] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { handleAttempt } = useActivity();

  const [, drop] = useDrop(
    () => ({
      accept: "piece",
      drop(item: any, monitor) {
        if (item.text === text && hasDropped === false) {
          // correct
          if (onDrop) {
            onDrop(true);
          }
          let audio = [audio_correct, item.audioOnDrop];
          if (piecesDropped >= totalTargets - 1) {
            audio.push(audioOnComplete);
          }
          addAudio(audio);
          setPieces(
            update(pieces, {
              [item.id]: {
                $merge: { dropped: true },
              },
            }),
          );
          setHasDropped(true);
          setIsCorrect(true);
          setPiecesDropped((n: number) => n + 1);
        } else {
          // incorrect
          if (!hasDropped) {
            if (onDrop) {
              onDrop(false);
            }
            addAudio([audio_incorrect]);
            setIsCorrect(false);
            setTimeout(() => {
              // todo: accomplish without settimeout
              setIsCorrect(null);
            }, 1000);
          }
        }
      },
      collect: (monitor) => ({}),
    }),
    [
      addAudio,
      audioOnComplete,
      hasDropped,
      setHasDropped,
      setIsCorrect,
      setPiecesDropped,
      setPieces,
      totalTargets,
      pieces,
      piecesDropped,
    ],
  );

  useEffect(() => {
    setIsCorrect(null);
    setHasDropped(false);
  }, [renderTrigger]);

  useEffect(() => {
    if (!gameId || isCorrect === null) return;

    handleAttempt(gameId, isCorrect);
  }, [isCorrect, gameId]);

  return (
    <>
      <span
        className={classNames(
          {
            dropped: hasDropped,
            "dnd-correct": isCorrect === true,
            "dnd-incorrect": isCorrect === false,
            "shake-animation": isCorrect === false,
            "drop-target": true,
            letter: true,
          },
          classes,
        )}
        style={{
          color: hashSegment(text),
          position: "absolute",
          left: x,
          top: y,
        }}
        ref={drop}
      >
        {isBlank && !hasDropped ? text.replace(/./g, "_") : text}
      </span>
    </>
  );
};
