import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle
} from '@ionic/react';
import React from 'react';

export const RadioCard: React.FC<{ title: string; content: string; icon: React.ReactNode; iconBackgroundColor: string; badge?: React.ReactNode}
> = ({ title, content, icon, iconBackgroundColor, badge}) => {
	return <IonCard>
		<div className='card-inner'>
			<div className='oval-element' style={{ backgroundColor: iconBackgroundColor }}>
				{icon}
			</div>
			<div className='title-content'>
				<IonCardHeader class='custom-ion-header'>
					<IonCardTitle>
						{title}
					</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					{content}
				</IonCardContent>
			</div>

		</div>
	</IonCard>;
};
