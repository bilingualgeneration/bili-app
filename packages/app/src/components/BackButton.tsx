import backButton from "@/assets/icons/back_button_arrow.svg";
import { IonButton, IonIcon } from "@ionic/react";
import { useHistory } from "react-router-dom";

export const BackButton: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <IonButton
        className="curved-corners"
        color="flamenco"
        onClick={history.goBack}
      >
        <IonIcon slot="icon-only" icon={backButton} />
      </IonButton>
    </>
  );
};
