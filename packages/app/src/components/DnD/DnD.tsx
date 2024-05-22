import { DndProvider as ReactDndProvider, useDrop } from "react-dnd";
import { DnDProvider, useDnD } from "@/hooks/DnD";
import { DropTarget, DropTargetProps } from "./DropTarget";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Piece, PieceProps } from "./Piece";
import { useCallback, useEffect, useMemo, useState } from "react";
import update from "immutability-helper";

import "./DnD.css";

// Function to shuffle array
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Function to calculate predefined points around the target area
const calculatePerimeterPoints = (
  targetArea: { top: number; left: number; width: number; height: number },
  letterSize: { width: number; height: number },
  numPoints: number,
): { top: number; left: number }[] => {
  const points: { top: number; left: number }[] = [];
  const padding = 10; // Padding around the target area

  // Top side
  for (let i = 0; i < numPoints / 4; i++) {
    points.push({
      top: targetArea.top - letterSize.height - padding,
      left:
        targetArea.left +
        (i * (targetArea.width - letterSize.width)) / (numPoints / 4),
    });
  }

  // Right side
  for (let i = 0; i < numPoints / 4; i++) {
    points.push({
      top:
        targetArea.top +
        (i * (targetArea.height - letterSize.height)) / (numPoints / 4),
      left: targetArea.left + targetArea.width + padding,
    });
  }

  // Bottom side
  for (let i = 0; i < numPoints / 4; i++) {
    points.push({
      top: targetArea.top + targetArea.height + padding,
      left:
        targetArea.left +
        (i * (targetArea.width - letterSize.width)) / (numPoints / 4),
    });
  }

  // Left side
  for (let i = 0; i < numPoints / 4; i++) {
    points.push({
      top:
        targetArea.top +
        (i * (targetArea.height - letterSize.height)) / (numPoints / 4),
      left: targetArea.left - letterSize.width - padding,
    });
  }

  return points.slice(0, numPoints);
};

// Function to render perimeter points for debugging
const renderPerimeterPoints = (points: { top: number; left: number }[]) => {
  return points.map((point, index) => (
    <div
      key={index}
      style={{
        position: "absolute",
        top: point.top,
        left: point.left,
        width: "5px",
        height: "5px",
        backgroundColor: "red",
        borderRadius: "50%",
        zIndex: 9999,
      }}
    ></div>
  ));
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
  const { pieces, setPieces, setTargetPieces, targetPieces } = useDnD();
  const [perimeterPoints, setPerimeterPoints] = useState<
    { top: number; left: number }[]
  >([]);
  const [targetArea, setTargetArea] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const piecesMap = Object.fromEntries(props.pieces.map((p) => [p.text, p]));
    const piecesExpanded = props.pieces
      .map(({ count, ...p }) => Array(count).fill(p))
      .flat();

    const shuffledPieces = shuffleArray(piecesExpanded);

    const targetPieceInstances = props.target.split("-").reduce(
      (acc, t, index) => {
        const p = piecesMap[t];
        const id = index.toString();
        acc[id] = {
          ...p,
          dropped: false,
          id,
          left: index * p.image.width,
          top: 0,
        };
        return acc;
      },
      {} as { [key: string]: any },
    );

    setTargetPieces(targetPieceInstances);
    setPieces(
      shuffledPieces.map((p, index) => ({ ...p, id: index.toString() })),
    );
  }, [props, setPieces, setTargetPieces]);

  useEffect(() => {
    const calculateTargetArea = () => {
      if (targetPieces && Object.keys(targetPieces).length > 0) {
        const pieceValues = Object.values(targetPieces);
        const top = Math.min(...pieceValues.map((p) => p.top));
        const left = Math.min(...pieceValues.map((p) => p.left));
        const bottom = Math.max(
          ...pieceValues.map((p) => p.top + p.image.height),
        );
        const right = Math.max(
          ...pieceValues.map((p) => p.left + p.image.width),
        );

        setTargetArea({
          top,
          left,
          width: right - left,
          height: bottom - top,
        });
      }
    };
    calculateTargetArea();
  }, [targetPieces]);

  useEffect(() => {
    if (targetArea && pieces.length > 0) {
      const letterSize = {
        width: pieces[0].image.width,
        height: pieces[0].image.height,
      };
      const calculatedPoints = calculatePerimeterPoints(
        targetArea,
        letterSize,
        pieces.length,
      );
      setPerimeterPoints(calculatedPoints);

      const pieceInstances = pieces.reduce(
        (acc, p, index) => {
          const id = index.toString();
          const position = calculatedPoints[index];
          acc[id] = {
            ...p,
            dropped: false,
            id,
            left: position.left,
            top: position.top,
          };
          return acc;
        },
        {} as { [key: string]: any },
      );

      setPieces(pieceInstances);
    }
  }, [targetArea, pieces, setPieces]);

  return (
    <Container
      target={props.target}
      perimeterPoints={perimeterPoints}
      targetArea={targetArea}
    />
  );
};

interface ContainerProps {
  target: string;
  perimeterPoints: { top: number; left: number }[];
  targetArea: {
    top: number;
    left: number;
    width: number;
    height: number;
  } | null;
}

const Container: React.FC<ContainerProps> = ({
  target,
  perimeterPoints,
  targetArea,
}) => {
  const { percentDropped, targetPieces, pieces, setPieces } = useDnD();

  const dropTargets = useMemo(() => {
    return Object.values(targetPieces).map((p) => ({
      image: p.image,
      text: p.text,
    }));
  }, [targetPieces]);

  const movePiece = useCallback(
    (id, left, top) => {
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
      drop(item, monitor) {
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

  const calculateBoundingBox = () => {
    if (targetPieces && Object.keys(targetPieces).length > 0) {
      const pieceValues = Object.values(targetPieces);
      const top = Math.min(...pieceValues.map((p) => p.top));
      const left = Math.min(...pieceValues.map((p) => p.left));
      const bottom = Math.max(
        ...pieceValues.map((p) => p.top + p.image.height),
      );
      const right = Math.max(...pieceValues.map((p) => p.left + p.image.width));

      return {
        top,
        left,
        width: right - left,
        height: bottom - top,
      };
    }
    return null;
  };

  const targetBoundingBox = calculateBoundingBox();

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
        <div
          className="dnd-drop-targets-container"
          style={{ position: "relative" }}
        >
          {dropTargets.map((d, index) => (
            <DropTarget key={index} {...d} />
          ))}
          {targetBoundingBox && (
            <div
              style={{
                position: "absolute",
                top: targetBoundingBox.top,
                left: targetBoundingBox.left,
                width: targetBoundingBox.width,
                height: targetBoundingBox.height,
                border: "2px dashed blue",
                zIndex: 9998,
              }}
            ></div>
          )}
        </div>
        {Object.keys(pieces).map((key) => (
          <Piece key={key} {...pieces[key]} />
        ))}
        {renderPerimeterPoints(perimeterPoints)}
      </div>
      <h1>{percentDropped.toFixed(2) * 100}% Correct</h1>
    </>
  );
};
