import { PackSelect } from "@/components/PackSelect";

export const StoryFactorySelect: React.FC = () => {
  const placeholderCards = [
    {
      title: 'Lector temprano',
      titleEn: 'Early reader',
      category: 'play',
      cover: 'https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/stories_friends_cover_e66b64561c.svg',
      isLocked: true
    },
    {
      title: 'Lector avanzado',
      titleEn: 'Advanced reader',
      category: 'play',
      cover: 'https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/4_cover_El_esqueleto_travieso_e992b9d069.svg',
      isLocked: true
    },
    // {
    //   title: 'Paquete 4',
    //   titleEn: 'Pack 4',
    //   category: 'play',
    //   cover: 'https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/thumbnail_Image_Container3_49e525e22a.png',
    //   isLocked: true
    // },s
  ];
  return (
    <PackSelect
      module="story-factory-game"
      category="play"
      translatedTitle='¡Fábrica de Cuentos!'
      englishTitle="Story Factory"
      placeholderCards={placeholderCards}
    />
  );
}
