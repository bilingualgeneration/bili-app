import {
    IonContent,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {Redirect} from 'react-router-dom';

import {
    useAuth
} from '../contexts/useAuth';

const AuthedLayout = ({
    children
}) => {
    const {isAuthed} = useAuth();
    if(isAuthed === false){
	// not logged in
	return (
	    <Redirect to='/login' />
	);
    }

    if(isAuthed === null){
	// still loading
	/*
	   return <Loading />
	*/
    }

    // implied else
    return (
	<IonPage>
	    <IonHeader>
            <IonToolbar>
                <IonTitle>Welcome to Bili</IonTitle>
            </IonToolbar>
	    </IonHeader>
	    <IonContent fullscreen>
		    {children}
	    </IonContent>
	</IonPage>
    );
}

export default AuthedLayout;
