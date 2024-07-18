import classnames from 'classnames';
import {
  DnD,
  MAX_HEIGHT
} from '@/components/DnD';

import {
  DnDProvider,
  useDnD
} from '@/hooks/DnD';
import {
  IonGrid,
  IonCol,
  IonRow,
  IonImg,
  IonCard,
  IonCardContent,
  IonText,
  IonButton,
  useIonModal,
} from "@ionic/react";
import {StoriesCongrats} from './StoriesCongrats';
import { StoriesGame } from "./StoriesGame";
import { StoryProvider, useStory } from "./StoryContext";
import {
  FirestoreDocProvider,
  useFirestoreDoc
} from '@/hooks/FirestoreDoc';
import { useParams } from "react-router";
import { useProfile } from "@/hooks/Profile";
import { useEffect, useState } from "react";
import {VocabModal} from './VocabModal';
import volumeButton from "@/assets/icons/sf_audio_button.svg";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import {useHistory} from 'react-router-dom';
import {useLanguageToggle} from '@/components/LanguageToggle';

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
  // @ts-ignore
  const { uuid } = useParams();
  return <FirestoreDocProvider collection='story' id={uuid} populate={['story-vocabulary-list', 'dnd-game']}>
    <StoriesHydrated />
  </FirestoreDocProvider>;
};

const StoriesHydrated: React.FC = () => {
  const {status, data} = useFirestoreDoc();
  switch(status){
    case 'loading':
      return <></>;
      break;
    case 'error':
      return <>error</>;
      break;
    case 'ready':
      return <StoryProvider>
	<StoryLoader />
      </StoryProvider>;
      break;
    default:
      return <>default case</>;
      break;
  }
};

export const StoryLoader = () => {
  // @ts-ignore
  const { uuid } = useParams();
  const history = useHistory();
  const {
    pages,
    setPages,
    setPageNumber,
    pageNumber,
    ready,
    setPageLocks,
    setReady,
    setVocab,
    setVocabLookup,
  } = useStory();
  const { status, data } = useFirestoreDoc();
  const { profile: {isInclusive} } = useProfile();
  const {language} = useLanguageToggle();
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
      let pages: any[] = [];
      let pageLocks: any = {};
      // push intro page
      pages.push(<TitleCard data={data} />);
      // push filtered pages
      pages = pages.concat(
	fp.map((data: any) => 
	  <>
	    <PageWrapper>
	      <StoryPage page={data} />
	    </PageWrapper>
	    <PageCounter />
	  </>
	)
      );

      for(let index = 0; index < data['dnd-game'].length; index++){
	pageLocks[pages.length + index] = true;
      }

      pages = pages.concat(
	data['dnd-game'].filter((d: any) => {
	  if(isInclusive && language === 'es'){
	    return d.language === 'es-inc';
	  }else{
	    return d.language === language;
	  }
	}).map((data: any) => <>
	  <PageWrapper>
	    <DnDGame data={data} />
	  </PageWrapper>
	  <PageCounter />
	</>)
      );

      if(data.multiple_image_text && data.multiple_image_text.length > 0){
	pageLocks[pages.length] = true;
	pages.push(
	  <>
	    <PageWrapper>
	      <IonCol size='auto'>
		<StoriesGame game={data} gameType="image" />
	      </IonCol>
	    </PageWrapper>
	    <PageCounter />
	  </>
	)
      }
      
      if(data.multiple_syllable_text && data.multiple_syllable_text.length > 0){
	pageLocks[pages.length] = true;
	pages.push(
	<>
	  <PageWrapper>
	    <IonCol size='auto'>
	      <StoriesGame game={data} gameType="syllable" />
	    </IonCol>
	  </PageWrapper>
      	  <PageCounter />
	</>
	);
      }

      pages.push(<>
	<PageWrapper>
	  <IonCol size='auto'>
	    <StoriesCongrats onKeepGoingClick={() => {
	      history.push('/stories');
	    }}/>
	  </IonCol>
	</PageWrapper>
       	<PageCounter />
      </>);
      
      // handle story vocabulary
      if(data['story-vocabulary-list']){
	let tempVocab = {
	  es: {},
	  'es-inc': {},
	  en: {}
	};
	let tempVocabLookup = {};
	for(const list of data['story-vocabulary-list']){
	  for(const word of list.words){
	    for(const translation of word.word){
	      // todo: better typing
	      // @ts-ignore
	      tempVocab[translation.language][translation.word] = {
		...translation,
		image: word.image
	      };

	      // nested loops!
	      // needed to build out lookup table
	      // performance is ok since it's a max of 3 items
	      for(const nestedTranslation of word.word){
		if(translation.language !== nestedTranslation.language){
		  // @ts-ignore
		  if(!tempVocabLookup[translation.word]){
		    // @ts-ignore
		    tempVocabLookup[translation.word] = {
		      [nestedTranslation.language]: nestedTranslation.word
		    }
		  }else{
		    // @ts-ignore
		    tempVocabLookup[translation.word][nestedTranslation.language] = nestedTranslation.word;
		  }
		}
	      }
	    }
	  }
	}
	setVocabLookup(tempVocabLookup);
	setVocab(tempVocab);
      }

      setPageLocks(pageLocks);
      setPages(pages);
      setPageNumber(0);
      setReady(true);
    }
  }, [data]);

  if (status === "loading" || ready === false) {
    return <></>;
  }
  return pages[pageNumber];
};

const PageCounter = () => {
  const { pages, pageNumber } = useStory();
  const totalPages = pages.length;
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
  const {language} = useLanguageToggle();
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
            <h2 style={{marginTop: 0}} className="text-sm semibold color-suelo">
	      
	      {language === 'en'
	      ? text.en
	      : text.es}
	    </h2>
            <p className="text-xs color-english">{value}</p>
          </IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

const TitleCard = ({ data }: any) => {
  const {profile: { isInclusive}} = useProfile();
  const {language} = useLanguageToggle();
  const { pageForward } = useStory();
  return (
    <div className="content-wrapper padding-top-1">
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
	      {language === 'en'
	      ? getLang("en", data.title).text
	      : getLang(isInclusive ? "es-inc" : "es", data.title).text}
            </h1>
            {language === 'esen' && (
              <p className="text-3xl color-english">
                {getLang("en", data.title).text}
              </p>
            )}
          </IonText>
	  <img src={data.cover_image.url} style={{ width: '100%', marginTop: '2rem'}} />
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
              <h1 className="text-3xl semibold color-nube">
		{language === 'en'
		? "Let's read!"
		: '¡Leamos!'}
	      </h1>
              {language === 'esen' && (
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
                es: "Escrito por",
                en: "Written by",
              }}
              value={data.author}
            />
          </IonCol>
          <IonCol size="auto">
            <Pill
              icon={IllustratorIcon}
              text={{
                es: "Ilustrado por",
                en: "Illustrated by",
              }}
              value={data.illustrator}
            />
          </IonCol>
          <IonCol size="auto">
            <Pill
              icon={NarratorIcon}
              text={{
                es: "Narrado por",
                en: "Narrated by",
              }}
              value={data.narrator}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export const PageWrapper: React.FC<React.PropsWithChildren> = ({children}) => {
  const {
    pageBackward,
    pageForward,
    pageNumber,
    pages,
    pageLocks
  } = useStory();
  const totalPages = pages.length;
  return <div className="content-wrapper padding-top-1">
    <IonGrid>
      <IonRow>
	<IonCol></IonCol>
	<IonImg className='page-control backward' src={backward} onClick={pageBackward} />
	{children}
	<IonImg
	className={classnames('page-control', 'forward', {locked: pageLocks[pageNumber]})}
	  src={forward}
	  onClick={pageForward}
	  style={{opacity: pageNumber === totalPages - 1 ? 0 : 1}}/>
	<IonCol></IonCol>
      </IonRow>
    </IonGrid>
  </div>;
};

const SegmentedText: React.FC<React.PropsWithChildren<{language: string}>> = ({
  children,
  language,
}) => {
  const {
    setCurrentVocabWord,
    vocab
  } = useStory();
  // @ts-ignore
  return children!.split(' ').map((text: string, index: number) => {
    let classes = ['word'];
    const normalized_word = text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]*$/, '');
    if(vocab[language][normalized_word]){
      classes.push('vocab');
    }
    return <span
	     className={classnames(classes)}
	     onClick={() => {
	       if(vocab[language][normalized_word]){
		 setCurrentVocabWord(normalized_word);
	       }
	     }}
	     key={index}
	   >
      {text}
    </span>;
  });
}

export const StoryPage: React.FC<React.PropsWithChildren<{page: any}>> = ({page}) => {
  const { pageNumber, pages, pageForward, pageBackward } = useStory();
  const {profile: { isInclusive }} = useProfile();
  const {language} = useLanguageToggle();
  const {addAudio, clearAudio} = useAudioManager();

  useEffect(() => {
    return clearAudio;
  }, []);
  useEffect(() => {
    clearAudio();
  }, [pageNumber]);
  const texts = Object.fromEntries(page.text.map((p: any) => [p.language, p]));
  const cardStyles = {
    width: 460,
    height: 460
  };
  return (
    <>
      <IonCol size="auto">
        <IonCard
          className="sf-card drop-shadow"
          style={cardStyles}>
          <IonCardContent className='ion-text-center ion-no-padding'
			  style={{
			    display: 'flex',
			    flexDirection: 'column',
			    justifyContent: 'space-between',
			    height: '100%'
			  }}>
	    <div></div>
            <IonText className="ion-text-center">
              <h1 className="text-1_5xl semibold color-suelo">
		<SegmentedText language={language === 'esen' ? 'es' : language}>
                {language === 'en'
		? texts.en.text
		: (isInclusive ? texts["es-inc"].text : texts.es.text)}
		</SegmentedText>
              </h1>
              {language === 'esen' && (
                <p className="text-lg color-english">
		  <SegmentedText language='en'>
		    {texts.en.text}
		  </SegmentedText>
		</p>
              )}
            </IonText>
	    <div>
	      <IonButton
		size='small'
		fill='clear'
		className='stories-volume-button'
		onClick={() => {
		  let audios = [];
		  switch(language){
		    case 'en':
		      if(texts['en'].audio){
			audios.push(texts['en'].audio.url);
		      }
		      break;
		    case 'es':
		      if(isInclusive){
			if(texts['es-inc'].audio){
			  audios.push(texts['es-inc'].audio.url);
			}
		      }else{
			if(texts['es'].audio){
			  audios.push(texts['es'].audio.url);
			}
		      }
		      
		      break;
		    case 'esen':
		      if(isInclusive){
			if(texts['es-inc'].audio){
			  audios.push(texts['es-inc'].audio.url);
			}
		      }else{
			if(texts['es'].audio){
			  audios.push(texts['es'].audio.url);
			}
		      }
		      if(texts['en'].audio){
			audios.push(texts['en'].audio.url);
		      }
		      break;
		    default:

		      break;
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
          <IonCardContent className='ion-text-center ion-no-padding'>
	    <img src={page.image.url} />
          </IonCardContent>
        </IonCard>
      </IonCol>
      <VocabModal />
    </>
  );
};



const DnDGame: React.FC<{data: any}> = ({data}) => {
  return <DnDProvider>
    <WrappedDnDGame data={data} />
  </DnDProvider>;
}

const WrappedDnDGame: React.FC<{data: any}> = ({data}) => {
  const {pageLocks, setPageLocks, pageNumber, pageForward} = useStory();
  const {piecesDropped, totalTargets} = useDnD();
  useEffect(() => {
    if(piecesDropped >= totalTargets
       && totalTargets > 0){
      setPageLocks({
	...pageLocks,
	[pageNumber]: false
      });
      pageForward();
    }
  }, [piecesDropped, totalTargets]);
  return <>
    <IonCol size="auto">
      <div style={{height: MAX_HEIGHT}}>
	<IonText>
	<h1 className="text-4xl ion-text-center color-suelo">
	  {data.instructions}
	</h1>
	</IonText>
	<DnD
	audioOnComplete={data.audio_on_complete}
	width={1366}
	target={data.target}
	pieces={data.pieces}
	/>
      </div>
    </IonCol>
  </>;
}
