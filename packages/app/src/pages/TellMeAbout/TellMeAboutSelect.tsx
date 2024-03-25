import { PackSelect } from "@/components/PackSelect";

export const TellMeAboutSelect: React.FC = () => {
  const placeholderCards = [
    {
      title: 'Nivel 3',
      titleEn: 'Level 3',
      category: 'community',
      cover: 'https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/stories_friends_cover_e66b64561c.svg',
      isLocked: true
    },
    {
      title: 'Nivel 4',
      titleEn: 'Level 4',
      category: 'community',
      cover: 'https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/thumbnail_drum_image_42dab560fb.png',
      isLocked: true
    },
    {
      title: 'Nivel 5',
      titleEn: 'Level 5',
      category: 'community',
      cover: '/assets/img/boot_image.png',
      isLocked: true
    },
  ];
  return (
    <PackSelect
      module="tell-me-about-game"
	    category="community"
      translatedTitle='¿Qué harías?'
      englishTitle="What would you do?"
	    placeholderCards={placeholderCards}
    />
  );
}
