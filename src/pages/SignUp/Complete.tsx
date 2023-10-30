import { IonButton, IonImg } from "@ionic/react"

export const Complete: React.FC = () => {
    return (
	<>
	    <div 
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<h1>Success! You did it!</h1>
			<IonImg
				src="/assets/img/happy_cactus.png"
    		>
			</IonImg>
			<IonButton
				shape='round'
				type='submit'
				data-testid='complete-continue-button'
			>
			Continue
			</IonButton>
		</div>

	</>
	

    );
}
