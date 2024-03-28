import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import { letters } from '../letters';
import '../Stories.scss';

const draggableLetterStyles: CSSProperties = {
    cursor: "-webkit-grab",
}

export interface LetterProps {
  letter: any;
  preview?: boolean
  yellow?: boolean
}

export const Letter: FC<LetterProps> = memo(function Letter({ preview, letter, yellow }) {
  let letterImg = <img style={{maxWidth: "unset"}} src={letters.draggable_letters[letter]} alt={letter} />
  // const backgroundColor = yellow ? 'yellow' : 'white'
  
  return (
      <div
        style={{ ...draggableLetterStyles }}
        role={preview ? 'LetterPreview' : 'Letter'}
      >
        {letterImg}
      </div>
  )
})