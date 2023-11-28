import React from 'react';
import { IonCard } from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { gameControllerOutline, heartOutline, lockClosedOutline } from 'ionicons/icons';
import { MessageFormatElement } from 'react-intl';

interface JuegoCardProps {
  backgroundImage: string;
  isLocked?: boolean; // prop to indicate whether the module is locked
  isSpanishBilingual?: boolean;
  packNumber?: number;
  showOverlay?: boolean;
  storyId?: string;
}

const JuegoCard: React.FC<JuegoCardProps> = ({
    backgroundImage, 
    isLocked = false, 
    isSpanishBilingual = false, 
    packNumber = 1, 
    showOverlay = true,
    storyId }) => {
    
      return (
            <IonCard href={`/story-factory/${storyId}`} className={`individual-juego-card ${isLocked ? 'locked' : ''}`} 
                    style={{
                    backgroundImage: `url("${backgroundImage}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>

                {/* Overlay for Unlocked Cards */}
                {!isLocked && showOverlay && (
                    <div className="overlay">
                    <div className="gradient-overlay"/>
                    </div>
                )}

                {/* Locked Icon */}
                {isLocked && (
                    <div className="lock-icon-container">
                    <IonIcon icon={lockClosedOutline} className="lock-icon"/>
                    </div>
                )}

                {/* Game controller outline in the upper left corner */}
                {isSpanishBilingual ? (
                    <>
                        
                        <p className="kovu">Paquete {packNumber}</p>
                        
                        <p className="kovu2">Pack {packNumber}</p>
                        
                    </>
                ) : (
                    
                        <p className="title">Paquete {packNumber}</p>
                    
                )}

                {/* Game container with outline in top left corner */}
                <IonIcon className='game-icon-container' icon={gameControllerOutline}/>
                
                {/* Heart outline in the lower right corner */} 
                <IonIcon className='heart-icon-container' icon={heartOutline}/>
            </IonCard>
      );
};

export default JuegoCard;