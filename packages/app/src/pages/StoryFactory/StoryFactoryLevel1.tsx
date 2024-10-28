// todo: refactor so we don't have to pull more than once

import { DnD } from "@/components/DnD";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useState } from "react";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { DnDProvider, useDnD } from "@/hooks/DnD";
import { useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { useEffect, useRef } from "react";
import { first } from "rxjs/operators";
import { GameData, useActivity } from "@/contexts/ActivityContext";
import { useTimeTracker } from "@/hooks/TimeTracker";

export const StoryFactoryLevel1: React.FC = () => {
  return (
    <DnDProvider>
      <WrappedSF1 />
    </DnDProvider>
  );
};

const WrappedSF1: React.FC = () => {
  const dndWrapperRef = useRef<HTMLDivElement | null>(null);
  const { data } = useFirestoreDoc();
  const games = data?.["dnd-game"] || [];
  console.log("DND game", games);
  const { language, setIsVisible } = useLanguageToggle();
  const {
    handleAttempt,
    handleRecordAttempt,
    handleResetAttempts,
    setActivityState,
    setGamesData,
  } = useActivity();
  const { startTimer, stopTimer } = useTimeTracker();

  useEffect(() => {
    startTimer();
    setActivityState({
      type: "story-factory-level-1",
      id: data.uuid,
    });

    const gamesData: GameData = new Map();
    for (const group of filteredGames) {
      const groupId = group.handle;
      gamesData.set(groupId, { totalMistakesPossible: 2 });
      console.log("DND filteredgame", groupId);
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
        // todo: check if inclusive also
        return g.language === "es";
        break;
      case "en":
        return g.language === "en";
        break;
      case "esen":
        // todo: check if inclusive also
        return true;
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
        const groupId = filteredGames[pageNumber].handle;
        if (pageNumber === filteredGames.length - 1) {
          //logic as if we set to show Congrats
          handleRecordAttempt(stopTimer());
        } else {
          handleAttempt(groupId, true);
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
  return (
    <>
      <div ref={dndWrapperRef} style={{ height: "100%" }}>
        {dndWidth > 0 && (
          <DnD
            // TODO: fix
            gameId="sfl1"
            audioOnComplete={
              filteredGames[pageNumber].audio_on_complete
                ? filteredGames[pageNumber].audio_on_complete.url
                : null
            }
            width={dndWidth}
            targetImage={filteredGames[pageNumber].targetImage}
            target={filteredGames[pageNumber].target}
            pieces={filteredGames[pageNumber].pieces}
          />
        )}
      </div>
    </>
  );
};
