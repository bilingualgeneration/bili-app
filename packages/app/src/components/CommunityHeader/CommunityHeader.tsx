import { IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import {useLanguageToggle} from '@/components/LanguageToggle';

import "./CommunityHeader.scss";

export const CommunityHeader: React.FC = () => {
  const {language} = useLanguageToggle();
  return (
    <div id="communityBanner">
      <IonText>
        <h1 className='text-5xl color-suelo'>
          <FormattedMessage
            id="common.community"
            defaultMessage="Community"
            description="Standalone label for Community"
          />
        </h1>
        {language === 'esen' &&
	 <p className='text-3xl color-suelo'>
	   Community
	 </p>
	}
      </IonText>
    </div>
  );
};
