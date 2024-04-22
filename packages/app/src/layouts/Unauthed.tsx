import {
  IonContent,
  IonPage,
} from '@ionic/react';
import {Redirect} from 'react-router-dom';
import {useProfile} from '@/hooks/Profile';

interface UnauthedLayoutProps {
  background?: string; // Default to false
  children: React.ReactNode;
}

const UnauthedLayout: React.FC<UnauthedLayoutProps> = ({
  background,
  children,
}) => {
  const {isLoggedIn} = useProfile();
  // assume there are no public pages
  if(isLoggedIn){
    return <Redirect to='/student-dashboard' />;
  }
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="page-wrapper" style={{ background }}>
          {children}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UnauthedLayout;
