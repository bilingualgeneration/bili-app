import {
    IonContent,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar
    /*
    IonButton,
    */
} from '@ionic/react';

const UnauthedLayout = ({
    // other props
    children
}) => {
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

export default UnauthedLayout;
