import {IonProgressBar} from '@ionic/react';
//import Logo from '@/assets/svg/logo.svg';
import {
  useEffect,
  useState,
} from 'react';
//import {useI18n} from '@/hooks/I18n';
import {useProfile} from '@/hooks/Profile';

import './AppWrapper.css';


export const AppWrapper: React.FC<React.PropsWithChildren> = ({children}) => {
  const {isLoading: isProfileLoading} = useProfile();
  //const {dateFnsLocale, language} = useI18n();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if(!isProfileLoading){
      setTimeout(() => {
	setIsLoading(false);
      }, (['development', 'emulator'].includes(import.meta.env.VITE_ENVIRONMENT) ? 0 : 2)
	* 1000);
    }
  }, [isProfileLoading]);

  if(isProfileLoading
//     || language === undefined
//     || dateFnsLocale === undefined
  ){
    return <div id='appLoadingIndicator'>
      <IonProgressBar
	type='indeterminate'
      />
    </div>;
  }else{
    return children;
  }
};
