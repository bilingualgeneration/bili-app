import type { CSSProperties, FC } from 'react'
import { memo, useEffect, useState } from 'react'

import { Letter } from './letter'

const styles: CSSProperties = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)',
}

export interface LetterDragPreviewProps {
    letter?: boolean
}

export const LetterDragPreview: FC<LetterDragPreviewProps> = memo(
    function BoxDragPreview({ letter }) {

        return (
            <div style={styles}>
                <Letter letter={letter} preview />
            </div>
        )
    },
)