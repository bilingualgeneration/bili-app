import type { CSSProperties, FC } from 'react'
import { memo, useEffect } from 'react'
import type { DragSourceMonitor } from 'react-dnd'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { Box, Letter } from './box'
import { ItemTypes } from './itemTypes'

function getStyles(
  left: number,
  top: number,
  isDragging: boolean,
): CSSProperties {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
}

export interface DraggableBoxProps {
  id: string
  title: string
  left: number
  top: number
  type: string
}

export const DraggableBox: FC<DraggableBoxProps> = memo(function DraggableBox(
  props,
) {
  const { id, title, left, top, type } = props
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type,
      item: { id, left, top, title },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, title, type],
  )

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  return (
    <div
      ref={drag}
      style={getStyles(left, top, isDragging)}
      role="DraggableBox"
    >
      {type === ItemTypes.BOX ? <Box title={title} /> : <Letter />} {/* Render Box or Letter based on type */}
    </div>
  )
})