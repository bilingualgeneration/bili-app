import type { CSSProperties, FC } from 'react'
import { memo, useEffect, useState } from 'react'

import { Box } from './box'
import { Letter } from './box'

const styles: CSSProperties = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)',
}

export interface BoxDragPreviewProps {
  title: string
}

export const BoxDragPreview: FC<BoxDragPreviewProps> = memo(
  function BoxDragPreview({ title }) {

    return (
      <div style={styles}>
        <Box title={title} preview />
      </div>
    )
  },
)

export interface LetterDragPreviewProps {
    correct?: boolean
}

export const LetterDragPreview: FC<LetterDragPreviewProps> = memo(
    function BoxDragPreview({ correct }) {

        return (
            <div style={styles}>
                <Letter />
            </div>
        )
    },
)