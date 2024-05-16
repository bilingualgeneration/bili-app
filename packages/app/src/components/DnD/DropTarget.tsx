import classNames from 'classnames';
import {useAudioManager} from '@/contexts/AudioManagerContext';
import {useDnD} from '@/hooks/DnD';
import {useDrop} from 'react-dnd';
import update from 'immutability-helper';
import {
  useState
} from 'react';

import audio_incorrect from "@/assets/audio/IntruderAudio/intruder_incorrect.mp3";
import audio_correct from "@/assets/audio/IntruderAudio/intruder_correct.mp3";

export interface DropTargetProps {
  image: any,
  text: string,
}

export const DropTarget: React.FC<DropTargetProps> = ({
  image,
  text,
}) => {
  const {addAudio} = useAudioManager();
  const {pieces, setPieces} = useDnD();
  const [hasDropped, setHasDropped] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [, drop] = useDrop(
    () => ({
      accept: 'piece',
      drop(item: any, monitor){
	if(item.text === text
	   && hasDropped === false){
	  addAudio([])
	  setPieces(update(pieces, {
	    [item.id]: {
	      $merge: {dropped: true}
	    },
	  }));
	  addAudio([audio_correct]);
	  setHasDropped(true);
	  setIsCorrect(true);
	}else{
	  addAudio([audio_incorrect]);
	  setIsCorrect(false);
	}
      },
      collect: (monitor) => ({})
    }),
    [setHasDropped, setPieces, pieces]
  );
  return <>
    <span className={classNames({
      dropped: hasDropped,
      'drop-shadow-correct': isCorrect === true,
      'drop-shadow-incorrect': isCorrect === false,
      'shake-animation': isCorrect === false,
      'drop-target': true
    })}
	  ref={drop}>
      <img src={image.url} />
    </span>
  </>;
}
