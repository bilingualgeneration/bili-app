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
  const { languageNormalized } = useLanguage();
  console.log(languageNormalized);
  return (
    <FirestoreCollectionProvider
      collection="dn-d"
      filters={[
        ["story_factory", "==", "pre-reader"],
        ["language", "array-contains", languageNormalized],
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
    for (const group of filteredGames) {
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
  const filteredGames = games.filter((g: any) => {
    switch (language) {
      case "es":
        // TODO: check if inclusive also
        return g.language.includes("es");
        break;
      case "en":
        return g.language.includes("en");
        break;
      case "es.en":
        // TODO: check if inclusive also
        return g.language.includes("en") && g.language.includes("es");
      default:
        return false;
    }
  });

  const [pageNumber, setPageNumber] = useState<number>(0);
  const { totalTargets, piecesDropped, setPiecesDropped } = useDnD();
  const { onended } = useAudioManager();
  useEffect(() => {
    if (piecesDropped >= totalTargets && totalTargets > 0) {
      onended.pipe(first()).subscribe(() => {
        if (pageNumber === filteredGames.length - 1) {
          //moved handleRecordAttempt to the StoryFActoryCongrats page
          setShowCongrats(true);
        }
        setPageNumber(
          pageNumber === filteredGames.length - 1 ? 0 : pageNumber + 1,
        );
      });
    }
  }, [piecesDropped, totalTargets, setPageNumber, onended]);
  const { offsetWidth: dndWidth } = dndWrapperRef.current || {
    offsetHeight: 0,
    offsetWidth: 0,
  };
  if (filteredGames.length === 0) {
    return <>no bilingual games yet</>;
  }

  if (showCongrats) {
    return <StoryFactoryCongrats />;
  }

  return (
    <>
      <div className="responsive-height-with-header" ref={dndWrapperRef}>
        {dndWidth > 0 && (
          <DnD
            gameId={filteredGames[pageNumber].handle}
            audioOnComplete={
              filteredGames[pageNumber].audio_on_complete
                ? filteredGames[pageNumber].audio_on_complete.url
                : null
            }
            width={dndWidth}
            targetImage={filteredGames[pageNumber].target_image}
            target={filteredGames[pageNumber].target}
            pieces={filteredGames[pageNumber].pieces}
          />
        )}
      </div>
    </>
  );
};
