const LETTER_MAX_ROTATION = 15;
const PIECE_HORIZONTAL_SPACER = 40;
const PIECE_VERTICAL_SPACER = 10;
const MAX_HEIGHT = 450;
const MAX_WIDTH = 940;
const PIECE_TOP_OFFSET = 20;
const PIECE_LEFT_OFFSET = 100;

import classnames from 'classnames';
import {DnDImage} from './DnDImage';
import {
  useDrop,
} from 'react-dnd';
import {DndProvider as ReactDndProvider} from 'react-dnd-multi-backend';
import {useDnD} from '@/hooks/DnD';
import {
  DropTarget,
  DropTargetProps,
} from './DropTarget';
import {HTML5toTouch} from 'rdndmb-html5-to-touch';
import {isPlatform} from '@ionic/react';
import {usePreview} from 'react-dnd-preview';

import {
  Piece,
  PieceProps,
} from './Piece';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import update from 'immutability-helper';

import './DnD.css';

const shuffle = (array: any[]) => {
  let currentIndex = array.length;
  
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
};

const PiecePreview: React.FC = () => {
  const preview = usePreview();
  if(!preview.display){
    return null;
  }
  const {itemType, item, style} = preview;
  // @ts-ignore
  const url = item.image.url;
  return <span className='letter' style={style}>
    <img src={url} />
  </span>;
};


export interface DnDProps {
  audioOnComplete: string;
  width: number,
  target: string,
  pieces: Omit<PieceProps, 'dropped' | 'id' | 'left' | 'top'>[],
  targetImage?: any,
}


//    <ReactDndProvider backend={HTML5Backend}>

export const DnD: React.FC<DnDProps> = (props) => {
  return <>
    <ReactDndProvider options={HTML5toTouch}>
      <Hydrator {...props} />
    </ReactDndProvider>
  </>;
}

const Hydrator: React.FC<DnDProps> = ({audioOnComplete, pieces: propsPieces, target, targetImage, width}) => {
  const {
    pieces,
    setAudioOnComplete,
    setPieces,
    setTargetPieces,
    setPiecesDropped,
    setTotalTargets,
  } = useDnD();
  useEffect(() => {
    const piecesMap = Object.fromEntries(propsPieces.map((p) => [p.text, p]));
    const piecesExpanded = propsPieces.map(({count, ...p}) => Array(count).fill(p)).flat();
    shuffle(piecesExpanded);
    let tempTotalTargets = 0;
    let targetTotalWidth = 0;
    let targetTotalHeight = 0;
    const targetPieceInstances = 
     target
       .split(' ')
       .map((word) => 
	 Object.fromEntries(
	   word.split('-').map(
	     (t: string, index: number) => {
	       const p = piecesMap[t.replace(/[_*]$/, '')];
	       const id: string = p.text + index;
	       if(!t.endsWith('*')){
		 tempTotalTargets++;
	       }
	       targetTotalWidth += p.image.width;
	       targetTotalHeight = Math.max(targetTotalHeight, p.image.height);
	       return [
		 id,
		 {
		   ...p,
		   dropped: false,
		   id,
		   isBlank: t.endsWith('_'),
		   left: 0,
		   top: 0,
		 }
	       ];
	   })
	 )
       );
    if(targetImage){
      targetTotalWidth = Math.max(targetTotalWidth, targetImage.width);
      targetTotalHeight += targetImage.height;
    }
    let leftPosition = PIECE_LEFT_OFFSET;
    let topPosition = PIECE_TOP_OFFSET;
    const totalPieces = piecesExpanded.length;
    const pieceInstances = Object.fromEntries(
      piecesExpanded.map(
	(p: any, index: number) => {
	  const id: string = index.toString();
	  const newP = {
	    ...p,
	    dropped: false,
	    id,
	    left: leftPosition,
	    top: topPosition,
	    rotation: Math.floor(Math.random() * LETTER_MAX_ROTATION * 2 + 1) - LETTER_MAX_ROTATION
	  };
	  topPosition += p.image.height + PIECE_VERTICAL_SPACER;
	  if(index === Math.floor(totalPieces / 2) - 1){
	    leftPosition = Math.floor(width / 2 + targetTotalWidth / 2 + PIECE_LEFT_OFFSET);
	    topPosition = PIECE_TOP_OFFSET;
	  }
	  return [
	    id,
	    newP
	  ];
	}
      )
    );
    setAudioOnComplete(audioOnComplete);
    setTargetPieces(targetPieceInstances);
    setPieces(pieceInstances);
    setTotalTargets(tempTotalTargets);
    setPiecesDropped(0);
  }, [propsPieces, target, setPieces]);
  return <Container targetImage={targetImage}/>;
}

interface ContainerProps {
  targetImage?: any
}

const Container: React.FC<ContainerProps> = ({
  targetImage
}) => {
  const {targetPieces, pieces, setPieces} = useDnD();
  const dropTargets = useMemo(() => {
    return targetPieces.map(
      (word: any, wordIndex: number) => Object.values(word).map(
	(p: any, letterIndex) => ({
	  classes: classnames({'leftMargin': wordIndex > 0 && letterIndex === 0}),
	  image: p.image,
	  text: p.text.replace(/_$/, ''),
	  isBlank: p.isBlank,
	  renderTrigger: new Date()
	})
    ));
  }, [targetPieces]);
  const movePiece = useCallback(
    (id: string, left: number, top: number) => {
      setPieces(
	update(pieces, {
	  [id]: {
	    $merge: {left, top}
	  },
	})
      );
    },
    [pieces]
  );
  const [, drop] = useDrop(
    () => ({
      accept: 'piece',
      drop(item: any, monitor){
	const delta = monitor.getDifferenceFromInitialOffset();
	if(delta){
	  const left = Math.round(item.left + delta.x);
	  const top = Math.round(item.top + delta.y);
	  movePiece(item.id, left, top);
	}
	return undefined;
      }
    }),
    [movePiece]
  );
  return <>
    <div className='dnd-play-area' style={{height: '100%'}}>
      <div ref={drop} style={{
	height: '100%',
	position: 'relative'
      }}>
	{!isPlatform('desktop') && <PiecePreview />}
	{Object.keys(pieces).map((key) => <Piece key={key} {...pieces[key]} />)}
	<div className={classnames('dnd-drop-targets-container', {hasImage: targetImage})}>
	  {targetImage &&
	   <DnDImage src={targetImage.url} />
	  }
	  {dropTargets.map(
	    (word: any) => word.map((d: DropTargetProps) => <DropTarget key={d.text} {...d} />
	  ))}
	</div>
      </div>
    </div>
  </>
};
