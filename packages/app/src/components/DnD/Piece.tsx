import audio_correct from "@/assets/audio/correct.mp3";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { hashLetter } from "./DnD";
import { useEffect, useState } from "react";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useDnD } from "@/hooks/DnD";

export interface PieceProps {
  audio_on_drop: any;
  audio_on_drag: any;
  count: number;
  dropped: boolean;
  id: string;
  left: number;
  rotation: number;
  text: string;
  top: number;
}

export const Piece: React.FC<PieceProps> = ({
  audio_on_drop,
  audio_on_drag,
  dropped,
  id,
  left,
  rotation,
  text,
  top,
  ...props
}) => {
  const { addAudio } = useAudioManager();
  const [onDragAudioPlaying, setOnDragAudioPlaying] = useState(false);
  const color = hashLetter(text);
  const rotate = `${rotation}deg`;
  const audioOnDrop = audio_on_drop.url;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
      item: { color, id, left, rotate, text, top, audioOnDrop },
      type: "piece",
    }),
    [id, color, left, rotate, text, top],
  );
  useEffect(() => {
    if (isDragging && !onDragAudioPlaying) {
      setOnDragAudioPlaying(true);
      addAudio([audio_on_drag.url]);
    }
    if (!isDragging && onDragAudioPlaying) {
      setOnDragAudioPlaying(false);
    }
  }, [
    addAudio,
    audio_on_drag,
    isDragging,
    onDragAudioPlaying,
    setOnDragAudioPlaying,
  ]);
  if (isDragging || dropped) {
    return <span ref={drag}></span>;
  }
  return (
    <>
      <span
        className="letter"
        ref={drag}
        style={{
          color,
          left,
          position: "absolute",
          top,
          rotate,
        }}
      >
        {text}
      </span>
    </>
  );
};
