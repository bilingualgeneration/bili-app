/*
import { FormattedMessage } from "react-intl";
import { gameControllerOutline } from "ionicons/icons";
import Heart from "@/assets/icons/heart.svg?react";
import { Link } from "react-router-dom";
*/

import {
  collection,
//  where,
  query
} from 'firebase/firestore';
import { ContentCard } from "@/components/ContentCard";
import { IonCard, IonIcon, IonText } from "@ionic/react";

import {
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { useProfile } from "@/contexts/ProfileContext";
import { Carousel } from "@/components/Carousel";
import { CommunityHeader } from "@/components/CommunityHeader";
import { PlayHeader } from "@/components/PlayHeader";

interface Card {
  uuid?: string,
  category: string,
  cover: string,
  title: string,
  titleEn: string,
  isLocked: boolean
}

interface props {
  translatedTitle: string,
  englishTitle: string,
  category: string,
  module: string;
  placeholderCards?: Card[];
}

export const PackSelect: React.FC<props> = ({
  module,
  translatedTitle,
  englishTitle,
  category,
  placeholderCards = []
}) => {
  const firestore = useFirestore();
  const { isInclusive, isImmersive } = useProfile();
  const cardsCollection = collection(firestore, module);
  const cardsQuery = query(cardsCollection);
  const {status, data} = useFirestoreCollectionData(cardsQuery, {idField: 'id'});
  if(status === 'loading'){
    return <>loading</>;
  }

  const cards = data.map((p, index) => {
    const esTitle = p.pack_name.filter((pn: any) => pn.language === 'es');
    const esIncTitle = p.pack_name.filter((pn: any) => pn.language === 'es');
    const title: string = isInclusive && esIncTitle.length > 0 ? esIncTitle[0].text : esTitle[0].text;
    const titleEn: string = p.pack_name.filter((pn: any) => pn.language === 'en')[0].text;
    const fid: string = `${module}/${p.id}`;
    return {
      title,
      titleEn,
      fid,
      category,
      cover: p.cover_image.url,
      link: `/${module}/play/${p.id}`
    };
  });
  console.log(placeholderCards);
  return <>
    {category == 'play' && <PlayHeader />}
    {category == 'community' && <CommunityHeader />}
    <div className="background-card">
      <div className="margin-bottom-2">
        <IonText>
          <h1 className="text-5xl color-suelo">{translatedTitle}</h1>
          {!isImmersive && (
            <h2 className="text-3xl color-english">{englishTitle}</h2>
            )}
          </IonText>
        </div>
        <Carousel slidesToShow={2} height={274}>
          {cards.map((c, index) => (
            <ContentCard {...c} key={index} />
          ))}
          {placeholderCards.map((c: Card, index: number) => (
            <ContentCard {...c} key={index} />
          ))}
        </Carousel>
      </div>
    </>;
};
