const LETTER_MAX_ROTATION = 15;

import classnames from "classnames";
import { DndProvider as ReactDndProvider, useDrop } from "react-dnd";
import { DnDProvider, useDnD } from "@/hooks/DnD";
import { DropTarget, DropTargetProps } from "./DropTarget";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Piece, PieceProps } from "./Piece";
import { useCallback, useEffect, useMemo, useState } from "react";
import update from "immutability-helper";

import "./DnD.css";

const generateRandomPosition = ({
  height: letterHeight,
  width: letterWidth,
  boundingBox,
  scatterDistance,
  placedPieces,
  pieceIndex,
  totalPieces,
}: {
  height: number;
  width: number;
  boundingBox: { top: number; left: number; bottom: number; right: number };
  scatterDistance: number;
  placedPieces: { left: number; top: number; width: number; height: number }[];
  pieceIndex: number;
  totalPieces: number;
}) => {
  const minTop = 0;
  const maxTop = 800 - letterHeight;
  const minLeft = 0;
  const maxLeft = 1366 - letterWidth;

  const zones = [
    {
      top: minTop,
      bottom: boundingBox.top - scatterDistance,
      left: minLeft,
      right: maxLeft,
    }, // Top zone
    {
      top: boundingBox.bottom + scatterDistance,
      bottom: maxTop,
      left: minLeft,
      right: maxLeft,
    }, // Bottom zone
    {
      top: minTop,
      bottom: maxTop,
      left: minLeft,
      right: boundingBox.left - scatterDistance,
    }, // Left zone
    {
      top: minTop,
      bottom: maxTop,
      left: boundingBox.right + scatterDistance,
      right: maxLeft,
    }, // Right zone
  ];

  const zoneIndex = Math.floor((pieceIndex / totalPieces) * zones.length);
  const zone = zones[zoneIndex];

  let randomTop, randomLeft;

  const isOverlapping = (
    left: number,
    top: number,
    width: number,
    height: number,
  ) => {
    return placedPieces.some(
      (piece) =>
        left < piece.left + piece.width &&
        left + width > piece.left &&
        top < piece.top + piece.height &&
        top + height > piece.top,
    );
  };

  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    randomTop = Math.random() * (zone.bottom - zone.top) + zone.top;
    randomLeft = Math.random() * (zone.right - zone.left) + zone.left;

    if (!isOverlapping(randomLeft, randomTop, letterWidth, letterHeight)) {
      return {
        top: randomTop,
        left: randomLeft,
      };
    }

    attempts++;
  }

  // If a valid position is not found after maxAttempts, fall back to a default position
  return {
    top: Math.random() * (maxTop - minTop) + minTop,
    left: Math.random() * (maxLeft - minLeft) + minLeft,
  };
};

const centerTargets = (targetPieces: any, containerWidth: number) => {
  const wordGap = 100; // Gap between words
  const letterGap = 20; // Gap between letters
  let totalWidth = 0;

  targetPieces.forEach((word: any) => {
    const wordWidth = word.reduce(
      (acc: number, letter: any) => acc + letter.image.width + letterGap,
      -letterGap,
    ); // Sum of letter widths + gaps

    totalWidth += wordWidth + wordGap;
  });

  totalWidth -= wordGap; // Subtract the last added wordGap
  const startX = (containerWidth - totalWidth) / 2;

  let currentX = startX;

  const maxHeight = Math.max(
    ...targetPieces
      .flat()
      .map((letter: any) => letter.image.height + (letter.isBlank ? 6 : 0)),
  );

  const containerHeight = 800; // Assuming container height is 800px
  const verticalCenterOffset = (containerHeight - maxHeight) / 2;

  return targetPieces.map((word: any) => {
    const positionedWord = word.map((target: any) => {
      const left = currentX;
      const top =
        verticalCenterOffset +
        (maxHeight - (target.image.height + (target.isBlank ? 6 : 0)));
      currentX += target.image.width + letterGap;
      return {
        ...target,
        left,
        top,
      };
    });
    currentX += wordGap - letterGap; // Adjust for gap between words, since the last letter already added one letterGap
    return positionedWord;
  });
};

const calculateBoundingBox = (targetPieces: any) => {
  const allPositions: any[] = targetPieces.flat().map((letter: any) => ({
    top: letter.top,
    bottom: letter.top + letter.image.height,
    left: letter.left,
    right: letter.left + letter.image.width,
  }));

  const top = Math.min(...allPositions.map((pos) => pos.top));
  const bottom = Math.max(...allPositions.map((pos) => pos.bottom));
  const left = Math.min(...allPositions.map((pos) => pos.left));
  const right = Math.max(...allPositions.map((pos) => pos.right));

  return { top, bottom, left, right };
};

export interface DnDProps {
  target: string;
  pieces: Omit<PieceProps, "dropped" | "id" | "left" | "top">[];
}

export const DnD: React.FC<DnDProps> = (props) => {
  return (
    <>
      <ReactDndProvider backend={HTML5Backend}>
        <DnDProvider>
          <Hydrator {...props} />
        </DnDProvider>
      </ReactDndProvider>
    </>
  );
};

const Hydrator: React.FC<DnDProps> = (props) => {
  const { pieces, setPieces, setTargetPieces } = useDnD();
  useEffect(() => {
    const piecesMap = Object.fromEntries(props.pieces.map((p) => [p.text, p]));
    const piecesExpanded = props.pieces
      .map(({ count, ...p }) => Array(count).fill(p))
      .flat();
    let pieceInstances = Object.fromEntries(
      piecesExpanded.map((p: any, index: number) => {
        const id: string = index.toString();
        return [
          id,
          {
            ...p,
            dropped: false,
            id,
            left: 0,
            top: 0,
            rotation:
              Math.floor(Math.random() * LETTER_MAX_ROTATION * 2 + 1) -
              LETTER_MAX_ROTATION,
          },
        ];
      }),
    );

    let targetPieceInstances = props.target.split(" ").map((word) =>
      Object.fromEntries(
        word.split("-").map((t: string, index: number) => {
          const p = piecesMap[t.replace(/_$/, "")];
          const id: string = index.toString();
          return [
            id,
            {
              ...p,
              dropped: false,
              id,
              isBlank: t.endsWith("_"),
              left: index * 100,
              top: 0,
            },
          ];
        }),
      ),
    );

    targetPieceInstances = centerTargets(
      targetPieceInstances.map(Object.values),
      1366, // assuming container width is 1366px
    );

    const boundingBox = calculateBoundingBox(targetPieceInstances);
    const scatterDistance = 50; // Adjust this value to control how far pieces are scattered from the target area

    const placedPieces: any[] = [];
    const totalPieces = Object.keys(pieceInstances).length;

    pieceInstances = Object.fromEntries(
      Object.entries(pieceInstances).map(([id, piece], pieceIndex: number) => {
        const { left, top } = generateRandomPosition({
          height: piece.image.height,
          width: piece.image.width,
          boundingBox,
          scatterDistance,
          placedPieces,
          pieceIndex,
          totalPieces,
        });
        placedPieces.push({
          left,
          top,
          width: piece.image.width,
          height: piece.image.height,
        });
        return [
          id,
          {
            ...piece,
            left,
            top,
          },
        ];
      }),
    );

    setTargetPieces(targetPieceInstances);
    setPieces(pieceInstances);
  }, [props, setPieces]);
  return <Container />;
};

interface ContainerProps {}

const Container: React.FC<ContainerProps> = () => {
  const { percentDropped, targetPieces, pieces, setPieces } = useDnD();
  const dropTargets = useMemo(() => {
    return targetPieces.map((word: any, wordIndex: number) =>
      word.map((p: any, letterIndex: number) => ({
        classes: classnames({ leftMargin: wordIndex > 0 && letterIndex === 0 }),
        image: p.image,
        text: p.text.replace(/_$/, ""),
        isBlank: p.isBlank,
        position: {
          top: p.top,
          left: p.left,
        },
      })),
    );
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
    [pieces],
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
          height: 800,
          position: "relative",
        }}
      >
        {Object.keys(pieces).map((key) => (
          <Piece key={key} {...pieces[key]} />
        ))}
        {dropTargets.map((word: any) =>
          word.map((d: DropTargetProps, index: number) => (
            <div
              className="dnd-drop-targets-container"
              style={{
                position: "absolute",
                top: d.position.top,
                left: d.position.left,
              }}
              key={index}
            >
              <DropTarget {...d} />
            </div>
          )),
        )}
      </div>
      <h1>{percentDropped.toFixed(2) * 100}% Correct</h1>
    </>
  );
};
