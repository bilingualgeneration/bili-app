/*
import { FormattedMessage } from "react-intl";
import { gameControllerOutline } from "ionicons/icons";
import Heart from "@/assets/icons/heart.svg?react";
import { Link } from "react-router-dom";
*/

import {
  collection,
//  where,
  query,
  orderBy,
} from 'firebase/firestore';
import { ContentCard } from "@/components/ContentCard";
import { IonCard, IonIcon, IonText } from "@ionic/react";

import {
  FirestoreCollectionProvider,
  useFirestoreCollection,
} from '@/hooks/FirestoreCollection';
import { useProfile } from "@/hooks/Profile";
import { Carousel } from "@/components/Carousel";
import { CommunityHeader } from "@/components/CommunityHeader";
import { PlayHeader } from "@/components/PlayHeader";
import { PackHeader } from '../PackHeader';

interface Card {
  uuid?: string,
  category: string,
  cover: string,
  title: string,
  titleEn: string,
  isLocked: boolean
}

interface props {
  translatedTitle: string;
  englishTitle: string;
  category: string;
  module: string;
  modulePath?: string;
  placeholderCards?: Card[];
  pack_name_field?: string;
}

export const PackSelect: React.FC<props> = (props) => {
  return <FirestoreCollectionProvider collection={props.module}>
    <HydratedPackSelect {...props} />
  </FirestoreCollectionProvider>;
};

export const HydratedPackSelect: React.FC<props> = ({
  module,
  modulePath,
  translatedTitle,
  englishTitle,
  category,
  placeholderCards = [],
  pack_name_field = 'pack_name',
}) => {
  const { profile: {isInclusive, isImmersive }} = useProfile();
  const {status, data} = useFirestoreCollection();
  if(status === 'loading'){
    return <></>;
  }
  const cards = data.map((p: any, index: number) => {    
    const esTitle = p[pack_name_field].filter((pn: any) => pn.language === 'es');
    const esIncTitle = p[pack_name_field].filter((pn: any) => pn.language === 'es-inc');
    const title: string = isInclusive && esIncTitle.length > 0 ? esIncTitle[0].text : esTitle[0].text;
    const titleEn: string = p[pack_name_field].filter((pn: any) => pn.language === 'en')[0].text;
    const fid: string = `${module}/${p.id}`;
    return {
      title,
      titleEn,
      fid,
      category,
      cover: p.cover_image?.url || 'https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/drum_image_c3729d3060.png',
      link: `/${modulePath || module}/play/${p.uuid}`
    };
  });
  return <>
    {category == 'play' && <PlayHeader />}
    {category == 'community' && <CommunityHeader />}
    {category == 'story' && (
      <>
        <PackHeader 
          bannerColor="#006A67"
          title="Cuentos" 
          subtitle="Stories"
          titleClassName="text-5xl color-nube"
          subtitleClassName="text-3xl color-nube"
        />
        <div className="all-about-me-header">
            <h1 className="text-5xl bold carousel-header-margin">Todo sobre mi </h1>
            {!isImmersive && (
            <h2 className="text-3xl color-english carousel-header-margin">All about me</h2>
            )}
        </div>

      </>)
    }
    <div className="background-card">
      <div className="margin-bottom-2">
        <IonText>
          <h1 style={{marginLeft: 30}} className="text-5xl color-suelo">{translatedTitle}</h1>
          {!isImmersive && (
            <h2 style={{marginLeft: 30}} className="text-3xl color-english">{englishTitle}</h2>
            )}
          </IonText>
        </div>
        <Carousel slidesToShow={2} height={274}>
          {cards.map((c: Card, index: number) => (
            <ContentCard {...c} key={index} />
          ))}
          {placeholderCards.map((c: Card, index: number) => (
            <ContentCard {...c} key={index} />
          ))}
        </Carousel>
      </div>
    </>;
};
