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
    customBackground?: string // Default to false
    wide?: boolean
}

const UnauthedLayout: React.FC<UnauthedLayoutProps> = ({
    // other props
    children,
    customBackground,
    wide
  }) => {

    const contentStyle: Record<string, string> = {};

    if (customBackground) {
      contentStyle['--background'] = customBackground; // Set background color only if provided
    }
    if (wide) {
      contentStyle['--container-width'] = '1000px';  //set width to 1000px only if wide is true
    }
    
    
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
