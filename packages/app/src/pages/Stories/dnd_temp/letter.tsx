import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
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
  // const backgroundColor = yellow ? 'yellow' : 'white'
  // console.log(letters.draggable_letters);
  return (
      <div
        style={{ ...draggableLetterStyles }}
        role={preview ? 'LetterPreview' : 'Letter'}
      >
        {letter}
      </div>
  )
})