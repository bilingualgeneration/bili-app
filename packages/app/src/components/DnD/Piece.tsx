import audio_correct from "@/assets/audio/correct.mp3";
import {
  DragPreviewImage,
  DragSourceMonitor,
  useDrag,
} from 'react-dnd';
import {
  useEffect,
  useState
} from 'react';
import {useAudioManager} from '@/contexts/AudioManagerContext';
import {useDnD} from '@/hooks/DnD';

export interface PieceProps {
  audio_on_drop: any;
  audio_on_drag: any;
  count: number;
  dropped: boolean;
  id: string;
  image: any;
  left: number;
  rotation: number,
  text: string;
  top: number;
}

export const Piece: React.FC<PieceProps> = ({
  audio_on_drop,
  audio_on_drag,
  dropped,
  id,
  image,
  left,
  rotation,
  text,
  top,
  ...props
}) => {
  const {audioOnComplete, piecesDropped, totalTargets} = useDnD();
  const {addAudio} = useAudioManager();
  const [audio_drag, set_audio_drag] = useState<HTMLAudioElement | null>(null);
  const [audio_drop, set_audio_drop] = useState<HTMLAudioElement | null>(null);
  useEffect(() => {
    // todo: better way to play audio?
    const a = new Audio(audio_on_drag.url);
    // speed up across the board
    a.playbackRate = 1.25;
    set_audio_drag(a);
  }, [audio_on_drag, set_audio_drag]);

  useEffect(() => {
    if(audio_on_drop){
      set_audio_drop(new Audio(audio_on_drop.url));
    }
  }, [audio_on_drop]);
  const [{isDragging}, drag, preview] = useDrag(() => ({
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: {id, image, left, text, top},
    type: 'piece',
  }), [id, image, left, text, top]);
  useEffect(() => {
    if(audio_drag){
      if(isDragging){
	audio_drag.loop = true;
	audio_drag.play();
      }else{
	audio_drag.pause();
	audio_drag.currentTime = 0;
      }
    }
    if(dropped){
      // todo: sometimes plays the wrong on_drop
      let audio = [audio_on_drop.url];
      if(piecesDropped >= totalTargets){
	audio.push(audioOnComplete);
      }
      audio.push(audio_correct);
      addAudio(audio);
    }
  }, [
    audio_drag,
    audio_on_drop,
    audioOnComplete,
    audio_correct,
    isDragging,
    dropped,
    piecesDropped,
    totalTargets,
    audioOnComplete,
  ]);
  if(isDragging || dropped){
    return <span ref={drag}></span>;
  }
  return <>
    <DragPreviewImage connect={preview} src={image.url} />
    <span ref={drag} style={{
      left,
      position: 'absolute',
      top,
      rotate: `${rotation}deg`
    }}>
      <img src={image.url} />
    </span>
  </>;
}
