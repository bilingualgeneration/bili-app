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
  let letterImg = <img src={letters.draggable_letters[letter]} alt={letter} />
  // const backgroundColor = yellow ? 'yellow' : 'white'
  // console.log(letters.draggable_letters[letter]);
  return (
      <div
        style={{ ...draggableLetterStyles }}
        role={preview ? 'LetterPreview' : 'Letter'}
      >
        {letterImg}
        {letter}
      </div>
  )
})