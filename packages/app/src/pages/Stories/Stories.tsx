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
import { StoriesGame } from "./StoriesGame";
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
    hasMultipleImage,
    hasMultipleSyllable,
    setPageNumber,
    pageNumber,
    setHasMultipleImage,
    setHasMultipleSyllable,
    setTotalPages,
    setFilteredPages,
    totalPages,
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
      let totalPages = fp.length;
      totalPages++; // cover
      if(data.multiple_image_text && data.multiple_image_text.length > 0){
	totalPages++;
	setHasMultipleImage(true);
      }
      if(data.multiple_syllable_text && data.multiple_syllable_text.length > 0){
	totalPages++;
	setHasMultipleSyllable(true);
      }

      totalPages++; // congrats page
      setFilteredPages(fp);
      setTotalPages(totalPages);
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
       // todo: less or equal
       pageNumber <= filteredPages.length && ( <>
	 <PageWrapper>
	   <StoryPage />
	 </PageWrapper>
	 <PageCounter />
       </>
      )}
      {pageNumber === filteredPages.length + 1 &&
       hasMultipleImage && <>
	 <PageWrapper>
	   <IonCol size='auto'>
	     <StoriesGame game={data} gameType="image" />
	   </IonCol>
	 </PageWrapper>
	 <PageCounter />
       </>}
      
      {pageNumber === filteredPages.length + 1 &&
       hasMultipleSyllable &&
       !hasMultipleImage && <>
	 <PageWrapper>
	   <IonCol size='auto'>
	     <StoriesGame game={data} gameType="syllable" />
	   </IonCol>
	 </PageWrapper>
      	 <PageCounter />
       </>}
      
      {pageNumber === filteredPages.length + 2 &&
       hasMultipleImage &&
       hasMultipleSyllable && <>
	 <PageWrapper>
	   <IonCol size='auto'>
	     <StoriesGame game={data} gameType="syllable" />
	   </IonCol>
	 </PageWrapper>
      	 <PageCounter />
       </>}

      {pageNumber === totalPages - 1 &&
       <>
	 <PageWrapper>
	   <IonCol size='auto'>
	     <p>congrats!</p>
	   </IonCol>
	 </PageWrapper>
       	 <PageCounter />
       </>}
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
      <IonGrid className='margin-top-2'>
        <IonRow style={{justifyContent: 'center'}}>
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
    </div>
  );
};

const PageWrapper: React.FC<React.PropsWithChildren> = ({children}) => {
  const {
    pageBackward,
    pageForward,
    pageNumber,
    totalPages
  } = useStory();
  return <div className="content-wrapper margin-top-1">
    <IonGrid>
      <IonRow style={{ alignItems: "center", justifyContent: "center" }}>
	<IonCol size="auto">
          <IonImg src={backward} onClick={pageBackward} style={{cursor: 'pointer'}} />
	</IonCol>
	{children}
        <IonCol size="auto">
	  <IonImg
	    src={forward}
	    onClick={pageForward}
	    style={{opacity: pageNumber === totalPages - 1 ? 0 : 1}}/>
        </IonCol>
      </IonRow>
    </IonGrid>
  </div>;
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
  const cardStyles = {
    width: 400,
    height: 400
  };
  return (
    <>
      <IonCol size="auto">
        <IonCard
          className="sf-card drop-shadow"
          style={cardStyles}
        >
          <IonCardContent className='ion-text-center'

			  style={{
			    display: 'flex',
			    flexDirection: 'column',
			    justifyContent: 'space-between',
			    height: '100%'
			  }}>
            <IonText className="ion-text-center">
              <h1 className="text-2xl semibold color-suelo">
                {isInclusive ? texts["es-inc"].text : texts.es.text}
              </h1>
              {!isImmersive && (
                <p className="text-xl color-english">{texts.en.text}</p>
              )}
            </IonText>
	    <div>
	      <IonButton
		size='small'
		fill='clear'
		className='stories-volume-button'
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
		<img className="stories-volume-icon" src={volumeButton} />
	      </IonButton>
	    </div>
          </IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol size="auto">
        <IonCard
          className="sf-card drop-shadow"
          style={cardStyles}>
          <IonCardContent className='ion-text-center'>
	    <img src={page.image.url} />
          </IonCardContent>
        </IonCard>
      </IonCol>
    </>
  );
};
