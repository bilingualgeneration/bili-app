import { closeSharp } from "ionicons/icons";
import { IonButton, IonIcon } from "@ionic/react";

interface CloseButtonProps {
  onClick: any;
  size?: any;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick, size }) => {
  return (
    <IonButton
      className="cielo-low circle color-suelo"
      size={size}
      onClick={onClick}
    >
      <IonIcon slot="icon-only" icon={closeSharp} />
    </IonButton>
  );
};
