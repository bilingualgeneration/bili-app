import { PackHeader } from "./PackHeader";
import { useIntl } from "react-intl";

export const StoriesHeader: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <PackHeader
        bannerColor="#006A67"
        id="common.stories"
        titleClassName="text-5xl color-nube"
        subtitleClassName="text-3xl color-nube"
      />
    </>
  );
};
