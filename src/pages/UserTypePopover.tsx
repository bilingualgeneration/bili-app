import React from 'react';
import {
  IonContent,
  IonPopover,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import './UserTypePopover.css';

interface UserTypePopoverProps {
  isOpen: boolean;
  onDismiss: () => void;            //function that takes no arguments and returns 'void'
  onTeacherSelected: () => void;    //function that takes no arguments and returns 'void'
}

// destructuring props in function signature below to access functions as onDismiss and onTeacherSelected within the UserTypePopover component.
const UserTypePopover: React.FC<UserTypePopoverProps> = ({
  isOpen,
  onDismiss,
  onTeacherSelected,
}) => {
  return (
    <IonPopover isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonContent>
      <div className="popover-header">
          <IonButton
            fill="clear"
            color="dark"
            onClick={onDismiss}
            className="close-button"
          >
            <IonIcon icon={closeOutline} />
          </IonButton>
        </div>
        <div className="popover-content">
          <IonItem>
            <IonLabel>Are you a teacher?</IonLabel>
          </IonItem>
          <IonItem>
            <IonButton expand="full" onClick={onTeacherSelected}>
              Yes, I'm a teacher
            </IonButton>
          </IonItem>
        </div>
      </IonContent>
    </IonPopover>
  );
};

export default UserTypePopover;