const LETTER_MAX_ROTATION = 15;
const PIECE_HORIZONTAL_SPACER = 40;
const PIECE_VERTICAL_SPACER = 10;
export const MAX_HEIGHT = 450;
const MAX_WIDTH = 940;
const PIECE_TOP_OFFSET = 20;
const PIECE_LEFT_OFFSET_MOBILE = 40;
const PIECE_LEFT_OFFSET_DESKTOP = 60;
const PIECE_HEIGHT = 90;
const PIECE_WIDTH_MOBILE = 40;
const PIECE_WIDTH_DESKTOP = 70;

import classnames from "classnames";
import { DnDImage } from "./DnDImage";
import { isPlatform } from "@ionic/react";
import { useDrop } from "react-dnd";
import { DndProvider as ReactDndProvider } from "react-dnd-multi-backend";
import { useDnD } from "@/hooks/DnD";
import { DropTarget, DropTargetProps } from "./DropTarget";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { usePreview } from "react-dnd-preview";
import { useScreenSize } from "@/lib/screenSize";

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

const charWidthGroups = {
  thin: 0.3, // Thin letters (e.g., i, j, l)
  average: 0.6, // Average letters (e.g., a, b, c, etc.)
  wide: 0.9, // Wide letters (e.g., m, w)
};

export const estimateTextWidth = (text: string, fontSize = 110) => {
  // Define which letters belong to which group
  const thinLetters = new Set(["i", "j", "l", "t"]);
  const wideLetters = new Set(["m", "w", "h", "b", "d"]);

  let totalWidth = 0;

  for (const char of text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")) {
    // Determine the character's group
    if (thinLetters.has(char)) {
      totalWidth += charWidthGroups.thin * fontSize;
    } else if (wideLetters.has(char)) {
      totalWidth += charWidthGroups.wide * fontSize;
    } else {
      // Default to average width for all other lowercase letters
      totalWidth += charWidthGroups.average * fontSize;
    }
  }

  return totalWidth;
};

export const hashLetter = (text: string) => {
  let hash = 0;
  for (let index = 0; index < text.length; index++) {
    hash += text.charCodeAt(index);
  }
  return colors[hash % colors.length];
};

const shuffle = (array: any[]) => {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
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
  const { screenType } = useScreenSize();

  useEffect(() => {
    const piecesMap = Object.fromEntries(propsPieces.map((p) => [p.text, p]));
    const piecesExpanded = propsPieces
      .map(({ count, ...p }) => Array(count).fill(p))
      .flat();
    shuffle(piecesExpanded);
    let tempTotalTargets = 0;
    let targetTotalWidth = 0;
    let targetTotalHeight = 0;
    const targetPieceInstances = target.split(" ").map((word) =>
      Object.fromEntries(
        word.split("-").map((t: string, index: number) => {
          const p = piecesMap[t.replace(/[_*]$/, "")];
          const id: string = p.text + index;
          if (!t.endsWith("*")) {
            tempTotalTargets++;
          }
          console.log(screenType);
          targetTotalWidth +=
            screenType === "mobile" || screenType === "tablet"
              ? PIECE_WIDTH_MOBILE
              : PIECE_WIDTH_DESKTOP;
          targetTotalHeight = Math.max(targetTotalHeight, PIECE_HEIGHT);
          return [
            id,
            {
              ...p,
              dropped: false,
              id,
              isBlank: t.endsWith("_"),
              left: 0,
              top: 0,
            },
          ];
        }),
      ),
    );
    if (targetImage) {
      targetTotalWidth = Math.max(targetTotalWidth, targetImage.width);
      targetTotalHeight += targetImage.height;
    }
    let leftPosition =
      screenType === "mobile" || screenType === "tablet"
        ? PIECE_LEFT_OFFSET_MOBILE
        : PIECE_LEFT_OFFSET_DESKTOP;
    let topPosition = PIECE_TOP_OFFSET;
    const totalPieces = piecesExpanded.length;
    const pieceInstances = Object.fromEntries(
      piecesExpanded.map((p: any, index: number) => {
        console.log(p.text.length);
        const id: string = index.toString();
        const newP = {
          ...p,
          dropped: false,
          id,
          left: leftPosition,
          top: targetImage ? topPosition : 20,
          rotation:
            Math.floor(Math.random() * LETTER_MAX_ROTATION * 2 + 1) -
            LETTER_MAX_ROTATION,
        };
        topPosition += PIECE_HEIGHT + PIECE_VERTICAL_SPACER;
        const estimatedWidth = estimateTextWidth(p.text);
        if (targetImage) {
          if (index === Math.floor(totalPieces / 2) - 1) {
            leftPosition = Math.floor(width / 2 + targetTotalWidth / 2);
            topPosition = PIECE_TOP_OFFSET;
          }
        } else {
          leftPosition += estimatedWidth;
        }
        return [id, newP];
      }),
    );
    setAudioOnComplete(audioOnComplete);
    setOnDrop(() => onDrop);
    setTargetPieces(targetPieceInstances);
    setPieces(pieceInstances);
    setTotalTargets(tempTotalTargets);
    setPiecesDropped(0);
  }, [propsPieces, target, setPieces]);
  return <Container targetImage={targetImage} gameId={gameId} />;
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
        text: p.text.replace(/_$/, ""),
        isBlank: p.isBlank,
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
      <div className="dnd-play-area" style={{ height: "100%" }}>
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
          <div
            className={classnames("dnd-drop-targets-container", {
              hasImage: targetImage,
            })}
          >
            {targetImage && <DnDImage src={targetImage.url} />}
            {dropTargets.map((word: any) =>
              word.map((d: DropTargetProps, index: number) => (
                <DropTarget key={`${d.text}-${index}`} {...d} gameId={gameId} />
              )),
            )}
          </div>
        </div>
      </div>
    </>
  );
};
