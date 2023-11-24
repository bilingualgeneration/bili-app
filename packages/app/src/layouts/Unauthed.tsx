import React from 'react';
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonImg,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Container.css';

import {LanguageSwitcher} from '@/components/LanguageSwitcher';

interface UnauthedLayoutProps {
    children: React.ReactNode,
    whiteBackground?: false // Default to false
}

const UnauthedLayout: React.FC<UnauthedLayoutProps> = ({
    // other props
    children,
    whiteBackground
  }) => {

    const contentStyle = whiteBackground ? { '--background': 'none', 'background-color': 'white' } : {};

    return (
	<IonPage>
	    <IonHeader
		className='ion-no-border'
		id='header'>
		<IonToolbar>
		    <IonButtons slot='end'>
			<LanguageSwitcher />
		    </IonButtons>
		</IonToolbar>
	    </IonHeader>
	    <IonContent fullscreen className="ion-padding" style={contentStyle}>
		<div className='container'>
                    {children}
		</div>
		
	    </IonContent>
	</IonPage>
    );
  }

export default UnauthedLayout;  
