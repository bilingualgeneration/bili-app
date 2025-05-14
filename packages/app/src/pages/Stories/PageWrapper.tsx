// TODO: replace page controls with already existing PageControl component

import React, { useState } from "react";
import { ReactElement } from "react";
import classnames from "classnames";
import { IonGrid, IonRow, IonImg } from "@ionic/react";
import { useStory } from "./StoryContext";
import { AudioButton } from "@/components/AudioButton";

import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";

interface StoryPageProps {
  page: any;
  languages: any[];
  textSize: string;
  onAudioReady?: (audio: Record<string, string>) => void;
}

export const PageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { pageBackward, pageForward, pageNumber, pages, pageLocks } =
    useStory();
  const [audioMap, setAudioMap] = useState<Record<string, string>>({});

  if (!pages || !pages.length || !pages[pageNumber]) {
    return <>{children}</>;
  }

  const wrappedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const maybeStoryPage = child as ReactElement<StoryPageProps>;
    if (maybeStoryPage.props.page == null) {
      return child;
    }
    return React.cloneElement<StoryPageProps>(maybeStoryPage, {
      onAudioReady: (map) => setAudioMap(map),
    });
  });

  const totalPages = pages.length;

  return (
    <div
      className="content-wrapper story-pages-wrapper"
      style={{ position: "relative" }}
    >
      <IonGrid>
        <IonRow>{wrappedChildren}</IonRow>
      </IonGrid>
      <IonImg
        className="page-control backward"
        src={backward}
        onClick={pageBackward}
      />
      <IonImg
        className={classnames("page-control", "forward", {
          locked: pageLocks[pageNumber],
        })}
        src={forward}
        onClick={pageForward}
        style={{ opacity: pageNumber === totalPages - 1 ? 0 : 1 }}
      />
      {Object.keys(audioMap).length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "2.75rem",
            right: "1.5rem",
            zIndex: 9999,
          }}
        >
          <AudioButton audio={audioMap} size="large" />
        </div>
      )}
    </div>
  );
};
