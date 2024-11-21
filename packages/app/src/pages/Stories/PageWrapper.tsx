import classnames from "classnames";
import { IonCol, IonGrid, IonRow, IonImg } from "@ionic/react";
import { useStory } from "./StoryContext";

import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";

export const PageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { pageBackward, pageForward, pageNumber, pages, pageLocks } =
    useStory();
  const totalPages = pages.length;
  return (
    <div className="content-wrapper">
      <IonGrid>
        <IonRow style={{ marginLeft: 45, marginRight: 45 }}>{children}</IonRow>
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
    </div>
  );
};
