import classNames from 'classnames';
import {useAudioManager} from '@/contexts/AudioManagerContext';
import {useEffect} from 'react';
import {useDnD} from '@/hooks/DnD';
import {useDrop} from 'react-dnd';
import update from 'immutability-helper';
import {
  useState
} from 'react';

import audio_incorrect from "@/assets/audio/incorrect.mp3";

export interface DropTargetProps {
  classes: string,
  image: any,
  isBlank: boolean,
  text: string,
  renderTrigger: Date,
}

export const DropTarget: React.FC<DropTargetProps> = ({
  classes,
  image,
  isBlank,
  text,
  renderTrigger
}) => {
  const {addAudio} = useAudioManager();
  const {pieces, setPieces, setPiecesDropped} = useDnD();
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
	  setHasDropped(true);
	  setIsCorrect(true);
	  setPiecesDropped((n: number) => n + 1);
	}else{
	  if(!hasDropped){
	    addAudio([audio_incorrect]);
	    setIsCorrect(false);
	  }
	}
      },
      collect: (monitor) => ({})
    }),
    [
      addAudio,
      hasDropped,
      setHasDropped,
      setIsCorrect,
      setPiecesDropped,
      setPieces,
      pieces
    ]
  );
  useEffect(() => {
    setIsCorrect(null);
    setHasDropped(false);
  }, [renderTrigger]);
  return <>
    <span className={classNames({
      dropped: hasDropped,
      'drop-shadow-correct': isCorrect === true,
      'drop-shadow-incorrect': isCorrect === false,
      'shake-animation': isCorrect === false,
      'drop-target': true,
      'letter': true,
      'is-blank': isBlank
    }, classes)}
	  ref={drop}>
      <img src={image?.url} />
    </span>
  </>;
}
