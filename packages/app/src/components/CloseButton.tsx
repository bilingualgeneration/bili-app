import { closeSharp } from "ionicons/icons";
import { IonButton, IonIcon } from "@ionic/react";

interface CloseButtonProps {
  onClick: any;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <IonButton className="cielo-low circle color-suelo" onClick={onClick}>
      <IonIcon slot="icon-only" icon={closeSharp} />
    </IonButton>
  );
};
