import {Redirect} from 'react-router-dom';
import {useProfile} from '@/hooks/Profile';



/*
import { I18nWrapper } from "@/components/I18nWrapper";
import { ProfileContextProvider } from "@/contexts/ProfileContext";
import { ChildProfileContextProvider } from "@/contexts/ChildProfileContext";
import { FavoritesContextProvider } from "@/contexts/FavoritesContext";
*/

export const AuthedLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {isLoggedIn} = useProfile();
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }else{
    return children;
  }

  /*
  return (
    <ProfileContextProvider>
      <ChildProfileContextProvider>
        <I18nWrapper locale="es">
          <FavoritesContextProvider>{children}</FavoritesContextProvider>
        </I18nWrapper>
      </ChildProfileContextProvider>
    </ProfileContextProvider>
  );
  */
};
