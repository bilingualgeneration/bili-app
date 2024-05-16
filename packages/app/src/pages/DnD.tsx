import {DnD} from '@/components/DnD';
import {
  FirestoreDocProvider,
  useFirestoreDoc
} from '@/hooks/FirestoreDoc';
import a from "@/assets/icons/stories_dnd/draggable_letters/a_drag.svg";
import m from "@/assets/icons/stories_dnd/draggable_letters/m_drag.svg";
import i from "@/assets/icons/stories_dnd/draggable_letters/i_drag.svg";

export const DnDDev: React.FC = () => {
  return <FirestoreDocProvider collection='dnd-game' id='524161c8-a881-427d-92f9-fa0957d11133'>
    <HydratedDnDDev />
  </FirestoreDocProvider>
};

export const HydratedDnDDev: React.FC = () => {
  const {status, data} = useFirestoreDoc();
  if (status === "loading") {
    // todo: loading screen
    return <></>;
  }

  if (status === "error") {
    // todo: better error checking
    return <></>;
  }

  console.log(data);
  return <>
    <DnD
      target={''}
      pieces={[]}
    />
  </>;
};
