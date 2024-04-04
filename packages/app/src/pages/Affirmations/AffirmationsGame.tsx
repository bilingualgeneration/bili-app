import { doc } from "firebase/firestore";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonText,
} from '@ionic/react';
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useParams } from "react-router";
import { useProfile } from "@/contexts/ProfileContext";
import { useState} from 'react';
import { useFirestore, useFirestoreDocData } from "reactfire";

import volumeButton from "@/assets/icons/sf_audio_button.svg";
import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";

interface AffirmationsCardProps {
  image: any,
  text_back: any,
  text_front: any
}

const AffirmationsCard: React.FC<AffirmationsCardProps> = ({
  image,
  text_back,
  text_front
}) => {
  const { isImmersive } = useProfile();
  const {addAudio} = useAudioManager();
  const [showFront, setShowFront] = useState<boolean>(true);
  const text_back_es = text_back.filter((t) => t.language === 'es')[0];
  const text_back_es_inc = text_back.filter((t) => t.language === 'es-inc')[0];
  const text_back_en = text_back.filter((t) => t.language === 'en')[0];
  const text_front_es = text_front.filter((t) => t.language === 'es')[0];
  const text_front_es_inc = text_front.filter((t) => t.language === 'es-inc')[0];
  const text_front_en = text_front.filter((t) => t.language === 'en')[0];
  return <>
    <IonCard
      className='drop-shadow'
      style={{
	aspectRatio: 312 / 516,
	backgroundColor: showFront ? 'inherit' : '#D6D3F0'
      }}
      onClick={() => {setShowFront(!showFront);}}
    >
  <IonCardContent className='ion-text-center' style={{
    alignSelf: 'stretch',
    height: '100%',
    display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between'
  }}>
    {showFront && <>
	<img src={image.url} />
	<IonText>
	  <h1 className='text-xl semibold color-suelo'>
	    {text_front_es.text}
	  </h1>
	  {!isImmersive && <p className='text-lg color-english'>
	    {text_front_en.text}
	  </p>}
	</IonText>
    </>}
    {!showFront && <div className='ion-text-left'>
	<h1 className='text-xl semibold color-suelo'>
	  ¡Platiquemos!
	</h1>
	<h2 className='text-lg color-english'>
	  Let's Talk!
	</h2>
      <div style={{borderBottom: '2px solid black'}} className='margin-top-1 margin-bottom-1'></div>
      <IonText>
      <h1 className='text-xl semibold color-suelo'>
	{text_back_es.text}
      </h1>
      <h2 className='text-lg color-english'>
	{text_front_en.text}
      </h2>
      </IonText>
    </div>
    }
      </IonCardContent>
  </IonCard>
  	  <div className='ion-text-center margin-top-3'>
	  <IonButton
	    style={{'--background': '#FFD8E8'}}
	    onClick={() => {
	      const audios = [];
	      if(showFront){
		audios.push(text_front_es.audio.url);
		if(!isImmersive){
		  audios.push(text_front_en.audio.url);
		}
	      }else{
		audios.push(text_back_es.audio.url);
		if(!isImmersive){
		  audios.push(text_back_en.audio.url);
		}
	      }
	      addAudio(audios);
	    }}>
	    <img src={volumeButton} />
	  </IonButton>
	  </div>
</>
  ;
};

const CARDS_PER_PAGE = 2;

export const AffirmationsGame: React.FC = () => {
  //@ts-ignore
  const { pack_id } = useParams();
  const firestore = useFirestore();
  const [page, setPage] = useState<number>(0);
  
  //Firestore operations
  const ref = doc(firestore, "affirmation", pack_id);
  const { status, data } = useFirestoreDocData(ref);

  if (status === "loading") {
    // todo: loading screen
    return <></>;
  }

  if (status === "error") {
    // todo: better error checking
    return <></>;
  }

  const canBackward = page > 0;
  const canForward = page * CARDS_PER_PAGE + CARDS_PER_PAGE < data.cards.length;
  
  return <>
    <IonGrid>
      <IonRow style={{alignItems: 'stretch'}}>
	<IonCol size='auto' style={{display: 'flex'}}>
	  <IonImg
	    className='page-control backward'
	    style={{
	      opacity: canBackward ? 1 : 0
	    }}
	    onClick={() => {
	      if(canBackward){
		setPage(page - 1);
	      }
	    }}
	    src={backward} />
	</IonCol>
	{data.cards.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE).map((c) => <IonCol key={c.id}>
	  <AffirmationsCard image={c.image} text_back={c.text_back} text_front={c.text_front} />
	</IonCol>)}
	<IonCol size='auto' style={{display: 'flex'}}>
	  <IonImg
	    className='page-control forward'
	    style={{
	      opacity: canForward ? 1 : 0
	    }}
	    onClick={() => {
	      if(canForward){
		setPage(page + 1);
	      }
	    }}
	    src={forward} />
	</IonCol>
      </IonRow>
    </IonGrid>
  </>;
}
