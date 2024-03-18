import { FC, useEffect, useState } from 'react'
import Example from './example'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend, TouchBackendOptions } from 'react-dnd-touch-backend'
import { isPlatform } from '@ionic/react';

export const TempDragGame: FC = () => {
    let backend;

    if (isPlatform('ipad' || 'tablet' || 'iphone')) {
        backend = TouchBackend;
    } else {
        backend = HTML5Backend;
    }
    
    return (
        <div>
            <DndProvider backend={backend}>
                <Example />
            </DndProvider>
        </div>
    )
};
