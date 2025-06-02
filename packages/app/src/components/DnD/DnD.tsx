export const MAX_HEIGHT = 450;
const MAX_WIDTH = 940;

import { letterLookup } from "./letterLookup";
import classnames from "classnames";
import { DnDImage } from "./DnDImage";
import { isPlatform } from "@ionic/react";
import { useDrop } from "react-dnd";
import { DndProvider as ReactDndProvider } from "react-dnd-multi-backend";
import { useDnD } from "@/hooks/DnD";
import { DropTarget, DropTargetProps } from "./DropTarget";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { usePreview } from "react-dnd-preview";
import { useCanvasSize } from "@/lib/canvasSize";

import { placeItemsOnCanvas } from "./placerAlgorithm";
import { Piece, PieceProps } from "./Piece";
import { useCallback, useEffect, useMemo, useState } from "react";
import update from "immutability-helper";

import "./DnD.scss";

const colors = [
  "#ffb68f",
  "#f48722",
  "#c25808",
  "#ff8b70",
  "#ff5708",
  "#8b1a00",
  "#22beb9",
  "#006a67",
  "#f28ac9",
  "#ec59b1",
  "#ac217b",
  "#8fb8fa",
  "#4b84e1",
  "#0045a1",
  "#9a90f0",
  "#6154d5",
];

const calculateWidth = (text: string) => {
  return text
    .replace(/_/g, "")
    .split("")
    .reduce((total: number, t: any) => letterLookup[t].width + total, 0);
};

export const hashSegment = (text: string) => {
  let hash = 0;
  for (let index = 0; index < text.length; index++) {
    hash += text.charCodeAt(index);
  }
  return colors[hash % colors.length];
};

const PiecePreview: React.FC = () => {
  // @ts-ignore
  const { display, item, style } = usePreview();
  if (!item) {
    return null;
  }
  if (!display) {
    return null;
  }
  return (
    <span
      className="letter"
      style={{
        ...style,
        // @ts-ignore
        color: item.color,
      }}
    >
      {
        // @ts-ignore
        item.text
      }
    </span>
  );
};

export interface DnDProps {
  audioOnComplete: string;
  onDrop?: any; // todo: should this be required?
  width: number;
  target: string;
  pieces: Omit<PieceProps, "dropped" | "id" | "left" | "top">[];
  targetImage?: any;
  gameId: string;
}

//    <ReactDndProvider backend={HTML5Backend}>

export const DnD: React.FC<DnDProps> = (props) => {
  return (
    <>
      <ReactDndProvider options={HTML5toTouch}>
        <Hydrator {...props} />
      </ReactDndProvider>
    </>
  );
};

const Hydrator: React.FC<DnDProps> = ({
  audioOnComplete,
  onDrop,
  pieces: propsPieces,
  target,
  targetImage,
  width,
  gameId,
}) => {
  const {
    pieces,
    setAudioOnComplete,
    setOnDrop,
    setPieces,
    setTargetPieces,
    setPiecesDropped,
    setTotalTargets,
  } = useDnD();
  const [targetImagePlacement, setTargetImagePlacement] = useState<any>({});
  const {
    canvasRef,
    width: canvasWidth,
    height: canvasHeight,
  } = useCanvasSize();
  useEffect(() => {
    if (canvasWidth === 0 || canvasHeight === 0) {
      return;
    }
    const piecesExpanded = propsPieces
      .map(({ count, ...p }) => Array(count).fill(p))
      .flat();

    const pieceDimensions = piecesExpanded.map((p) => {
      return {
        height: 120,
        width: calculateWidth(p.text),
      };
    });
    const targetDimensions = target.split(" ").map((t) => {
      return t.split("-").map((s) => {
        return {
          height: 120,
          width: calculateWidth(s),
        };
      });
    });
    const targetImageDimensions = {
      height: 300,
      width: 300,
    };
    const canvas = {
      height: canvasHeight,
      width: canvasWidth,
    };

    // @ts-ignore
    const { fixedTextPlacements, fixedImagePlacement, piecePlacements } =
      placeItemsOnCanvas(
        canvas,
        pieceDimensions,
        targetDimensions,
        targetImageDimensions,
      );

    const targetInstances = target.split(" ").map((word, wordIndex) =>
      Object.fromEntries(
        word.split("-").map((segment, segmentIndex) => {
          const { x, y } = fixedTextPlacements[wordIndex][segmentIndex];
          const letters = segment.split("");
          return [
            segment + segmentIndex,
            {
              x,
              y,
              dropped: false,
              text: segment,
            },
          ];
        }),
      ),
    );

    setTargetPieces(targetInstances);
    setTotalTargets(
      targetInstances.reduce(
        (total, word) => total + Object.keys(word).length,
        0,
      ),
    );

    const pieceInstances = Object.fromEntries(
      piecesExpanded.map((p, index) => {
        const id = p.text + index;
        const width = calculateWidth(p.text);
        return [
          id,
          {
            audio_on_drag: p.audio_on_drag,
            audio_on_drop: p.audio_on_drop,
            dropped: false,
            id,
            left: piecePlacements[index].x,
            top: piecePlacements[index].y,
            rotation: 0,
            text: p.text,
          },
        ];
      }),
    );

    setTargetImagePlacement(fixedImagePlacement);
    setPieces(pieceInstances);
    setAudioOnComplete(audioOnComplete);
    setOnDrop(() => onDrop);
    setPiecesDropped(0);
  }, [canvasWidth, canvasHeight, propsPieces, target, setPieces]);
  return (
    <div ref={canvasRef} className="dnd-play-area" style={{ height: "100%" }}>
      {canvasHeight !== 0 && (
        <Container
          targetImage={
            targetImage
              ? { ...targetImage, ...targetImagePlacement }
              : undefined
          }
          gameId={gameId}
        />
      )}
    </div>
  );
};

interface ContainerProps {
  gameId: string;
  targetImage?: any;
}

const Container: React.FC<ContainerProps> = ({ targetImage, gameId }) => {
  const { onDrop, targetPieces, pieces, setPieces } = useDnD();
  const dropTargets = useMemo(() => {
    return targetPieces.map((word: any, wordIndex: number) =>
      Object.values(word).map((p: any, letterIndex) => ({
        classes: classnames({ leftMargin: wordIndex > 0 && letterIndex === 0 }),
        text: p.text.replace(/_/g, ""),
        isBlank: p.text.endsWith("_"),
        x: p.x,
        y: p.y,
        renderTrigger: new Date(),
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
          height: "100%",
          position: "relative",
        }}
      >
        {Object.keys(pieces).map((key, index) => (
          <Piece key={`${key}-${index}`} {...pieces[key]} />
        ))}
        {(isPlatform("ios") || isPlatform("android")) && <PiecePreview />}
        {targetImage && (
          <DnDImage src={targetImage.url} x={targetImage.x} y={targetImage.y} />
        )}
        {dropTargets.map((word: any) =>
          word.map((d: DropTargetProps, index: number) => (
            <DropTarget key={`${d.text}-${index}`} {...d} gameId={gameId} />
          )),
        )}
      </div>
    </>
  );
};
