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
import { StoryProvider, useStory } from "./StoryContext";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { useParams } from "react-router";
import { useProfile } from "@/contexts/ProfileContext";
import { useEffect, useState } from "react";
import volumeButton from "@/assets/icons/sf_audio_button.svg";
import { useAudioManager } from "@/contexts/AudioManagerContext";

import AgesIcon from "@/assets/icons/ages_icon.png";
import AuthorIcon from "@/assets/icons/author_icon.png";
import IllustratorIcon from "@/assets/icons/illustrator_icon.png";
import NarratorIcon from "@/assets/icons/narrator_icon.png";
import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";

import './Stories.scss';

const getLang = (lang: string, data: any) => {
  return data.filter((d: any) => d.language === lang)[0];
};

export const Stories = () => {
  return (
    <StoryProvider>
      <StoryLoader />
    </StoryProvider>
  );
};

export const StoryLoader = () => {
  // @ts-ignore
  const { uuid } = useParams();
  const {
    setPageNumber,
    pageNumber,
    setTotalPages,
    setFilteredPages,
    filteredPages,
    ready,
    setReady,
  } = useStory();
  const firestore = useFirestore();
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
      setTotalPages(
        fp.length + 1, // cover
        // todo: for games
      );
      setPageNumber(0);
      setReady(true);
    }
  }, [data]);

  if (status === "loading" || ready === false) {
    return <></>;
  }

  return (
    <div style={{paddingBottom: 100}}>
      {pageNumber === 0 && (
        // todo: don't need to pass in whole data
        <TitleCard data={data} />
      )}
      {pageNumber > 0 &&
       pageNumber <= filteredPages.length && ( // todo: less or equal
					       <StoryPage />
      )}
      <PageCounter />
    </div>
  );
};

const PageCounter = () => {
  const { totalPages, pageNumber } = useStory();
  let pills = [];
  for (let index = 0; index < totalPages!; index++) {
    if (index <= pageNumber!) {
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
            <h2 style={{marginTop: 0}} className="text-sm semibold color-suelo">{text.es}</h2>
            <p className="text-xs color-english">{value}</p>
          </IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

const TitleCard = ({ data }: any) => {
  const { isInclusive, isImmersive } = useProfile();
  const { pageForward } = useStory();
  return (
    <div className="content-wrapper margin-top-1">
      <IonCard
        className="sf-card drop-shadow"
        style={{
          display: "block",
          width: 740,
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
	  <img src={data.cover.url} style={{ width: '100%', marginTop: '2rem'}} />
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
          <IonButton shape="round" onClick={pageForward}>
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

const StoryPage: React.FC<any> = () => {
  const { pageNumber, filteredPages, pageForward, pageBackward } = useStory();
  const { isImmersive, isInclusive } = useProfile();
  const {addAudio, clearAudio} = useAudioManager();
  useEffect(() => {
    return clearAudio;
  }, []);
  useEffect(() => {
    clearAudio();
  }, [pageNumber]);
  const page = filteredPages[pageNumber - 1]; // subtract 1 for cover page
  const texts = Object.fromEntries(page.text.map((p: any) => [p.language, p]));
  return (
    <>
      <div className="content-wrapper margin-top-1">
        <IonGrid>
          <IonRow style={{ alignItems: "start", justifyContent: "center" }}>
            <IonCol size="auto" style={{ marginRight: "2rem", marginTop: "20vh" }}>
              <IonImg src={backward} onClick={pageBackward} style={{cursor: 'pointer'}} />
            </IonCol>
            <IonCol size="auto">
              <IonCard
                className="sf-card drop-shadow"
                style={{
		  width: 740,
                  display: "block",
                  position: "relative",
                }}
              >
                <IonCardContent className='ion-text-center'>
                  <IonText className="ion-text-center">
                    <h1 className="text-3xl semibold color-suelo">
                      {isInclusive ? texts["es-inc"].text : texts.es.text}
                    </h1>
                    {!isImmersive && (
                      <p className="text-2xl color-english">{texts.en.text}</p>
                    )}
                  </IonText>
		  <div style={{position: 'relative'}}>
		    <div
                      className="volume-button-background"
		      onClick={() => {
			let audios = [];
			if(isInclusive){
			  if(texts['es-inc'].audio){
			    audios.push(texts['es-inc'].audio.url);
			  }
			}else{
			  if(texts['es'].audio){
			    audios.push(texts['es'].audio.url);
			  }		
			}
			if(!isImmersive){
			  if(texts['en'].audio){
			    audios.push(texts['en'].audio.url);
			  }
			}
			addAudio(audios);
		      }}
		    >
		      <img className="volume-icon" src={volumeButton} />
		    </div>
		    <img style={{margin: 'auto', marginTop: '2rem'}} src={page.image.url} />
		  </div>
                </IonCardContent>

              </IonCard>
            </IonCol>
            <IonCol size="auto" style={{ marginLeft: "2rem", marginTop: "20vh" }}>
	      <IonImg
		src={forward}
		onClick={pageForward}
		style={{
		  cursor: pageNumber === filteredPages.length ? 'default' : 'pointer',
		  opacity: pageNumber === filteredPages.length ? 0 : 1
		}}
	      />
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </>
  );
};
