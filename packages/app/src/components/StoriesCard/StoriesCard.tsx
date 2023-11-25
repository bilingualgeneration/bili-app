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
import Lock from '@/assets/icons/lock.svg?react';

type StoriesCardProps = {
    title: string | MessageFormatElement[];
    subtitle: string | MessageFormatElement[];
    icon?: React.ReactNode;
    cover: URL;
    rating?: React.ReactNode;
    heart?: React.ReactNode[];
    iconBackroungColor? : string;
    className: string;
    isLocked: boolean;
    lock?: React.ReactNode;
};

export const StoriesCard: React.FC<StoriesCardProps> = ({
    subtitle,
    icon,
    cover,
    title,
    rating,
    heart,
    iconBackroungColor,
    className,
    isLocked,
    lock
}) => {
    return <>
        <div className={`stories-card ${isLocked ? 'locked' : ''}`}> 
            {/* check if the card is locked */}
            {isLocked && <Lock className="lock-icon"/>}
            <div className={className}>
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
