import { PackSelect } from "@/components/PackSelect";

export const WouldDoSelect: React.FC = () => {
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
           module="would-do-game"
	   category="community"
           translatedTitle='¿Qué harías?'
           englishTitle="What would you do?"
	   placeholderCards={placeholderCards}
  />;
}
