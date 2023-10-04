import {
    IonContent,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Container.css';
import React from 'react';

interface UnauthedLayoutProps {
    children: React.ReactNode
}

const UnauthedLayout: React.FC<UnauthedLayoutProps> = ({
    // other props
    children
}: PropsWithChildren): React.JSX.Element => {
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
