import {Redirect} from 'react-router-dom';
import {useProfile} from '@/hooks/Profile';
import {
  LanguageToggle,
  useLanguageToggle,
} from '@/components/LanguageToggle';
import { I18nWrapper } from "@/components/I18nWrapper";

/*
import { ProfileContextProvider } from "@/contexts/ProfileContext";
import { ChildProfileContextProvider } from "@/contexts/ChildProfileContext";
import { FavoritesContextProvider } from "@/contexts/FavoritesContext";
*/

export const AuthedLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {isLoggedIn} = useProfile();
  const {language} = useLanguageToggle();
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }else{
    return <>
      <I18nWrapper locale={language.slice(0, 2)}>
	{children}
	<LanguageToggle />
      </I18nWrapper>
    </>;
  }
};
