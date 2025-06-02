import type { ApiCollections } from "@/types/directus.d.ts";
import { Carousel } from "@/components/Carousel";
import classnames from "classnames";
import { ContentCard } from "@/components/ContentCard";
import { directus } from "@/hooks/Directus";
import { I18nMessage } from "@/components/I18nMessage";
import { IonText } from "@ionic/react";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { readItems } from "@directus/sdk";
import { useLanguage } from "@/hooks/Language";
import { useQuery } from "@tanstack/react-query";
import { useScreenSize } from "@/lib/screenSize";

interface PackSelectProps {
  category: string;
  collection: string;
  i18nKey: string;
  fields?: string[];
}

export const PackSelect: React.FC<PackSelectProps> = ({
  category,
  collection,
  i18nKey,
  fields = "*",
}) => {
  const { filterText } = useLanguage();
  const { screenType } = useScreenSize();
  const { data, isLoading, error } = useQuery({
    queryKey: [collection],
    queryFn: async () => {
      const data = await directus.request(
        readItems(collection as keyof ApiCollections, {
          // @ts-ignore Type 'string' is not assignable to type 'readonly ("id" | "*")[]'
          fields,
        }),
      );
      return data;
    },
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (error !== null) {
    // TODO: render appropriate component
    return <>error</>;
  }

  return (
    <div className="background-card">
      <div className="margin-bottom-2">
        <IonText>
          <h1
            style={{
              marginLeft: "1.875rem",
              marginTop: screenType === "mobile" ? "-1rem" : "",
            }}
            className={classnames(
              {
                "text-2xl": screenType === "mobile",
                "text-5xl": screenType !== "mobile",
              },
              "color-suelo semibold",
            )}
          >
            <I18nMessage id={i18nKey} />
          </h1>
          <I18nMessage
            id={i18nKey}
            level={2}
            wrapper={(text: string) => (
              <p
                style={{
                  marginLeft: "1.875rem",
                  marginBottom: screenType === "mobile" ? "-1.2rem" : "",
                }}
                className={classnames(
                  {
                    "text-md": screenType === "mobile",
                    "text-3xl": screenType !== "mobile",
                  },
                  "color-english",
                )}
              >
                {text}
              </p>
            )}
          />
        </IonText>
      </div>
      <Carousel height="17rem">
        {
          // @ts-ignore
          // TODO: Property 'map' does not exist on type 'never'
          // TODO: Type 'collection' cannot be used as an index type
          data.map((datum: ApiCollections[collection]) => {
            return (
              <ContentCard
                key={datum.id}
                category={category}
                cover={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${
                  datum.coverImage
                }`}
                titles={filterText(datum.packName)}
                link={`/${collection}/play/${datum.id}`}
              />
            );
          })
        }
      </Carousel>
    </div>
  );
};
