import {
  IonContent,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Redirect } from "react-router-dom";

interface AuthedLayoutProps {
  children: React.ReactNode;
}

const AuthedLayout: React.FC<AuthedLayoutProps> = ({ children }) => {
  // todo: implement reactfire useAuth
  /*
    const isAuthed: boolean = true;
    if(isAuthed === false){
	// not logged in
	return (
	    <Redirect to='/login' />
	);
    }

    if(isAuthed === null){
	// still loading
	   return <Loading />
    }
	*/

  // implied else
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to Bili</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container">{children}</div>
      </IonContent>
    </IonPage>
  );
};

export default AuthedLayout;
