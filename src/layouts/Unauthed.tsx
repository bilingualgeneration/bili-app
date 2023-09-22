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
    component
}) => {
    return (
	<IonPage>
	    <IonHeader>
		<IonToolbar>
		    <IonTitle>Welcome to Bili</IonTitle>
		</IonToolbar>
	    </IonHeader>
	    <IonContent fullscreen>
		{component}
	    </IonContent>
	</IonPage>
    );
}

export default UnauthedLayout;
