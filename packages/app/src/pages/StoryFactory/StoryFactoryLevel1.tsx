// todo: refactor so we don't have to pull more than once

import {DnD} from '@/components/DnD';
import {useState} from 'react';
import {
  DnDProvider,
  useDnD
} from '@/hooks/DnD';
import {
  useFirestoreDoc
} from '@/hooks/FirestoreDoc';

export const StoryFactoryLevel1: React.FC = () => {
  return <DnDProvider>
    <WrappedSF1 />
  </DnDProvider>;
};

const WrappedSF1: React.FC = () => {
  const {data: {['dnd-game']: games}} = useFirestoreDoc();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const {piecesDropped} = useDnD();
  console.log(piecesDropped);
  return <>
    <DnD
      targetImage={games[pageNumber].targetImage.url}
      target={games[pageNumber].target}
      pieces={games[pageNumber].pieces}
    />
  </>;
};
