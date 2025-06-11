import { PackHeader } from "@/components/PackHeader";
import { PackSelect } from "@/components/StrapiPackSelect";

export const AffirmationsSelect: React.FC = () => {
  return (
    <>
      <PackHeader bannerColor="#973d78" id="common.wellness" />
      <PackSelect
        module="affirmation"
        modulePath="affirmations"
        category="wellness"
        translatedTitle="Afirmaciones"
        englishTitle="Affirmations"
        sortBy="handle"
      />
    </>
  );
};
