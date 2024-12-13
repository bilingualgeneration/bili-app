import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";
import { I18nMessage } from "@/components/I18nMessage";
import { MetaFlag } from "./MetaFlag";

import { useLanguage } from "@/hooks/Language";
import { useStory } from "./StoryContext";

interface TitleCard {
  cover_image: any;
  is_student_story: boolean;
  is_translanguaged: boolean;
  title: string;
}

export const TitleCard = ({
  cover_image,
  is_student_story,
  is_translanguaged,
  title,
}: TitleCard) => {
  const { filterText } = useLanguage();
  const { pageForward } = useStory();
  const titles = filterText(title);
  return (
    <div className="content-wrapper">
      <IonGrid>
        <IonRow>
          <IonCol size="6" offset="3">
            <IonCard
              className="drop-shadow story-page story-title-card"
              style={{
                backgroundImage: `url(${cover_image.url})`,
                margin: "auto",
              }}
            >
              {is_translanguaged && (
                <MetaFlag
                  color="cielo-low"
                  id="stories.metaflag.translanguaged"
                  isTranslanguaged={true}
                />
              )}
              {is_student_story && (
                <MetaFlag
                  color="flamenco-flamenco"
                  id="stories.metaflag.studentStory"
                />
              )}
              <IonCardContent>
                <IonText className="ion-text-center title">
                  <h1 className="text-3xl color-suelo">{titles[0].text}</h1>
                  {titles.length > 1 && (
                    <p className="text-xl color-english">{titles[1].text}</p>
                  )}
                </IonText>
                <div className="ion-text-center" style={{ width: "100%" }}>
                  <IonButton
                    shape="round"
                    size="large"
                    onClick={pageForward}
                    style={{ minWidth: "60%" }}
                  >
                    <div>
                      <h1 className="text-2xl semibold color-nube ion-no-padding">
                        <I18nMessage id="story.letsRead" />
                      </h1>
                      <I18nMessage
                        id="story.letsRead"
                        level={2}
                        wrapper={(text: string) => (
                          <p className="text-sm color-nube">{text}</p>
                        )}
                      />
                    </div>
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
