// todo: refactor so we don't have to pull more than once
import { ActivityProvider } from "@/contexts/ActivityContext";

import { DnD } from "@/components/DnD";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useState } from "react";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { DnDProvider, useDnD } from "@/hooks/DnD";
import {
  FirestoreCollectionProvider,
  useFirestoreCollection,
} from "@/hooks/FirestoreCollection";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/Language";
import { useParams } from "react-router-dom";
import { first } from "rxjs/operators";
import { GameData, useActivity } from "@/contexts/ActivityContext";
import { useTimeTracker } from "@/hooks/TimeTracker";
import { StoryFactoryCongrats } from "./StoryFactoryCongrats";

export const StoryFactoryPreReader: React.FC = () => {
  const { languagePrimary } = useLanguage();
  console.log(languagePrimary);
  return (
    <FirestoreCollectionProvider
      collection="dn-d"
      filters={[
        ["story_factory", "==", "pre-reader"],
        ["language", "array-contains", languagePrimary],
      ]}
    >
      <Loader />
    </FirestoreCollectionProvider>
  );
};

const Loader: React.FC = () => {
  const { status, data } = useFirestoreCollection();

  if (status === "loading") {
    return <></>;
  }

  if (status === "error") {
    return <>error</>;
  }
  return (
    <ActivityProvider>
      <DnDProvider>
        <Game />
      </DnDProvider>
    </ActivityProvider>
  );
};

const Game: React.FC = () => {
  const dndWrapperRef = useRef<HTMLDivElement | null>(null);
  const { data } = useFirestoreCollection();
  const games = data;
  const { language, setIsVisible } = useLanguageToggle();
  const {
    handleAttempt,
    handleRecordAttempt,
    handleResetAttempts,
    setActivityState,
    setGamesData,
  } = useActivity();
  const { startTimer, stopTimer } = useTimeTracker();
  const [showCongrats, setShowCongrats] = useState<boolean>(false);

  useEffect(() => {
    startTimer();
    setActivityState({
      type: "story-factory-prereader",
      id: data.uuid,
    });

    const gamesData: GameData = new Map();
    for (const group of games) {
      const groupId = group.handle;
      gamesData.set(groupId, { totalMistakesPossible: 2 });
    }

    setGamesData(gamesData);
  }, []);

  useEffect(() => {
    setIsVisible(false);
    return () => {
      setIsVisible(true);
    };
  });

  const [pageNumber, setPageNumber] = useState<number>(0);
  const { totalTargets, piecesDropped, setPiecesDropped } = useDnD();
  const { onended } = useAudioManager();
  useEffect(() => {
    if (piecesDropped >= totalTargets && totalTargets > 0) {
      onended.pipe(first()).subscribe(() => {
        if (pageNumber === games.length - 1) {
          //moved handleRecordAttempt to the StoryFActoryCongrats page
          setShowCongrats(true);
        }
        setPageNumber(pageNumber === games.length - 1 ? 0 : pageNumber + 1);
      });
    }
  }, [piecesDropped, totalTargets, setPageNumber, onended]);
  const { offsetWidth: dndWidth } = dndWrapperRef.current || {
    offsetHeight: 0,
    offsetWidth: 0,
  };

  if (showCongrats) {
    return <StoryFactoryCongrats />;
  }

  return (
    <>
      <div className="responsive-height-with-header" ref={dndWrapperRef}>
        {dndWidth > 0 && (
          <DnD
            gameId={games[pageNumber].handle}
            audioOnComplete={
              games[pageNumber].audio_on_complete
                ? games[pageNumber].audio_on_complete.url
                : null
            }
            width={dndWidth}
            targetImage={games[pageNumber].target_image}
            target={games[pageNumber].target}
            pieces={games[pageNumber].pieces}
          />
        )}
      </div>
    </>
  );
};
