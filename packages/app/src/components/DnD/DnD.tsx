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
  const {pieces, setPieces} = useDnD();
  useEffect(() => {
    const piecesMap = Object.fromEntries(props.pieces.map((p) => [p.text, p]));
    const pieceInstances = Object.fromEntries(
      props.target.split('-').map(
	(t: string, index: number) => {
	  const p = piecesMap[t];
	  const id: string = index.toString();
	  return [
	    id,
	    {
	      dropped: false,
	      id,
	      left: index * 100,
	      top: 0,
	      ...p
	    }
	  ];
      })
    );
    setPieces(pieceInstances);
  }, [props, setPieces]);
  return <Container/>;
}

interface ContainerProps {}

const Container: React.FC<ContainerProps> = () => {
  const {percentDropped, pieces, setPieces} = useDnD();
  const dropTargets = useMemo(() => {
    return Object.values(pieces).map(
      (p: any) => ({
	image: p.image,
	text: p.text,
      })
    );
  }, [pieces]);
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
    height: '50vh',
    position: 'relative'
  }}>
    {Object.keys(pieces).map((key) => <Piece key={key} {...pieces[key]} />)}
    <div className='dnd-drop-targets-container'>
      {dropTargets.map(
	(d: DropTargetProps, index: number) => <DropTarget key={index} {...d} />
      )}
    </div>
  </div>
    <h1>
      {percentDropped.toFixed(2) * 100}% Correct
    </h1>
  </>
};
