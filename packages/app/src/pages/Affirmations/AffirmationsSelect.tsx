import { PackHeader } from "@/components/PackHeader";
import { PackSelect } from "@/components/PackSelect";

export const AffirmationsSelect: React.FC = () => {
  return (
    <>
      <PackHeader bannerColor="#973d78" id="common.wellness" />
      <PackSelect
        category="wellness"
        collection="affirmations"
        fields={["id", "coverImage", "packName"]}
        i18nKey="wellness.affirmations"
      />
    </>
  );
};
