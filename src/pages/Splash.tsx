import React from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonText
} from '@ionic/react';


export const Splash: React.FC = () => {

    return(
	<>
	    <IonText>
		<h1 className='ion-text-center'>
		    Login
		</h1>
	    </IonText>
	    <IonCard>
		<IonCardContent>
		    <IonCardTitle className='ion-padding-bottom'>
			Already have a Bili account?
		    </IonCardTitle>
		    <IonButton
			className='ion-margin-top'
			expand='block'
			href='/login'
			shape='round'>
			Login
		    </IonButton>
		</IonCardContent>
	    </IonCard>
	    <IonCard>
		<IonCardContent>
		    <IonCardTitle className='ion-padding-bottom'>
			New to Bili?
		    </IonCardTitle>
		    <IonButton
			className='ion-margin-top'
			expand='block'
			fill='outline'
			href='/sign-up'
			shape='round'>
			Create an account
		    </IonButton>
		</IonCardContent>
	    </IonCard>
	    <IonCard>
		<IonCardContent>
		    <IonCardTitle className='ion-padding-bottom'>
			Do you have a classroom code?
		    </IonCardTitle>
		    <IonButton
			className='ion-margin-top'
			color='secondary'
			disabled
			expand='block'
			fill='outline'
			href='/classroom-code'
			shape='round'>
			Student login
		    </IonButton>
		</IonCardContent>
	    </IonCard>
	</>
    );
}
