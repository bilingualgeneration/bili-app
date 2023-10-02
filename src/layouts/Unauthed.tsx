import {
    IonContent,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {
    JSX,
    PropsWithChildren
} from 'react';

const UnauthedLayout = ({
    children
}: PropsWithChildren): JSX.Element => {
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
