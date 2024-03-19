import { FC } from 'react'
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { StoriesDragGame } from "../StoriesDragGame";
import Example from './example'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { isPlatform } from '@ionic/react';

export const StoriesDragGameLoader: FC = () => {
    //@ts-ignore
    const { pack_id } = useParams();
    const firestore = useFirestore();

    //Firestore operations
    const ref = doc(firestore, "story", pack_id);
    const { status, data } = useFirestoreDocData(ref);

    let backend;

    if (isPlatform('ipad') || isPlatform('tablet') || isPlatform('iphone')) {
        backend = TouchBackend;
    } else {
        backend = HTML5Backend;
    }

    if (status === "loading") {
        return "Loading...";
    }
    
    if (status === "error") {
        return "Error loading the game";
    }
    
    return (
        <div>
            <DndProvider backend={backend}>
                <Example />
            </DndProvider>
        </div>
    )
};
