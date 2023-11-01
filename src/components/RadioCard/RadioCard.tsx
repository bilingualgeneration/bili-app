import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonText
} from '@ionic/react';
import React from 'react';

type RadioCardProps = {
    title: string;
    content: string;
    icon?: React.ReactNode;
    iconBackgroundColor: string;
    badge?: React.ReactNode
};

export const RadioCard: React.FC<RadioCardProps> = ({
    badge,
    content,
    icon,
    iconBackgroundColor,
    title,
}) => {
    return <IonCard style={{cursor: 'pointer'}}>
	<div className='card-inner'>
	    <div className='oval-element' style={{ backgroundColor: iconBackgroundColor }}>
		{icon}
	    </div>
	    <div className='title-content'>
            <div className='badge-content' 
                style={{
                backgroundColor: 'var(--Flamenco-High)',
                marginLeft: '18px',
                paddingLeft: '8px',
                paddingRight: '8px',
                borderRadius: '4px',
                }}>
                {badge}
            </div>
		<IonCardHeader class='custom-ion-header'>
		    <IonCardTitle>
			<IonText color='primary'>
			    {title}
			</IonText>
		    </IonCardTitle>
		</IonCardHeader>
		<IonCardContent>
		    {content}
		</IonCardContent>
	    </div>

	</div>
    </IonCard>;
};
