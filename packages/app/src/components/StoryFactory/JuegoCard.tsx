import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { gameControllerOutline, heartOutline, lockClosedOutline } from 'ionicons/icons';

interface JuegoCardProps {
  backgroundImage: string;
  isLocked?: boolean; // Optional prop to indicate whether the module is locked
  children?: any;
}

const JuegoCard: React.FC<JuegoCardProps> = ({ backgroundImage, isLocked = false, children }) => (
  <IonCard className={`story-card ${isLocked ? 'locked' : ''}`} style={{ backgroundImage: `url("${backgroundImage}")`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
    {isLocked && (
      <div className="lock-icon-container">
        <IonIcon icon={lockClosedOutline} className="lock-icon" />
      </div>
    )}
    {/* Game controller outline in the upper left corner */}
    <IonCardContent>
    {children}
    <div
        style={{
          position: 'absolute',
          top: -80, // Adjust position as needed
          left: -10, // Adjust position as needed
          backgroundColor: '#F17130',
          borderRadius: '50%', 
          padding: '8px', 
          fontSize: '.1rem',
        }}
      >
        <IonIcon
          icon={gameControllerOutline}
          style={{
            color: 'white', 
            fontSize: '1rem', // Adjust the font size as needed
          }}
        />
    </div>
    
    {/* Heart outline in the lower right corner */} 
      <IonIcon
        icon={heartOutline}
        style={{
          position: 'absolute',
          bottom: -80,
          right: -150,
          margin: '0px',
          color: 'white',
          fontSize: '2rem',
        }}
      />
    </IonCardContent>
  </IonCard>
);

export default JuegoCard;