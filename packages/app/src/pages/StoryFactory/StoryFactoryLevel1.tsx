// todo: refactor so we don't have to pull more than once

import {DnD} from '@/components/DnD';
import { useAudioManager } from '@/contexts/AudioManagerContext';
import {useState} from 'react';
import {
  DnDProvider,
  useDnD
} from '@/hooks/DnD';
import {
  useFirestoreDoc
} from '@/hooks/FirestoreDoc';
import {
  useEffect,
} from 'react';
import {first} from 'rxjs/operators';

export const StoryFactoryLevel1: React.FC = () => {
  return <DnDProvider>
    <WrappedSF1 />
  </DnDProvider>;
};

const WrappedSF1: React.FC = () => {
  const {data: {['dnd-game']: games}} = useFirestoreDoc();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const {totalTargets, piecesDropped} = useDnD();
  const {onended} = useAudioManager();
  useEffect(() => {
    if(piecesDropped >= totalTargets
       && totalTargets > 0){
      onended.pipe(first()).subscribe(() => {
	setPageNumber(pageNumber === games.length - 1 ? 0 : pageNumber + 1);
      });
    }
  }, [piecesDropped, totalTargets, setPageNumber, onended]);
  return <>
    <DnD
      targetImage={games[pageNumber].targetImage.url}
      target={games[pageNumber].target}
      pieces={games[pageNumber].pieces}
    />
  </>;
};
