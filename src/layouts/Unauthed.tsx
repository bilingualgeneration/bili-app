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
		    <IonImg
			src='/assets/img/logo_small.png'
			style={{
			    height: '3rem',
			    marginTop: '1rem',
			    marginBottom: '1rem'
			}}
		    alt='Bili Logo'/>
		    <IonButtons slot='end'>
			<LanguageSwitcher />
		    </IonButtons>
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
