import {
    IonButton,
    IonImg,
    IonText
} from "@ionic/react"
import React from "react";
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
				<IonText className='ion-text-center'>
					<h1>
						<FormattedMessage id="successScreen.success" defaultMessage="Success! You did it!" />
					</h1>
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
					<FormattedMessage id="successScreen.continue" defaultMessage="Continue" />
				</IonButton>
			</div>

		</>
    );
}
