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

export const LanguageInclusivitySelect: React.FC = () => {
    const swiper = useSwiper();
    return (
	<>
	    <IonCard>
		<IonCardHeader>
		    <IonCardTitle>
			Exclude gender neutral pronouns
		    </IonCardTitle>
		</IonCardHeader>
		<IonCardContent>
		</IonCardContent>
	    </IonCard>
	    <IonCard>
		<IonCardHeader>
		    <IonCardTitle>
			Inclusive Language
		    </IonCardTitle>
		</IonCardHeader>
		<IonCardContent>
		</IonCardContent>
	    </IonCard>
	    <IonButton
		onClick={() => {swiper.slideNext();}}
		data-testid='language-inclusivity-continue-button'
	    >
		Continue
	    </IonButton>
	</>
    );
}
