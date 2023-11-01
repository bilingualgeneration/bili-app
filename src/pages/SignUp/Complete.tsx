import { IonButton, IonImg } from "@ionic/react"
import { FormattedMessage } from 'react-intl';

export const Complete: React.FC = () => {
    return (
	<>
	    <div 
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<h1>
				<FormattedMessage id="successScreen.success" defaultMessage="Success! You did it!" />
			</h1>
			<IonImg
				src="/assets/img/happy_cactus.png"
    		>
			</IonImg>
			<IonButton
				shape='round'
				type='submit'
				data-testid='complete-continue-button'
			>
				<FormattedMessage id="successScreen.continue" defaultMessage="Continue" />
			</IonButton>
		</div>

	</>
	

    );
}
