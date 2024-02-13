import update from "immutability-helper";
import type { CSSProperties, FC } from "react";
import { useCallback, useState } from "react";
import type { XYCoord } from "react-dnd";
import { useDrop } from "react-dnd";

import { useProfile } from "@/contexts/ProfileContext";
import { letters } from "./letters";
import type { DragItem } from "./DragItem";
import { ItemTypes } from "./ItemTypes";
import { LetterSegment } from "./LetterSegment";

const styles: CSSProperties = {
  width: 300,
  height: 300,
  border: "1px solid black",
  position: "relative",
};

export interface ContainerState {
  letters: { [key: string]: { top: number; left: number } };
}

interface ContainerProps {
  id: string;
  left: number;
  top: number;
  children?: React.ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  const { isInclusive, isImmersive } = useProfile();
  const [letters, setLetters] = useState<{
    [key: string]: {
      top: number;
      left: number;
    };
  }>({
    a: { top: 20, left: 80 },
    b: { top: 180, left: 20 },
  });

  const moveLetter = useCallback(
    (id: string, left: number, top: number) => {
      setLetters(
        update(letters, {
          [id]: {
            $merge: { left, top },
          },
        }),
      );
    },
    [letters, setLetters],
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.LETTER,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveLetter(item.id, left, top);
        return undefined;
      },
    }),
    [moveLetter],
  );

  return (
    <div ref={drop} style={styles}>
      {Object.keys(letters).map((key) => {
        const { left, top } = letters[key] as {
          top: number;
          left: number;
        };
        return (
          <Container key={key} id={key} left={left} top={top}>
            {children}
          </Container>
        );
      })}
    </div>
  );
};
