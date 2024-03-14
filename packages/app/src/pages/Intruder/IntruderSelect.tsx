import { PackSelect } from "@/components/PackSelect";

export const IntruderSelect: React.FC = () => {
  const placeholderCards = [
    {
      title: 'Paquete 2',
      titleEn: 'Pack 2',
      category: 'play',
      cover: '/assets/img/boot_image.png',
      isLocked: true
    },
    {
      title: 'Paquete 3',
      titleEn: 'Pack 3',
      category: 'play',
      cover: '/assets/img/horse_image.png',
      isLocked: true
    },
    {
      title: 'Paquete 4',
      titleEn: 'Pack 4',
      category: 'play',
      cover: 'https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/stories_friends_cover_e66b64561c.svg',
      isLocked: true
    },
  ];
  return (
    <PackSelect
      module="intruder-game"
      category="play"
      translatedTitle='El Intruso'
      englishTitle="The Intruder"
      placeholderCards={placeholderCards}
    />
  );
}
