import React from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent
} from '@ionic/react';


export const Splash: React.FC = () => {

    return(
	<>
	    <IonCard>
		<IonCardContent>
		    Already have a Bili account?
		    <IonButton href='/login'>
			Login
		    </IonButton>
		</IonCardContent>
	    </IonCard>
	    <IonCard>
		<IonCardContent>
		    New to Bili?
		    <IonButton href='/sign-up'>
			Create an account
		    </IonButton>
		</IonCardContent>
	    </IonCard>
	    <IonCard>
		<IonCardContent>
		    Do you have a classroom code?
		    <IonButton disabled href='/classroom-code'>
			Student login
		    </IonButton>
		</IonCardContent>
	    </IonCard>
	</>
    );
}
