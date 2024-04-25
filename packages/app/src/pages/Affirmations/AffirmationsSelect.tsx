import { PackSelect } from "@/components/PackSelect";

export const AffirmationsSelect: React.FC = () => {
  const placeholderCards: any[] = [
    {
      title: 'Familia y comunidad',
      titleEn: 'Family and Community',
      category: 'play',
      cover: '/assets/img/family_community.png',
      isLocked: true
    },
    {
      title: 'Nature',
      titleEn: 'La naturaleza',
      category: 'play',
      cover: '/assets/img/nature.png',
      isLocked: true
    },
  ];

  // todo - rename affirmation to affirmations-game
  return <PackSelect
	   module='affirmation'
	   modulePath='affirmations'
	   category='wellness'
	   translatedTitle='Afirmaciones'
	   englishTitle='Affirmations'
	   placeholderCards={placeholderCards} />;
};
