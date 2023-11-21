import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonText
} from '@ionic/react';
import type {
    MessageFormatElement
} from 'react-intl';
import React from 'react';

type StoriesCardProps = {
    title: string | MessageFormatElement[];
    subtitle: string | MessageFormatElement[];
    icon?: React.ReactNode;
    cover: URL;
    rating?: string;
    heart?: string
};

export const StoriesCard: React.FC<StoriesCardProps> = ({
    subtitle,
    icon,
    cover,
    title,
    rating = "★★★★★",
    heart 
}) => {
    return <>
        <div className='stories-card'>
            <div className='stories-card-header'>
            {icon}
            {rating}
            </div>
            <div stories-card-image>
                <img src={cover.toString()} alt="" />
            </div>
            <div>
                {heart}
            </div>
        </div>
    </>;
};
