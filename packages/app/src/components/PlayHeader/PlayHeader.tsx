import { useIntl } from "react-intl";
import { PackHeader } from '../PackHeader';

export const PlayHeader: React.FC = () => {
  const intl = useIntl();
  return <>
        <PackHeader 
          bannerColor="#ff5709"
          title={intl.formatMessage({id: 'common.play'})}
          subtitle="Play"
          titleClassName="text-5xl color-nube"
          subtitleClassName="text-3xl color-nube"
        />
  </>;
};
