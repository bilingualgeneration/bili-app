import audio_correct from "@/assets/audio/IntruderAudio/intruder_correct.mp3";
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

export interface PieceProps {
  audio_on_drop: any;
  audio_on_drag: any;
  count: number;
  dropped: boolean;
  id: string;
  image: any;
  left: number;
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
  text,
  top,
  ...props
}) => {
  const {addAudio} = useAudioManager();
  // todo: better way to play audio?
  const [audio_drag] = useState(new Audio(audio_on_drag.url));
  const [audio_drop] = useState(new Audio(audio_on_drop.url));
  const [{isDragging}, drag, preview] = useDrag(() => ({
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: {id, image, left, text, top},
    type: 'piece',
  }), [id, image, left, text, top]);
  useEffect(() => {
    if(isDragging){
      audio_drag.loop = true;
      audio_drag.play();
    }else{
      audio_drag.pause();
      audio_drag.currentTime = 0;
    }
    if(dropped){
      addAudio([
	audio_on_drop.url,
	audio_correct
      ]);
    }
  }, [isDragging, dropped]);
  if(isDragging || dropped){
    return <span ref={drag}></span>;
  }
  return <>
    <DragPreviewImage connect={preview} src={image.url} />
    <span ref={drag} style={{
      left,
      position: 'absolute',
      top,
    }}>
      <img src={image.url} />
    </span>
  </>;
}
