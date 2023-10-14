import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonItem,
    IonInput,
} from '@ionic/react';

import {
    useSwiper
} from 'swiper/react';

export const RoleSelect: React.FC = () => {
    const swiper = useSwiper();
    return (
	<>
	    <IonCard>
		<IonCardHeader>
		    <IonCardTitle>
			I am a teacher
		    </IonCardTitle>
		</IonCardHeader>
		<IonCardContent>
		</IonCardContent>
	    </IonCard>
	    <IonCard>
		<IonCardHeader>
		    <IonCardTitle>
			I am a teacher
		    </IonCardTitle>
		</IonCardHeader>
		<IonCardContent>
		</IonCardContent>
	    </IonCard>
	    <IonButton
		onClick={() => {swiper.slideNext();}}
		data-testid='role-select-continue-button'
	    >
		Continue
	    </IonButton>
	</>
    );
}
