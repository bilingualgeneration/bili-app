import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import { letters } from '../letters';
import { useProfile } from "@/contexts/ProfileContext";
import '../Stories.scss';

const draggableLetterStyles: CSSProperties = {
    cursor: "-webkit-grab",
}

export interface LetterProps {
  letter?: any;
  preview?: boolean
  yellow?: boolean
}

export const Letter: FC<LetterProps> = memo(function Letter({ preview, letter, yellow }) {
  const { isInclusive, isImmersive } = useProfile();
  // const backgroundColor = yellow ? 'yellow' : 'white'
  
  return (
      <div
        style={{ ...draggableLetterStyles }}
        role={preview ? 'BoxPreview' : 'Letter'}
      >
        <img src={letters.draggable_letters[letter]} alt={letter} />
      </div>
  )
})