import backButton from "@/assets/icons/back_button_arrow.svg";
import { IonButton, IonIcon } from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./BackButton.scss";

export const BackButton: React.FC = () => {
  const history = useHistory();
  return (
    <IonButton
      className="flamenco-high curved-corners custom-back-button"
      onClick={history.goBack}
    >
      <IonIcon slot="icon-only" icon={backButton} />
    </IonButton>
  );
};
