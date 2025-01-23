import { PackSelect } from "@/components/PackSelect";

export const AffirmationsSelect: React.FC = () => {
  const placeholderCards: any[] = [
    {
      title: "Nature",
      titleEn: "La naturaleza",
      category: "play",
      cover: "/assets/img/nature.png",
      isLocked: true,
    },
  ];

  // todo - rename affirmation to affirmations-game
  return (
    <PackSelect
      module="affirmation"
      modulePath="affirmations"
      category="wellness"
      translatedTitle="Afirmaciones"
      englishTitle="Affirmations"
      placeholderCards={placeholderCards}
    />
  );
};
