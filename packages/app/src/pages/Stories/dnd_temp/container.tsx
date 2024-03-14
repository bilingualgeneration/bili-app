import update from 'immutability-helper'
import type { CSSProperties, FC } from 'react'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'

import { DraggableBox } from './draggableBox'
import type { DragItem } from './interfaces'
import { ItemTypes } from './itemTypes'

const styles: CSSProperties = {
    width: 1300,
    height: 800,
    border: '1px solid black',
    position: 'relative',
}

interface BoxMap {
    [key: string]: { top: number; left: number; title?: string; type: string}
}

export const Container: FC = () => {
    const [boxes, setBoxes] = useState<BoxMap>({
        a: { top: 20, left: 80, title: 'Drag me around', type: ItemTypes.BOX },
        b: { top: 180, left: 20, title: 'Drag me too', type: ItemTypes.BOX },
        c: { top: 250, left: 100, type: ItemTypes.LETTER },
    })

    const moveBox = useCallback(
        (id: string, left: number, top: number) => {
        setBoxes(
            update(boxes, {
            [id]: {
                $merge: { left, top },
            },
            }),
        )
        },
        [boxes],
    )

    const [, drop] = useDrop(
        () => ({
            accept: [ItemTypes.BOX, ItemTypes.LETTER],
            drop(item: DragItem, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset() as {
                    x: number
                    y: number
                }

                let left = Math.round(item.left + delta.x)
                let top = Math.round(item.top + delta.y)

                moveBox(item.id, left, top)
                return undefined
            },
        }),
        [moveBox],
    )

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div ref={drop} style={styles}>
                {Object.keys(boxes).map((key) => (
                    <DraggableBox
                        key={key}
                        id={key}
                        {...(boxes[key] as { top: number; left: number; title?: string; type: string } )}                    />
                ))}
            </div>
        </div>
    )
}