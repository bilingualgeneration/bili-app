import { PackSelect } from "@/components/PackSelect";

export const IntruderSelect: React.FC = () => {
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
           module="intruder-game"
	   category="play"
           translatedTitle='El Intruso'
           englishTitle="The Intruder"
	   placeholderCards={placeholderCards}
  />;
}
