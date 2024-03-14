import { FC } from 'react'
import { render } from 'react-dom'
import Example from './example'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { Device } from '@capacitor/device'

export const TempDragGame: FC = () => {
    Device.getInfo().then((info) => {console.log(info.platform);});
    return (
        <div>
            <DndProvider backend={TouchBackend}>
                <Example />
            </DndProvider>
        </div>
    )
};
