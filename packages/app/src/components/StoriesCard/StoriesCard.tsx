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
    rating?: React.ReactNode;
    heart?: React.ReactNode[];
    iconBackroungColor? : string;
};

export const StoriesCard: React.FC<StoriesCardProps> = ({
    subtitle,
    icon,
    cover,
    title,
    rating,
    heart,
    iconBackroungColor 
}) => {
    return <>
        <div className='stories-card'>
           
            <div className='stories-card-image'>
                <img src={cover.toString()} alt="" />
                <div className='stories-card-header'>
                    <div className='oval-element-small' 
                        style={{ 
                            backgroundColor: iconBackroungColor 
                            }}
                    >
                        {icon}
                    </div>
                    <div className='stories-card-rating'>
                        {rating && rating.map((star, index) => (
                                <span key={index}>{star}</span>
                            ))}
                    </div>
                    
                </div>
                <div className='stories-card-footer'>
                    <div>
                        <h4>
                            {title as string}
                        </h4>
                        <p>
                            {subtitle as string}
                        </p>
                    </div>
                    <div>
                        {heart}
                    </div>
                    
                </div>
            </div>
            
        </div>
    </>;
};
