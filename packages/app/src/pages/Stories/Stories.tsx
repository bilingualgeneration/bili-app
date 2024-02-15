import {
  IonGrid,
  IonCol,
  IonRow,
  IonImg,
  IonCard,
  IonCardContent,
  IonText,
  IonButton,
} from "@ionic/react";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { useParams } from "react-router";
import { useProfile } from "@/contexts/ProfileContext";
import { useEffect, useState } from "react";

import AgesIcon from "@/assets/icons/ages_icon.png";
import AuthorIcon from "@/assets/icons/author_icon.png";
import IllustratorIcon from "@/assets/icons/illustrator_icon.png";
import NarratorIcon from "@/assets/icons/narrator_icon.png";

const getLang = (lang: string, data: any) => {
  return data.filter((d: any) => d.language === lang)[0];
};

export const Stories = () => {
  // @ts-ignore
  const { uuid } = useParams();
  const firestore = useFirestore();
  const [page, setPage] = useState(0);
  const [filteredPages, setFilteredPages] = useState<any[]>();
  const [numPages, setNumPages] = useState();
  //Firestore operations
  const ref = doc(firestore, "story", uuid);
  const { status, data } = useFirestoreDocData(ref);
  const { isInclusive, isImmersive } = useProfile();
  useEffect(() => {
    if (data) {
      const fp = data.pages.filter((p: any) => {
        const langs = p.text.map((t: any) => t.language);
        if (isInclusive) {
          return langs.includes("es-inc");
        } else {
          return langs.includes("es");
        }
      });
      setFilteredPages(fp);
    }
  }, [data]);

  if (status === "loading" || filteredPages === undefined) {
    return <></>;
  }

  return (
    <>
      {page === 0 && (
        <TitleCard
          data={data}
          callback={() => {
            setPage(page + 1);
          }}
        />
      )}
      <PageCounter currentPage={page} totalPages={filteredPages.length} />
    </>
  );
};

const PageCounter: (args: any) => any = ({ currentPage, totalPages }: any) => {
  let pills = [];
  for (let index = 0; index < totalPages; index++) {
    if (index <= currentPage) {
      pills.push(true);
    } else {
      pills.push(false);
    }
  }

  const styles = {
    height: 8,
    width: "3rem",
    borderRadius: 4,
    display: "inline-block",
    marginLeft: 4,
    marginRight: 4,
  };

  const stylesFilled = {
    ...styles,
    backgroundColor: "#006a67",
  };

  const stylesEmpty = {
    ...styles,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  };

  return (
    <div className="ion-text-center margin-top-2">
      {pills.map((p: boolean, index: number) => {
        if (p) {
          return <div style={stylesFilled} key={index}></div>;
        } else {
          return <div style={stylesEmpty} key={index}></div>;
        }
      })}
    </div>
  );
};

const Pill: (args: any) => any = ({ icon, text, value }) => {
  return (
    <IonGrid
      style={{
        backgroundColor: "#d3eae8",
        borderRadius: "1rem",
      }}
    >
      <IonRow style={{ alignItems: "center" }}>
        <IonCol size="auto">
          <IonImg src={icon} />
        </IonCol>
        <IonCol size="auto">
          <IonText>
            <h2 className="text-sm semibold color-suelo">{text.es}</h2>
            <p className="text-xs color-english">{value}</p>
          </IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

const TitleCard = ({ callback, data }: any) => {
  const { isInclusive, isImmersive } = useProfile();
  return (
    <div className="content-wrapper margin-top-1">
      <IonCard
        className="sf-card drop-shadow"
        style={{
          backgroundImage: `url(${data.cover.url})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          display: "block",
          width: 740,
          height: 740,
          position: "relative",
        }}
      >
        <IonCardContent>
          <IonText className="ion-text-center">
            <h1 className="text-5xl color-suelo">
              {getLang(isInclusive ? "es-inc" : "es", data.title).text}
            </h1>
            {!isImmersive && (
              <p className="text-3xl color-english">
                {getLang("en", data.title).text}
              </p>
            )}
          </IonText>
          <IonGrid>
            <IonRow>
              <IonCol size="auto">
                <Pill
                  icon={AgesIcon}
                  text={{
                    en: "Ages",
                    es: "Edades",
                  }}
                  value={`${data.age_min}-${data.age_max}`}
                />
              </IonCol>
              <IonCol size="auto">
                <Pill
                  icon={AuthorIcon}
                  text={{
                    en: "Escrito por",
                    es: "Written by",
                  }}
                  value={data.author}
                />
              </IonCol>
              <IonCol size="auto">
                <Pill
                  icon={IllustratorIcon}
                  text={{
                    en: "Ilustrado por",
                    es: "Illustrated by",
                  }}
                  value={data.illustrator}
                />
              </IonCol>
              <IonCol size="auto">
                <Pill
                  icon={NarratorIcon}
                  text={{
                    en: "Narrado por",
                    es: "Narrated by",
                  }}
                  value={data.narrator}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
        <div
          className="ion-text-center"
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            marginLeft: "-25%",
          }}
        >
          <IonButton shape="round" onClick={callback}>
            <IonText
              style={{
                paddingLeft: "5rem",
                paddingRight: "5rem",
              }}
            >
              <h1 className="text-3xl semibold color-nube">¡Leamos!</h1>
              {!isImmersive && (
                <p className="text-sm color-nube">Let's read!</p>
              )}
            </IonText>
          </IonButton>
        </div>
      </IonCard>
    </div>
  );
};
