import { PackSelect } from "@/components/PackSelect";

export const StoryFactorySelect: React.FC = () => {
  const placeholderCards = [
    {
      title: 'abc',
      titleEn: 'def',
      category: 'play',
      cover: '',
      isLocked: true
    },
    {
      title: '',
      titleEn: '',
      category: '',
      cover: '',
      isLocked: true
    },
    {
      title: '',
      titleEn: '',
      category: '',
      cover: '',
      isLocked: true
    },
  ];
  return <PackSelect
           module="story-factory-game"
	   category="play"
           translatedTitle='¡Fábrica de Cuentos!'
           englishTitle="Story Factory"
	   placeholderCards={placeholderCards}
  />;
}
