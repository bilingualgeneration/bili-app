import {I18nWrapper} from '@/components/I18nWrapper';
import {
  IonContent,
  IonPage,
} from '@ionic/react';
import {Redirect} from 'react-router-dom';
import {useInterfaceLanguage} from '@/hooks/InterfaceLanguage';
import {useProfile} from '@/hooks/Profile';

interface UnauthedLayoutProps {
  background?: string; // Default to false
  children: React.ReactNode;
}

const UnauthedLayout: React.FC<UnauthedLayoutProps> = ({
  background,
  children,
}) => {
  const {isLoggedIn, profile} = useProfile();
  const {language} = useInterfaceLanguage();
  // assume there are no public pages
  if(isLoggedIn){
    switch(profile.role){
      case 'teacher':
	return <Redirect to='/classrooms' />;
	break;
      case 'parent':
	return <Redirect to='/student-dashboard' />;
	break;
    }
  }
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding background-figures">
	<I18nWrapper locale={language}>
        <div className="page-wrapper" style={{ background }}>
          {children}
        </div>
	</I18nWrapper>
      </IonContent>
    </IonPage>
  );
};

export default UnauthedLayout;
