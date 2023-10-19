import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonItem,
    IonInput,
	IonCheckbox,
	IonRadioGroup,
	IonRadio,
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
		    <IonCardTitle>Which best descibes you?</IonCardTitle>
		</IonCardHeader> 
		<IonCardContent>
			<IonRadioGroup value="">
				<IonRadio value="teacher">I am a teacher</IonRadio>
				<br />
				<IonRadio value="parent">I am a parent/caregiver</IonRadio>
					<br />
			</IonRadioGroup>
		</IonCardContent>
	    </IonCard>

	    {/* <IonCard>
		<IonCardHeader>
		    <IonCardTitle>
				<IonRadioGroup value="">
					<IonRadio value="parent">I am a parent/caregiver</IonRadio>
					<br />
				</IonRadioGroup>
		    </IonCardTitle>
		</IonCardHeader>
		<IonCardContent>
		</IonCardContent>
	    </IonCard> */}

	    <IonButton
		onClick={() => {swiper.slideNext();}}
		data-testid='role-select-continue-button'
	    >
		Continue
	    </IonButton>
	</>
    );
}
