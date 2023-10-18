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


export const LanguageModeSelect: React.FC = () => {
    const swiper = useSwiper();
    return (
	<>
	    <IonCard>
		<IonCardHeader>
		    <IonCardTitle>
			Spanish Immersion
		    </IonCardTitle>
		</IonCardHeader>
		<IonCardContent>
		</IonCardContent>
	    </IonCard>
	    <IonCard>
		<IonCardHeader>
		    <IonCardTitle>
			Bilingual
		    </IonCardTitle>
		</IonCardHeader>
		<IonCardContent>
		</IonCardContent>
	    </IonCard>
	    <IonButton
		onClick={() => {swiper.slideNext();}}
		data-testid='language-mode-continue-button'
	    >
		Continue
	    </IonButton>
	</>
    );
}
