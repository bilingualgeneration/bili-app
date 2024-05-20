import { DndProvider as ReactDndProvider, useDrop } from "react-dnd";
import { DnDProvider, useDnD } from "@/hooks/DnD";
import { DropTarget, DropTargetProps } from "./DropTarget";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Piece, PieceProps } from "./Piece";
import { useCallback, useEffect, useMemo, useState } from "react";
import update from "immutability-helper";

import "./DnD.css";

const playArea = { width: 1366, height: 800 };
const overlapBias = 0.5; // Adjust bias as needed
const overlapFactor = 0.5; // Adjust factor to increase overlap probability

const generateRandomPosition = (letterSize: {
  height: number;
  width: number;
}): { top: number; left: number } => {
  const { height: letterHeight, width: letterWidth } = letterSize;
  const minTop = 0;
  const maxTop = playArea.height - letterHeight;
  const minLeft = 0;
  const maxLeft = playArea.width - letterWidth;

  const randomTop = Math.random() * (maxTop - minTop) + minTop;
  const randomLeft = Math.random() * (maxLeft - minLeft) + minLeft;

  const topBias =
    Math.random() < overlapBias
      ? 0
      : randomTop < maxTop / 2
        ? randomTop * 0.2
        : (maxTop - randomTop) * 0.2;
  const leftBias =
    Math.random() < overlapBias
      ? 0
      : randomLeft < maxLeft / 2
        ? randomLeft * 0.2
        : (maxLeft - randomLeft) * 0.2;

  return {
    top: randomTop + topBias,
    left: randomLeft + leftBias,
  };
};

const generateOverlappingPosition = (
  letterSize: { height: number; width: number },
  existingPosition: { top: number; left: number },
): { top: number; left: number } => {
  const { height: letterHeight, width: letterWidth } = letterSize;
  const overlapMargin = 0.1 * letterWidth; // Adjust as needed for desired overlap amount

  const top =
    existingPosition.top + Math.random() * overlapMargin - overlapMargin / 2;
  const left =
    existingPosition.left + Math.random() * overlapMargin - overlapMargin / 2;

  return {
    top: Math.max(0, Math.min(top, playArea.height - letterHeight)),
    left: Math.max(0, Math.min(left, playArea.width - letterWidth)),
  };
};

const checkOverlap = (
  pos1: { top: number; left: number },
  pos2: { top: number; left: number },
  size: { width: number; height: number },
) => {
  return (
    pos1.left < pos2.left + size.width &&
    pos1.left + size.width > pos2.left &&
    pos1.top < pos2.top + size.height &&
    pos1.top + size.height > pos2.top
  );
};

export interface DnDProps {
  target: string;
  pieces: Omit<PieceProps, "dropped" | "id" | "left" | "top">[];
}

export const DnD: React.FC<DnDProps> = (props) => {
  return (
    <ReactDndProvider backend={HTML5Backend}>
      <DnDProvider>
        <Hydrator {...props} />
      </DnDProvider>
    </ReactDndProvider>
  );
};

const Hydrator: React.FC<DnDProps> = (props) => {
  const { pieces, setPieces, setTargetPieces } = useDnD();

  useEffect(() => {
    const piecesMap = Object.fromEntries(props.pieces.map((p) => [p.text, p]));
    const piecesExpanded = props.pieces
      .map(({ count, ...p }) => Array(count).fill(p))
      .flat();

    const pieceInstances: { [key: string]: any } = {};
    const overlappingPairs: Set<string> = new Set();

    piecesExpanded.forEach((p, index) => {
      const id = index.toString();
      const letterSize = { height: p.image.height, width: p.image.width };
      const existingPositions = Object.values(pieceInstances).map((p) => ({
        top: p.top,
        left: p.left,
      }));

      let newPosition;

      if (Math.random() < overlapFactor && existingPositions.length > 0) {
        // Find an existing position that is not already part of an overlapping pair
        const availablePositions = existingPositions.filter(
          (pos) => !overlappingPairs.has(`${pos.top}-${pos.left}`),
        );

        if (availablePositions.length > 0) {
          const existingPosition =
            availablePositions[
              Math.floor(Math.random() * availablePositions.length)
            ];
          newPosition = generateOverlappingPosition(
            letterSize,
            existingPosition,
          );
          overlappingPairs.add(
            `${existingPosition.top}-${existingPosition.left}`,
          );
          overlappingPairs.add(`${newPosition.top}-${newPosition.left}`);
        } else {
          newPosition = generateRandomPosition(letterSize);
        }
      } else {
        newPosition = generateRandomPosition(letterSize);
      }

      pieceInstances[id] = {
        ...p,
        dropped: false,
        id,
        left: newPosition.left,
        top: newPosition.top,
      };
    });

    const targetPieceInstances: { [key: string]: any } = {};
    props.target.split("-").forEach((t, index) => {
      const p = piecesMap[t];
      const id = index.toString();
      targetPieceInstances[id] = {
        ...p,
        dropped: false,
        id,
        left: index * 100,
        top: 0,
      };
    });

    setTargetPieces(targetPieceInstances);
    setPieces(pieceInstances);
  }, [props, setPieces, setTargetPieces]);

  return <Container />;
};

interface ContainerProps {}

const Container: React.FC<ContainerProps> = () => {
  const { percentDropped, targetPieces, pieces, setPieces } = useDnD();

  const dropTargets = useMemo(() => {
    return Object.values(targetPieces).map((p: any) => ({
      image: p.image,
      text: p.text,
    }));
  }, [targetPieces]);

  const movePiece = useCallback(
    (id: string, left: number, top: number) => {
      setPieces(
        update(pieces, {
          [id]: {
            $merge: { left, top },
          },
        }),
      );
    },
    [pieces, setPieces],
  );

  const [, drop] = useDrop(
    () => ({
      accept: "piece",
      drop(item: any, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          const left = Math.round(item.left + delta.x);
          const top = Math.round(item.top + delta.y);
          movePiece(item.id, left, top);
        }
        return undefined;
      },
    }),
    [movePiece],
  );

  return (
    <>
      <div
        ref={drop}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 800,
          position: "relative",
        }}
      >
        {Object.keys(pieces).map((key) => (
          <Piece key={key} {...pieces[key]} />
        ))}
        <div className="dnd-drop-targets-container">
          {dropTargets.map((d, index) => (
            <DropTarget key={index} {...d} />
          ))}
        </div>
      </div>
      <h1>{percentDropped.toFixed(2) * 100}% Correct</h1>
    </>
  );
};
