import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import a_drag  from '@/assets/icons/stories_dnd/draggable_letters/a_drag.svg'

const styles: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

export interface BoxProps {
  title: string
  yellow?: boolean
  preview?: boolean
}

export const Box: FC<BoxProps> = memo(function Box({ title, yellow, preview }) {
  const backgroundColor = yellow ? 'yellow' : 'white'
  return (
    <div
      style={{ ...styles, backgroundColor }}
      role={preview ? 'BoxPreview' : 'Box'}
    >
      {title}
    </div>
  )
})

const svgStyles: CSSProperties = {
    cursor: "-webkit-grab",
}

export interface LetterProps {
    preview?: boolean
  }

export const Letter: FC<LetterProps> = memo(function Letter({ preview }) {
    return (
        <div
            role={preview ? 'BoxPreview' : 'Letter'}
        >
            <img src={a_drag} alt="letter a" />
        </div>
    )
})