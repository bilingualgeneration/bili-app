const LETTER_MAX_ROTATION = 15;

import classnames from 'classnames';
import {
  DndProvider as ReactDndProvider,
  useDrop,
} from 'react-dnd';
import {
  DnDProvider,
  useDnD,
} from '@/hooks/DnD';
import {
  DropTarget,
  DropTargetProps,
} from './DropTarget';
import {HTML5Backend} from 'react-dnd-html5-backend';

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

const generateRandomPosition = ({height: letterHeight, width: letterWidth}: {height: number, width: number}) => {
  const minTop = 0;
  const maxTop = 800 - letterHeight;
  const minLeft = 0;
  const maxLeft = 1366 - letterWidth;
  const bias = 0.8; // Adjust bias as needed
  
  // Generate random values for top and left
  const randomTop = Math.random() * (maxTop - minTop) + minTop;
  const randomLeft = Math.random() * (maxLeft - minLeft) + minLeft;
  
  // Apply bias to avoid the center of the box
  const topBias = (Math.random() < bias) ? 0 : (randomTop < maxTop / 2 ? randomTop * 0.2 : (maxTop - randomTop) * 0.2);
  const leftBias = (Math.random() < bias) ? 0 : (randomLeft < maxLeft / 2 ? randomLeft * 0.2 : (maxLeft - randomLeft) * 0.2);
  
  const position = {
    top: randomTop + topBias,
    left: randomLeft + leftBias
  };
  
  return position;
}

export interface DnDProps {
  target: string,
  pieces: Omit<PieceProps, 'dropped' | 'id' | 'left' | 'top'>[]
}

export const DnD: React.FC<DnDProps> = (props) => {
  return <>
    <ReactDndProvider backend={HTML5Backend}>
      <DnDProvider>
	<Hydrator {...props} />
      </DnDProvider>
    </ReactDndProvider>
  </>;
}

const Hydrator: React.FC<DnDProps> = (props) => {
  const {pieces, setPieces, setTargetPieces} = useDnD();
  useEffect(() => {
    const piecesMap = Object.fromEntries(props.pieces.map((p) => [p.text, p]));
    const piecesExpanded = props.pieces.map(({count, ...p}) => Array(count).fill(p)).flat();
    const pieceInstances = Object.fromEntries(
      piecesExpanded.map(
	(p: any, index: number) => {
	  const id: string = index.toString();
	  const {left, top} = generateRandomPosition({height: p.image.height, width: p.image.width});
	  return [
	    id,
	    {
	      ...p,
	      dropped: false,
	      id,
	      left,
	      top,
	      rotation: Math.floor(Math.random() * LETTER_MAX_ROTATION * 2 + 1) - LETTER_MAX_ROTATION
	    }
	  ];
	}
      )
    );
    const targetPieceInstances = 
      props.target
	   .split(' ')
	   .map((word) => 
	     Object.fromEntries(
	       word.split('-').map(
		 (t: string, index: number) => {
		   const p = piecesMap[t.replace(/_$/, '')];
		   const id: string = index.toString();
		   return [
		     id,
		     {
		       ...p,
		       dropped: false,
		       id,
		       isBlank: t.endsWith('_'),
		       left: index * 100,
		       top: 0,
		     }
		   ];
	       })
	     )
	   );
    setTargetPieces(targetPieceInstances);
    setPieces(pieceInstances);
  }, [props, setPieces]);
  return <Container/>;
}

interface ContainerProps {}

const Container: React.FC<ContainerProps> = () => {
  const {percentDropped, targetPieces, pieces, setPieces} = useDnD();
  const dropTargets = useMemo(() => {
    return targetPieces.map(
      (word: any, wordIndex: number) => Object.values(word).map(
      (p: any, letterIndex) => ({
	classes: classnames({'leftMargin': wordIndex > 0 && letterIndex === 0}),
	image: p.image,
	text: p.text.replace(/_$/, ''),
	isBlank: p.isBlank
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
  <div ref={drop} style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 800,
    position: 'relative'
  }}>
    {Object.keys(pieces).map((key) => <Piece key={key} {...pieces[key]} />)}
    <div className='dnd-drop-targets-container'>
      {dropTargets.map(
	(word: any) => word.map((d: DropTargetProps, index: number) => <DropTarget key={index} {...d} />
      ))}
    </div>
  </div>
    <h1>
      {percentDropped.toFixed(2) * 100}% Correct
    </h1>
  </>
};