import { FC, useMemo } from 'react'
import { useParams } from "react-router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { isPlatform } from '@ionic/react';
import { Container } from './container';
import { CustomDragLayer } from './customDragLayer';

export const StoriesDragGame: FC = () => {
    //@ts-ignore
    const { pack_id } = useParams();
    const firestore = useFirestore();

    // Firestore operations
    const ref = doc(firestore, "story", pack_id);
    const { status, data } = useFirestoreDocData(ref);

    // Determine the backend based on the platform
    const backend = useMemo(() => {
        if (isPlatform('ipad') || isPlatform('tablet') || isPlatform('iphone')) {
            return TouchBackend;
        } else {
            return HTML5Backend;
        }
    }, []);

    if (status === "loading") {
        return "Loading...";
    }
    
    if (status === "error") {
        return "Error loading the game";
    }

    return (
        <div>
            <DndProvider backend={backend}>
                <Container gameData={data}  />
                <CustomDragLayer  />
            </DndProvider>
        </div>
    )
};