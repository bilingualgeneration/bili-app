import { FormattedMessage } from 'react-intl';
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
			}}>
			<h1>
				<FormattedMessage id="successScreen.success" defaultMessage="Success! You did it!" />
			</h1>
			<IonImg src="/assets/img/happy_cactus.png" />
			<IonButton
				shape='round'
				type='submit'
				data-testid='complete-continue-button'
		    style={{
			opacity: '0.2',
			marginTop: '24px',
		    }}
			>
				<FormattedMessage id="successScreen.continue" defaultMessage="Continue" />
			</IonButton>
		</div>
	</>
    );
}
