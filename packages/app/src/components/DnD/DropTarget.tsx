import classNames from 'classnames';
import {useDnD} from '@/hooks/DnD';
import {useDrop} from 'react-dnd';
import update from 'immutability-helper';
import {
  useState
} from 'react';

export interface DropTargetProps {
  image: string,
  text: string,
}

export const DropTarget: React.FC<DropTargetProps> = ({
  image,
  text,
}) => {
  const {pieces, setPieces} = useDnD();
  const [hasDropped, setHasDropped] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [, drop] = useDrop(
    () => ({
      accept: 'piece',
      drop(item: any, monitor){
	if(item.text === text
	   && hasDropped === false){
	  setPieces(update(pieces, {
	    [item.id]: {
	      $merge: {dropped: true}
	    },
	  }));
	  setHasDropped(true);
	  setIsCorrect(true);
	}else{
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
      <img src={image} />
    </span>
  </>;
}
