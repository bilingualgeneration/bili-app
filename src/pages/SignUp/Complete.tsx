import {
    IonButton,
    IonImg,
    IonText
} from "@ionic/react"

export const Complete: React.FC = () => {
    return (
	<>
	    <div 
		style={{
		    display: 'flex',
		    flexDirection: 'column',
		}}
	    >
		<IonText className='ion-text-center'>
		    <h1>Success! You did it!</h1>
		</IonText>
		<IonImg
		    src="/assets/img/happy_cactus.png"
    		>
		</IonImg>
		<IonButton
		    shape='round'
		    type='submit'
		    data-testid='complete-continue-button'
		    disabled
		    style={{
			opacity: '0.2',
			marginTop: '24px',
		    }}
		>
		    Continue
		</IonButton>
	    </div>

	</>
	

    );
}
