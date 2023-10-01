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
import React from 'react';
import './Container.css';

interface UnauthedLayoutProps {
    children: React.ReactNode
}

const UnauthedLayout: React.FC<UnauthedLayoutProps> = ({
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
	    <IonContent fullscreen className="ion-padding">
            <div className='container'>
                {children}
            </div>
		    
	    </IonContent>
	</IonPage>
    );
}

export default UnauthedLayout;
