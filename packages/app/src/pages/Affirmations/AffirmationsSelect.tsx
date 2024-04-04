import { PackSelect } from "@/components/PackSelect";

export const AffirmationsSelect: React.FC = () => {
  const placeholderCards: any[] = [
    /*
    {
      title: 'Paquete 2',
      titleEn: 'Pack 2',
      category: 'play',
      cover: '/assets/img/boot_image.png',
      isLocked: true
    },
    */
  ];

  // todo - rename affirmation to affirmations-game
  return <PackSelect
  module='affirmation'
  category='wellness'
  translatedTitle='Afirmaciones'
  englishTitle='Affirmations'
  placeholderCards={placeholderCards} />;
};
